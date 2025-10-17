import { PaystackChargeSuccess, PaystackWebhook } from '@payment/payment.interface'
import { getOrderByFilter, updateOrder } from '@services/order'
import { getOneProductById, updateProduct } from '@services/product'
import { NextRequest } from 'next/server'
import mongoose from 'mongoose'
import { IProduct, ISizeDetails } from '@models/product.model'
import { errorResponse, sendResponse } from '@utils/api-response'
import { deleteCart, getCartById } from '@services/cart'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  const body: PaystackWebhook<PaystackChargeSuccess> = await req.json()
  sendResponse('success', 200)

  if (body.event === 'charge.success') {
    const data = body.data as PaystackChargeSuccess
    const order = await getOrderByFilter({ reference: data.reference })
    const cart = await getCartById(String(data.metadata.cartId))

    if (!order || order.status !== 'pending') {
      return
    }

    const session = await mongoose.startSession()

    try {
      const items = order.items

      for (const item of items) {
        const prod = await getOneProductById(item.product.id)
        if (!prod) {
          console.error(`Product not found for ID: ${item.product.id}`)
          continue
        }

        const size = item.size as keyof IProduct
        const requestedQuantity = item.quantity

        const sizeDetails = prod[size] as ISizeDetails

        const totalYardToBeDeducted = sizeDetails.quantity * requestedQuantity

        const updatedYard = prod.yard - totalYardToBeDeducted

        await updateProduct(
          item.product.id,
          {
            yard: updatedYard,
            status: updatedYard <= 0 ? statusMap.outOfStock : prod.status
          },
          session
        )

        console.log(`Updated product ID: ${item.product.id}, size: ${size}, yard: ${updatedYard}`)
      }

      await updateOrder(order.id, { status: 'paid' }, session)

      if (cart) {
        await deleteCart(cart.id, session)
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
    const data = body.data as PaystackChargeSuccess
    const order = await getOrderByFilter({ reference: data.reference })

    if (!order) {
      return errorResponse('Order not found', null, 404)
    }

    // Update order status to failed
    await updateOrder(order.id, { status: 'failed' })

    return errorResponse('Payment failed', null, 400)
  }

  return errorResponse('Event not handled', null, 400)
}
