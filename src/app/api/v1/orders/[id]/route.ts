import { getOneOrderById, updateOrder } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptOrder } from '@adapters/order.adapter'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { updateOrderSchema } from '@validations/order'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()

  const id = (await params).id
  const Order = await getOneOrderById(id)

  if (!Order) {
    return errorResponse('Order does not exist', null, 404)
  }

  const transfromData = adaptOrder(Order)

  return sendResponse('Order found', transfromData, 200)
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect()
    const body = await req.json() 
   const id = (await params).id
  const Order = await getOneOrderById(id)

  if (!Order) {
    return errorResponse('Order does not exist', null, 404)
  }

  const result = updateOrderSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }
  const { status } = result.data

  try {
    const updtOrder = await updateOrder(Order.id, {status: status})
    if (!updtOrder) {
      return errorResponse('Order update failed', null, 500)
    }
    const transfromData = adaptOrder(updtOrder)
    return sendResponse('Order updated successfully', transfromData, 200)
  } catch (error) {
    console.error('Error updating order:', error)
    return errorResponse('Failed to update order', null, 500)
  }
}