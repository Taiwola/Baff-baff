'use server'

import { getAuthUser } from '@middleware/auth'
import { deleteOrder, getOneOrderById, updateOrder } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformOrder } from '@utils/transform/order.transform'
import { UpdateOrderSchema } from '@utils/validation/order'
import { NextRequest } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', 403)
  }

  const body = await req.json()

  const result = UpdateOrderSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const Order = await getOneOrderById(id)

  if (!Order) {
    return errorResponse('Order does not exist', null, 404)
  }

  try {
    const update = await updateOrder(Order.id, result.data)

    if (!update) {
      return errorResponse('Order failed to update', null, 400)
    }

    return sendResponse('Order updated')
  } catch (error) {
    console.error('Error updating Order', error)
    return errorResponse('Internal server error', null, 500)
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const Order = await getOneOrderById(id)

  if (!Order) {
    return errorResponse('Order does not exist', null, 404)
  }

  const transfromData = transformOrder(Order)

  return sendResponse('Order found', transfromData, 200)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  try {
    await deleteOrder(id)
    return sendResponse('Order deleted successfully')
  } catch (error) {
    console.error('Error deleting Order', error)
    return errorResponse('Internal server error')
  }
}
