import { PaystackChargeSuccess, PaystackWebhook } from '@payment/payment.interface'
import { getOrderByFilter, updateOrder } from '@services/order'
import { getOneProductById, updateProduct } from '@services/product'
import { NextRequest } from 'next/server'
import mongoose, { ClientSession } from 'mongoose'
import { IProduct, ISizeDetails } from '@models/product.model'
import { errorResponse, sendResponse } from '@utils/api-response'
import { deleteManyCarts, getAllCarts } from '@services/cart'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  console.log('webhook ran')

  const body: PaystackWebhook<PaystackChargeSuccess> = await req.json()

  if (body.event === 'charge.success') {
    const data = body.data
    const order = await getOrderByFilter({ reference: data.reference })
    const carts = await getAllCarts({ userId: order?.userId })

    if (!order || !order.products || order.products.length <= 0) {
      return errorResponse('Order or products not found', null, 404)
    }

    const session: ClientSession = await mongoose.startSession()
    session.startTransaction()

    try {
      const products = order.products

      for (const product of products) {
        const prod = await getOneProductById(product.id)
        if (!prod) {
          console.error(`Product not found for ID: ${product.id}`)
          continue
        }

        const size = product.size as keyof IProduct
        const requestedQuantity = parseInt(product.quantity)

        if (!['s', 'm', 'l', 'xl', 'xxl', 'xxxl'].includes(size.toLowerCase())) {
          console.error(`Invalid size: ${size} for product ID: ${product.id}`)
          continue
        }

        if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
          console.error(`Invalid quantity: ${product.quantity} for product ID: ${product.id}`)
          continue
        }

        const sizeDetails = prod[size] as ISizeDetails
        if (!sizeDetails || sizeDetails.quantity <= 0) {
          console.error(`No quantity available for size ${size} in product ID: ${product.id}`)
          continue
        }

        const totalYardDeduction = sizeDetails.quantity * requestedQuantity

        if (prod.yard < totalYardDeduction) {
          console.error(`Insufficient yard for product ID: ${product.id}. Required: ${totalYardDeduction}, Available: ${prod.yard}`)
          continue
        }

        const updatedYard = prod.yard - totalYardDeduction

        await updateProduct(
          product.id,
          {
            yard: updatedYard,
            status: updatedYard <= 0 ? statusMap.outOfStock : prod.status,
            numberOfSales: prod.numberOfSales + 1
          },
          session
        )

        console.log(`Updated product ID: ${product.id}, size: ${size}, yard: ${updatedYard}`)
      }

      await updateOrder(order.id, { paymentStatus: 'paid' }, session)

      if (carts && carts.length > 0) {
        const { deletedCount } = await deleteManyCarts({ _id: { $in: carts.map((cart) => cart._id) } }, session)
        console.log(`Deleted ${deletedCount} carts for user ID: ${order.userId}`)
      }

      await session.commitTransaction()
      session.endSession()

      return sendResponse('Webhook processed successfully')
    } catch (error) {
      await session.abortTransaction()
      session.endSession()
      console.error('Transaction aborted due to error:', error)
      return errorResponse('Webhook processed failed')
    }
  } else if (body.event === 'transfer.failed') {
    return errorResponse('Charge failed', null, 400)
  }

  return errorResponse('Event not handled', null, 400)
}
