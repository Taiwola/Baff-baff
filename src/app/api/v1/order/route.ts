'use server'

import { getAuthUser } from '@middleware/auth'
import { getAllOrders } from '@services/order'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { transformOrders } from '@utils/transform/order.transform'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req)

    const { searchParams } = new URL(req.url)
    const searchQuery = searchParams.get('search') || ''

    const filters: { userId?: string; id?: string } = {
      userId: user?.id
    }

    if (searchQuery) {
      filters.id = searchQuery
    }

    let orders
    if (user?.role === 'admin') {
      orders = await getAllOrders(filters.id ? { id: filters.id } : {})
    } else {
      orders = await getAllOrders(filters)
    }

    const transform = transformOrders(orders)
    return sendResponse('Orders fetched successfully', transform, 200)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return errorResponse('Failed to fetch orders', null)
  }
}
