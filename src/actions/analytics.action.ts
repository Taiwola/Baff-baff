import { ServerApiClient } from '@utils/api-server'

export async function getStats(): Promise<OverviewStats> {
  const response = await ServerApiClient.get<OverviewStats>('/analytics/stats')

  if (response.code >= 400) {
    console.log('analytics stats error: ', response)
    return { totalCompletedOrders: 0, totalOrders: 0, totalPendingOrders: 0, totalProducts: 0 }
  }

  return response.data
}
