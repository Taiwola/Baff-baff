type Region = {
  id: string
  region: string
  state: string
  price: number
  createdAt: Date
  updatedAt: Date
}

type RegionFilter = {
  page?: number
  limit?: number
}
