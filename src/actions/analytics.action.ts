'use server'

import { ServerApiClient } from '@utils/api-server'
import { defaultDailyRange } from '@utils/date-range'

export async function getRevenueOverview(): Promise<RevenueOverview> {
  const response = await ServerApiClient.get<RevenueOverview>('/analytics', { cache: 'force-cache' })

  if (response.code >= 400) {
    console.log('Get Revenue error', response.message)
    const { start, end } = defaultDailyRange(new Date())
    return { daily: [], weekly: [], monthly: [], yearly: [], startDate: start, endDate: end }
  }

  return response.data
}

export async function getStats(): Promise<OverviewStats> {
  const response = await ServerApiClient.get<OverviewStats>('/analytics/stats')

  if (response.code >= 400) {
    console.log('analytics stats error: ', response)
    return { totalCompletedOrders: 0, totalOrders: 0, totalPendingOrders: 0, totalProducts: 0 }
  }

  return response.data
}
