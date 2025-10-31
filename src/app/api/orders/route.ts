import { getAllOrders } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptOrders } from '@adapters/order.adapter'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { orderQueryFilter } from '@validations/order'

export async function GET(req: NextRequest) {
    await dbConnect()
  try {
    const session = await verifySession()

    const { searchParams } = new URL(req.url)

    const parsed = orderQueryFilter.safeParse({
      page: Number(searchParams.get('page')) ?? undefined,
      limit: Number(searchParams.get('limit')) ?? undefined,
      search: String(searchParams.get('search') || ''),
      status: String(searchParams.get('status') || '')
    })

    const queries = parsed.data

    const page = queries?.page || 1
    const pageSize = queries?.limit || 10

    const filters: OrderFilter = {}

    if (queries?.search) {
      filters.id = { $regex: queries.search, $options: 'i' }
    }

    if (queries?.status) {
      filters.status = queries.status
    }

    filters.page = page
    filters.limit = pageSize

    filters.sort = {createdAt: -1}

    let data
    if (session?.role === 'admin') {
      data = await getAllOrders(filters.id ? { id: filters.id } : filters)
    } else {
      data = await getAllOrders(filters)
    }

    const transform = adaptOrders({ data: data.orders, total: data.count, page, pageSize })

    return sendResponse('Orders fetched successfully', transform, 200)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return errorResponse('Failed to fetch orders', null)
  }
}
