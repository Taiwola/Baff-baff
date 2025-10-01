'use server'

import { getAllOrders } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformOrders } from '@adapters/order.adapter'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { paginate } from '@utils/pagination'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  try {
    const session = await verifySession()

    const { searchParams } = new URL(req.url)
    const searchQuery = searchParams.get('search') || ''

    const filters: { userId?: string; id?: string } = {
      userId: session?.userId
    }

    if (searchQuery) {
      filters.id = searchQuery
    }

    let orders
    if (session?.role === 'admin') {
      orders = await getAllOrders(filters.id ? { id: filters.id } : {})
    } else {
      orders = await getAllOrders(filters)
    }

    const transform = transformOrders(orders)

    const pageQuery = searchParams.get('page') || ''
    const limitQuery = searchParams.get('limit') || ''

    const page = parseInt(pageQuery) || 1
    const pageSize = parseInt(limitQuery) || 10

    const pagination = paginate({ data: transform, page, pageSize })

    return sendResponse('Orders fetched successfully', pagination, 200)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return errorResponse('Failed to fetch orders', null)
  }
}
