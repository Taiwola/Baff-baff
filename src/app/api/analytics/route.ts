import dbConnect from '@lib/database'
import { salesData } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { defaultDailyRange, defaultMonthlyRange, defaultWeeklyRange, defaultYearlyRange } from '@utils/date-range'
import { orderQueryFilter } from '@validations/order'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  await dbConnect()
  const searchParams = req.nextUrl.searchParams

  const orderQuery = orderQueryFilter.safeParse({
    grouping: searchParams.get('grouping')
  })

  const grouping = orderQuery.data?.grouping ?? 'daily';
  const today = new Date();
  let range: { start: Date; end: Date };
 switch (grouping) {
    case 'daily':
      range = defaultDailyRange(today);
      break;
    case 'weekly':
      range = defaultWeeklyRange(today);
      break;
    case 'monthly':
      range = defaultMonthlyRange(today);
      break;
    case 'yearly':
      range = defaultYearlyRange(today);
      break;
    default:
      range = defaultDailyRange(today); 
  }

  const { start: startDate, end: endDate } = range;

  try {
    const data = await salesData(startDate, endDate, grouping)

    return sendResponse('Analytics data fetched successfully', data, 200)
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return errorResponse('Failed to fetch analytics data', null, 500)
  }
}
