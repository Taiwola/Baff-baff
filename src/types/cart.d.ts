type CartItem = {
  id: string
  product: Pick<Product, 'id' | 'category' | 'images' | 'name' | 'type'>
  name: string
  price: number
  fitting: Fitting
  size: Size | 'Bespoke'
  measurements?: Partial<ShirtMeasurement> & Partial<TrouserMeasurement> & { trouserLength?: string }
  quantity: number
}

type Cart = {
  id: string
  userId?: string
  items: CartItem[]
  createdAt: string
  updatedAt: string
}

type CartFilter = {
  page?: number
  limit?: number
  userId?: string
}
