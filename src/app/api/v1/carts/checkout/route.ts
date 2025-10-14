import { errorResponse, sendResponse } from '@utils/api-response'
import { verifySession } from '@lib/dal'
import dbConnect from '@lib/database'
import { NextRequest } from 'next/server'
import { checkoutSchema } from '@validations/checkout'
import { getOneCartById } from '@services/cart'
import { getOneAddressById } from '@services/address'
import { createOrder } from '@services/order'
import { v4 } from 'uuid'
import { getOneRegionById } from '@services/region'
import { IProduct } from '@models/product.model'
import { createOrderSchema } from '@validations/order'
import { initiatePaystackPayment } from '@payment/payment'

export async function POST(req: NextRequest) {
  await dbConnect()
  const session = await verifySession()

  const body = await req.json()
  const result = checkoutSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const { cartId, addressId, regionId } = result.data

  const cart = await getOneCartById(cartId)
  if (!cart || cart.items.length < 1) return errorResponse('You currently have no cart items', null, 404)

  const address = await getOneAddressById(addressId)
  if (!address) return errorResponse('No shipping address Provided', null, 404)

  const region = await getOneRegionById(regionId)
  if (!region) return errorResponse('Region Not Found', null, 404)

  const orderValidation = createOrderSchema.safeParse({
    userId: session?.userId,
    reference: v4(),
    total: cart.items.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0),
    deliveryFee: region.price,
    items: cart.items.map((item) => {
      const product: IProduct = item.product as IProduct
      return {
        name: item.name,
        price: item.price,
        fitting: item.fitting,
        size: item.size,
        measurements: item.measurements,
        quantity: item.quantity,
        product: {
          id: product.id,
          name: product.name,
          type: product.type,
          category: product.category,
          images: product.images
        }
      }
    }),
    shippingAddress: {
      fullName: address.fullName,
      email: address.email,
      phoneNumber: address.phoneNumber,
      altPhoneNumber: address.altPhoneNumber,
      city: address.city,
      state: address.state,
      address: address.address
    }
  })

  if (!orderValidation.success) {
    const validationErrors = orderValidation.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Error Validating Order', validationErrors, 400)
  }

  try {
    // Initiate Paystack payment
    const paymentData: InitiatePayment = {
      amount: orderValidation.data.total,
      email: orderValidation.data.shippingAddress.email,
      reference: orderValidation.data.reference,
      metadata: { cartId }
    }

    const paymentResult = await initiatePaystackPayment(paymentData)

    const order = await createOrder(orderValidation.data)

    return sendResponse('Checkout completed', {
      id: order.id,
      reference: order.reference,
      checkoutUrl: paymentResult.checkoutUrl,
      checkoutCode: paymentResult.checkoutCode
    })
  } catch (error) {
    console.error(error)
    return errorResponse('Failed to create order', null, 500)
  }
}
