'use server'

import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { ICart } from '@models/cart.model'
import { cartSchema } from '@validations/cart'
import { adaptCart } from '@adapters/cart.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { createCart, getCartByFilter, getOneCartById, mergeItems } from '@services/cart'
import { createMeasurement, getMeasurementByFilter, updateMeasurement } from '@services/measurement'

export async function GET() {
  await dbConnect()
  const session = await verifySession()
  const cookieStore = await cookies()
  const guestCartId = cookieStore.get('guestCartId')?.value

  let cart: ICart | null = null

  // if the user is logged in
  if (session?.userId) {
    cart = await getCartByFilter({ userId: session.userId })
  }

  // if the user is a guest and has a guest cart
  else if (guestCartId) {
    cart = await getOneCartById(guestCartId)
  }

  if (!cart) return errorResponse('cart not found', null, 404)

  const adaptedCart = adaptCart(cart)
  return sendResponse('success', adaptedCart)
}

// user is not logged in, has no cart in cookie or db
// user is not logged in, has cart in cookie
// user is logged in, has cart in cookie, no cart in db
// user is logged in has in cookie and db
export async function POST(req: NextRequest) {
  await dbConnect()
  const session = await verifySession()
  const userId = session?.userId

  const cookieStore = await cookies()
  const guestCartId = cookieStore.get('guestCartId')?.value

  try {
    const body = await req.json()
    const result = cartSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 400)
    }

    let cart: ICart | null = null

    // If user is logged in
    if (userId) {
      cart = await getCartByFilter({ userId })

      if (!cart) {
        // Create a new cart for logged-in user
        cart = await createCart({ ...result.data, userId })
      } else {
        // Merge incoming items with existing cart
        cart.items = mergeItems(cart.items, result.data.items)
        await cart.save()
      }

      let measurements = null

      for (const item of result.data.items) {
        if (item.saveMeasurements && item.size === 'Bespoke') {
          measurements = item.measurements
        }
      }

      if (measurements) {
        const userMeasurement = await getMeasurementByFilter({ userId })
        if (userMeasurement) updateMeasurement(userMeasurement.id, { ...measurements })
        else createMeasurement({ ...measurements, userId })
      }
    }

    // If user is a guest but has a guest cart
    else if (guestCartId) {
      cart = await getOneCartById(guestCartId)

      if (cart) {
        cart.items = mergeItems(cart.items, result.data.items)
        await cart.save()
      } else {
        cart = await createCart(result.data)
      }
    }

    // Guest without a cart
    else {
      cart = await createCart(result.data)
    }

    const adaptedCart = adaptCart(cart)

    // Set/update guest cart cookie if user is not logged in
    if (!userId && !guestCartId) {
      const expiry = new Date()
      expiry.setDate(expiry.getDate() + 30)

      cookieStore.set('guestCartId', cart.id, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: expiry
      })
    }

    return sendResponse('Cart created successfully', adaptedCart, 201)
  } catch (error) {
    console.error('Cart creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
