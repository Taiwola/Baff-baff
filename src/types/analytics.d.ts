type OverviewStats = {
  totalProducts: number
  totalOrders: number
  totalCompletedOrders: number
  totalPendingOrders: number
}


type Grouping = 'daily' | 'weekly' | 'monthly' | 'yearly'



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type YearlyItem  = { year: number; revenue: number }
type MonthlyItem = { year: number; month: string; revenue: number }
type WeeklyItem = { year: number; month: string; weekOfMonth: number; revenue: number }
type DayName = typeof days[number]
type DailyItem  = { year: number; month: string; dayOfWeek: number; name: DayName; revenue: number }


type SalesDataResult = {
  yearly?: YearlyItem[]
  monthly?: MonthlyItem[]
  weekly?: WeeklyItem[]
  daily?: DailyItem[]
}