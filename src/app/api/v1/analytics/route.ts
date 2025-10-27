import dbConnect from '@lib/database'
import { salesData } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { orderQueryFilter } from '@validations/order'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  await dbConnect()
  const searchParams = req.nextUrl.searchParams
  const groupings = searchParams.getAll('groupings')
  const orderQuery = orderQueryFilter.safeParse({
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
    groupings: groupings.length > 0 ? groupings : undefined
  })
  const currentYear = new Date().getFullYear()
  const startDate = orderQuery.data?.startDate ? new Date(orderQuery.data.startDate) : new Date(currentYear, 0, 1)
  const endDate = orderQuery.data?.endDate ? new Date(orderQuery.data?.endDate) : new Date(currentYear, 11, 31, 23, 59, 59, 999)
  const groupingArray = orderQuery.data?.groupings ? orderQuery.data?.groupings : ['daily']
  try {
    const data = await salesData(startDate, endDate, groupingArray)
    return sendResponse('Analytics data fetched successfully', data, 200)
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return errorResponse('Failed to fetch analytics data', null, 500)
  }
}
