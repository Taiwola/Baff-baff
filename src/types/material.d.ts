type Material = {
  id: string
  name: string
  stock: number
  image: string
  status: MaterialStatus
  createdAt: Date
  updatedAt: Date
}

type MaterialStatus = 'In Stock' | 'Out of Stock'

type MaterialFilter = {
  page?: number
  limit?: number
  userId?: string
}
