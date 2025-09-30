interface Product {
  id: string
  slug: string
  name: string
  images: string[]
  price: number
  discountPrice?: number
  stockCount: number
  createdAt: string
}