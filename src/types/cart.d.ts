interface Cart {
  id: string
  price: number
  size: string
  quantity: string
  subtotal: number
  userId: mongoose.Types.ObjectId | string
  product: {
    id: string
    name: string
    images: string[]
  }
  createdAt: Date
  updatedAt: Date
}

type CartFilter = {
  page?: number
  limit?: number
  userId?: string
}
