'use server'

import { getAuthUser } from '@middleware/auth'
import { createCart, getAllCarts } from '@services/cart'
import { getUserById } from '@services/user'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { transformCart, transformCarts } from '@utils/transform/cart.transform'
import { createCartSchema } from '@utils/validation/cart'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req)

  const measurement = await getAllCarts({ userId: user?.id })
  const transform = transformCarts(measurement)

  return sendResponse('Request was successful', transform, 200)
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req)

  const findUser = await getUserById(user?.id as string)

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

    result.data.userId = user?.id

    const cart = await createCart(result.data)
    const transform = transformCart(cart)

    return sendResponse('Cart created successfully', transform, 201)
  } catch (error) {
    console.error('Cart creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
