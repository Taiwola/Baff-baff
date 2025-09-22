'use server'

import { deleteCart, getOneCartById, updateCart } from '@services/cart'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { transformCart } from '@utils/transform/cart.transform'
import { updateCartSchema } from '@utils/validation/cart'
import { NextRequest } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id

  const body = await req.json()

  const result = updateCartSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const Cart = await getOneCartById(id)

  if (!Cart) {
    return errorResponse('Cart does not exist', null, 404)
  }

  try {
    const update = await updateCart(Cart?.id, result.data)

    if (!update) {
      return errorResponse('Cart failed to update', null, 400)
    }

    return sendResponse('Cart updated')
  } catch (error) {
    console.error('Error updating Cart', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const Cart = await getOneCartById(id)

  if (!Cart) {
    return errorResponse('Cart does not exist', null, 404)
  }

  const transfromData = transformCart(Cart)

  return sendResponse('Cart found', transfromData, 200)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id

  try {
    await deleteCart(id)
    return sendResponse('Cart deleted successfully')
  } catch (error) {
    console.error('Error deleting Cart', error)
    return errorResponse('Internal server error')
  }
}
