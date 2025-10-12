type Region = {
  id: string
  city: string
  state: string
  price: number
  createdAt: Date
  updatedAt: Date
}

type RegionFilter = {
  page?: number
  limit?: number
}
