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

// user is not logged in, has no cart in cookie or db
// user is not logged in, has cart in cookie
// user is logged in, has cart in cookie, no cart in db
// user is logged in has in cookie and db

export async function GET() {
  await dbConnect()
  const session = await verifySession()
  const cookieStore = await cookies()
  const guestCartId = cookieStore.get('guestCartId')?.value

  let cart: ICart | null = null

  if (session?.userId) {
    cart = await getCartByFilter({ userId: session.userId })
  } else if (guestCartId) {
    cart = await getOneCartById(guestCartId)
  }

  if (!cart) return errorResponse('cart not found', null, 404)

  const adaptedCart = adaptCart(cart)
  return sendResponse('success', adaptedCart)
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const session = await verifySession()
  const userId = session?.userId

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

    if (userId) {
      let cart = await getCartByFilter({ userId })
      if (!cart) {
        cart = await createCart({ ...result.data, userId })
      } else {
        cart.items = mergeItems(cart.items, result.data.items)
        await cart.save()
      }

      const adaptedCart = adaptCart(cart)
      return sendResponse('Cart created successfully', adaptedCart, 201)
    }

    const cart = await createCart(result.data)
    const adaptedCart = adaptCart(cart)

    const cookieStore = await cookies()
    const future = new Date()
    cookieStore.set('guestCartId', cart.id, {
      httpOnly: true,
      secure: true,
      expires: future.setDate(future.getDate() + 30),
      sameSite: 'lax',
      path: '/'
    })

    return sendResponse('Cart created successfully', adaptedCart, 201)
  } catch (error) {
    console.error('Cart creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
