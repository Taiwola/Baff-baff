
export type Order = {
  id: string
  reference: string
  datePlaced: string
  totalAmount: number
  products: Product[]
}

type Product = {
  id: string
  name: string
  price: number
  images: string[]
}
