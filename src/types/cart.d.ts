type CartItem = {
  id: string
  product: Pick<Product, 'id' | 'category' | 'images' | 'name' | 'type' | 'slug'>
  name: string
  price: number
  fitting: Fitting
  size: CartProductSize
  measurements?: Partial<ShirtMeasurement> & Partial<TrouserMeasurement> & { trouserLength?: string }
  quantity: number
}

type Cart = {
  id?: string
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

type DistinctCartItem = {
  id: string
  size: Size | 'Bespoke'
  fitting: Fitting
}

type CartProductSize = Size | 'Bespoke'
