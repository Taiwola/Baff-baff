type OrderStatus = 'pending' | 'paid' | 'delivered' | 'cancelled'

type Order = {
  id: string
  userId?: string
  reference: string
  items: OrderItem[]
  total: number
  deliveryFee: number
  status: OrderStatus
  shippingAddress: OrderShippingAddress
  createdAt: string
}

type OrderItem = Omit<CartItem, 'id'>

type OrderShippingAddress = Omit<Address, 'id' | 'userId' | 'active' | 'createdAt' | 'updatedAt'>

type OrderFilter = {
  page?: number
  limit?: number
  userId?: string
  id?: { $regex: string; $options: string }
  status?: OrderStatus
  sort?: Record<string, number>
}



type OverviewStats = {
  totalProducts: number
  totalOrders: number
  totalCompletedOrders: number
  totalPendingOrders: number
}


type Grouping = 'daily' | 'weekly' | 'monthly' | 'yearly'



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type YearlyItem  = { year: number; totalSales: number }
type MonthlyItem = { year: number; month: string; totalSales: number }
type WeeklyItem = { year: number; month: string; weekOfMonth: number; totalSales: number }
type DayName = typeof days[number]
type DailyItem  = { year: number; month: string; dayOfWeek: number; dayName: DayName; totalSales: number }


type SalesDataResult = {
  yearly?: YearlyItem[]
  monthly?: MonthlyItem[]
  weekly?: WeeklyItem[]
  daily?: DailyItem[]
}