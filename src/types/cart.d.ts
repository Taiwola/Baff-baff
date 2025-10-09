type CartItem = {
  id: string
  product: Pick<Product, 'id' | 'category' | 'images' | 'name' | 'type'>
  name: string
  price: number
  fitting: Fitting
  size: Size | 'Bespoke'
  measurements?: ShirtMeasurement & TrouserMeasurement
  quantity: number
}

type Cart = {
  id: string
  userId?: string
  email?: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

type CartFilter = {
  page?: number
  limit?: number
  userId?: string
}
