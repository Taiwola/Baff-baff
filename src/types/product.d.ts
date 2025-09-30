type Status = 'inStock' | 'outOfStock'

type Product = {
  id: string
  slug: string
  range?: string
  images: string[]
  description: string
  category: string
  categoryType: string
  material: string
  yard: number
  name: string
  status: Status
  sizes?: ISizeDetails[]
  createdAt: string
  updatedAt: string
}

interface IProductSizes {
  s?: ISizeDetails
  m?: ISizeDetails
  l?: ISizeDetails
  xl?: ISizeDetails
  xxl?: ISizeDetails
  xxxl?: ISizeDetails
}

interface ISizeDetails {
  size: string
  price: number
  discountPrice?: number
  quantity: number
}
