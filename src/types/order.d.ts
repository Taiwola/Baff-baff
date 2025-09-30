type OrderStatus = 'notStart' | 'processing' | 'delivered'

type Order = {
  id: string
  date: string
  orderId: string
  fullName: string
  email: string
  phoneNumber: string
  deliveryZone: string
  address: string
  status: OrderStatus
  paymentStatus: string
  subTotal: number
  deliveryFee: number
  totalAmount: number
  products: OrderProduct[]
}

type OrderProduct = {
  id: string
  name: string
  image: string
  category: string
  quantity: string
  size: string
  price: number
}

