import { getOneOrderById } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptOrder } from '@adapters/order.adapter'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'

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
