import { PaystackChargeSuccess, PaystackWebhook } from '@payment/payment.interface'
import { getOrderByFilter, updateOrder } from '@services/order'
import { getOneProductById, updateProduct } from '@services/product'
import { NextRequest } from 'next/server'
import mongoose from 'mongoose'
import { errorResponse, sendResponse } from '@utils/api-response'
import { deleteCart, getCartById } from '@services/cart'
import dbConnect from '@lib/database'
import { getSize } from '@utils'
import { generateAdminOrderEmail, generateOrderPaymentEmail } from '@utils/mail-content'
import { sendBulkEmail, sendEmail } from '@lib/mail'
import { getAllUsers } from '@services/user'
import { number } from 'zod'

const isLocal = process.env.NODE_ENV !== 'production'

export async function POST(req: NextRequest) {
  await dbConnect()

  const body: PaystackWebhook<PaystackChargeSuccess> = await req.json()

  if (body.event === 'charge.success') {
    const data = body.data as PaystackChargeSuccess
    const order = await getOrderByFilter({ reference: data.reference })
    const cart = await getCartById(String(data.metadata.cartId))

    if (!order || order.status !== 'pending') {
      return
    }

    const session = isLocal ? undefined : await mongoose.startSession()
    if (session) session.startTransaction()

    try {
      const items = order.items

      for (const item of items) {
        const prod = await getOneProductById(item.product.id)

        if (!prod) {
          console.error(`Product not found for ID: ${item.product.id}`)
          continue
        }

        let size = item.size
        const requestedQuantity = item.quantity

        if (size === 'Bespoke') {
          if (!item.measurements) continue
          size = getSize(item.measurements)
        }

        const sizeDetails = prod[size]

        const totalYardToBeDeducted = sizeDetails.quantity * requestedQuantity

        const updatedYard = prod.yard - totalYardToBeDeducted

        await updateProduct(
          item.product.id,
          {
            yard: updatedYard,
            status: updatedYard <= 0 ? statusMap.outOfStock : prod.status,
            numberOfSales: (prod.numberOfSales || 0) + requestedQuantity
          },
          session
        )

        console.log(`Updated product ID: ${item.product.id}, size: ${size}, yard: ${updatedYard}`)
      }

      await updateOrder(order.id, { status: 'paid' }, session)

      if (cart) {
        await deleteCart(cart.id, session)
      }

      if (session) await session.commitTransaction()
      if (session) session.endSession()

    
        // Send emails after successful transaction (don't block webhook on email failures)
        setImmediate(async () => {
          try {
            // Send customer confirmation email
            const customerContent = generateOrderPaymentEmail(
              { name: order.shippingAddress.fullName, email: order.shippingAddress.email },
              order.id
            )
            const { error: customerError, errorMessage: customerErrorMsg } = await sendEmail(
              order.shippingAddress.email,
              customerContent,
              'Payment confirmation',
              'Baffa Baffa'
            )

            if (customerError) {
              console.error('Failed to send customer confirmation email:', customerErrorMsg)
            }

            // Send admin notification emails
            const {users} = await getAllUsers({ role: 'admin' })
            const adminEmails = users.map(admin => admin.email).filter(Boolean) as string[]

            if (adminEmails.length > 0) {
              const adminContent = generateAdminOrderEmail(order.id)
              const bulkRecipients: BulkRecipient[] = adminEmails.map(email => ({ email }))
              const { failed } = await sendBulkEmail(
                bulkRecipients,
                'New Order Placed',
                adminContent,
                'Baffa Baffa',
                {}
              )

              if (failed.length > 0) {
                console.error('Failed to send admin order emails to:', failed)
              }
            }
          } catch (emailError) {
            console.error('Error sending notification emails:', emailError)
          }
        })

    return sendResponse('Webhook processed successfully',null, 200)
    } catch (error) {
      if (session) await session.abortTransaction()
      if (session) session.endSession()
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