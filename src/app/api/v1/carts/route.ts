'use server'

import { createCart, getAllCarts } from '@services/cart'
import { getUserById } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptCart, adaptCarts } from '@adapters/cart.adapter'
import { createCartSchema } from '@validations/cart'
import { NextRequest } from 'next/server'
import { verifySession } from '@lib/dal'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const session = await verifySession()
  const { searchParams } = new URL(req.url)
  const pageQuery = searchParams.get('page') || ''
  const limitQuery = searchParams.get('limit') || ''

  const page = parseInt(pageQuery) || 1
  const pageSize = parseInt(limitQuery) || 10

  const carts = await getAllCarts(pageSize, { userId: session?.userId })
  const transform = adaptCarts({ data: carts, page, pageSize })

  return sendResponse('Request was successful', transform, 200)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()

  const findUser = await getUserById(session?.userId as string)

  if (!findUser) {
    return errorResponse('User does not exist', null, 404)
  }
  try {
    const body = await req.json()

    const result = createCartSchema.safeParse(body)
    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return errorResponse('Validation failed', validationErrors, 400)
    }

    result.data.userId = session?.userId

    const cart = await createCart(result.data)
    const transform = adaptCart(cart)

    return sendResponse('Cart created successfully', transform, 201)
  } catch (error) {
    console.error('Cart creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
