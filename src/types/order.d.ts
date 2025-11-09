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
  id?: string
  status?: OrderStatus
  sort?: Record<string, number>
}



