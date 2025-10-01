import { InitiatePaystackPayment } from '@payment/payment'
import { getAllCarts } from '@services/cart'
import { getOneRegionById } from '@services/region'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptCart } from '@adapters/cart.adapter'
import { createCheckoutSchema } from '@validations/checkout/create-checkout.validation'
import { CreateOrderDto, CreateOrderSchema } from '@validations/order'
import { NextRequest } from 'next/server'
import { getOneProductById } from '@services/product'
import { createOrder } from '@services/order'
import { verifySession } from '@lib/dal'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  // Validate user
  const session = await verifySession()

  // Parse and validate request body
  const body = await req.json()
  const result = createCheckoutSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  // Fetch user carts
  const userCarts = await getAllCarts({ userId: session?.userId })
  console.log(userCarts)
  if (userCarts.length <= 0) {
    return errorResponse('You currently have no cart items', null, 404)
  }

  // Fetch region
  const region = await getOneRegionById(result.data.regionId)
  if (!region) {
    return errorResponse('Region does not exist', null, 404)
  }

  // Calculate amount from carts
  const amount = userCarts.reduce((sum, cart) => {
    const quantity = parseInt(cart.quantity)
    if (isNaN(quantity)) {
      throw new Error(`Invalid quantity for cart item ${cart.id}`)
    }
    return sum + cart.price * quantity
  }, 0)

  const products = await Promise.all(
    userCarts.map(async (cart) => {
      const transformed = adaptCart(cart)
      const product = await getOneProductById(cart.product.id as string)
      return {
        id: product?.id as string,
        name: product?.name as string,
        price: transformed.price,
        image: product?.images[0] as string,
        category: ((product?.category as string) + ' - ' + product?.category_type) as string,
        size: transformed.size,
        quantity: transformed.quantity
      }
    })
  )

  try {
    // Initiate Paystack payment
    const paymentData = {
      amount,
      email: result.data.email,
      reference: `ORDER_${Date.now()}_${session?.userId}`
    }
    const paymentResult = await InitiatePaystackPayment(paymentData)

    // Create order data
    const orderData: Partial<CreateOrderDto> = {
      reference: paymentResult.reference,
      userId: session?.userId.toString(),
      address: result.data.address,
      state: result.data.state,
      region: result.data.region,
      deliveryFee: region.price,
      email: result.data.email,
      amount,
      totalAmount: amount + region.price,
      fullName: result.data.fullName,
      phoneNumber: result.data.phoneNumber,
      paymentStatus: 'unpaid',
      status: 'not_start',
      products
    }
    const orderResult = CreateOrderSchema.safeParse(orderData)
    if (!orderResult.success) {
      const validationErrors = orderResult.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return errorResponse('Validation failed', validationErrors, 400)
    }
    const saveOrder = await createOrder(orderResult.data)

    return sendResponse('Checkout completed', {
      id: saveOrder.id,
      reference: saveOrder.reference,
      checkoutUrl: paymentResult.checkoutUrl,
      checkoutCode: paymentResult.checkoutCode
    })
  } catch (error) {
    console.error(error)
    return errorResponse('Failed to create order', null, 500)
  }
}
