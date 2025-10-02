type ProductStatus = 'inStock' | 'outOfStock'

type Size = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

type IProductSizes = Record<Size, SizeDetails>

type SizeDetails = {
  price: number
  discountPrice?: number
  quantity: number
}

type ProductCategory = 'corporates' | 'casuals'

type ProductType = 'shirt' | 'trouser'

type Fitting = 'fit' | 'baggy' | 'straight'

type Product = {
  id: string
  slug: string
  range?: string
  images: string[]
  description: string
  category: ProductCategory
  type: ProductType
  fittings: Fitting[]
  material: string
  yard: number
  name: string
  status: ProductStatus
  sizes: IProductSizes
  createdAt: string
  updatedAt: string
}

type ProductFilter = {
  name?: { $regex: string; $options: string }
  category?: ProductCategory
  type?: ProductType
  status?: Status
  limit?: number
}
