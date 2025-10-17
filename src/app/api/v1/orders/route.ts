import { getAllOrders } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptOrders } from '@adapters/order.adapter'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { orderQueryFilter } from '@validations/order'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  try {
    const session = await verifySession()

    const { searchParams } = new URL(req.url)

    const parsed = orderQueryFilter.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      search: searchParams.get('search')
    })

    const queries = parsed.data

    const page = queries?.page || 1
    const pageSize = queries?.limit || 10

    const filters: OrderFilter = {}

    if (queries?.search) {
      filters.id = { $regex: queries.search, $options: 'i' }
    }

    filters.page = page
    filters.limit = pageSize

    let orders
    if (session?.role === 'admin') {
      orders = await getAllOrders(filters.id ? { id: filters.id } : filters)
    } else {
      orders = await getAllOrders(filters)
    }

    const transform = adaptOrders({ data: orders, page, pageSize })

    return sendResponse('Orders fetched successfully', transform, 200)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return errorResponse('Failed to fetch orders', null)
  }
}
