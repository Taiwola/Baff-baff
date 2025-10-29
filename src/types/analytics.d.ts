type OverviewStats = {
  totalProducts: number
  totalOrders: number
  totalCompletedOrders: number
  totalPendingOrders: number
}

type Grouping = 'daily' | 'weekly' | 'monthly' | 'yearly'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

type RevenueStat = {
  name: string
  revenue: number
}

type RevenueOverview = {
  yearly: RevenueStat[]
  monthly: RevenueStat[]
  weekly: RevenueStat[]
  daily: RevenueStat[]
}
