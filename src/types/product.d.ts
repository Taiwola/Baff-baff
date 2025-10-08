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
  images: string[]
  description: string
  category: ProductCategory
  type: ProductType
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
  status?: ProductStatus
  limit?: number
  sort?: ProductSort
}

type ProductSort = {
  numberOfSales?: 'asc' | 'desc'
  createdAt?: 'asc' | 'desc'
  name?: 'asc' | 'desc'
}

type ProductQuery = PaginationParams & {
  status?: ProductStatus
  search?: string
}

const statusMap: Record<ProductStatus, string> = {
  inStock: 'In Stock',
  outOfStock: 'Out of Stock'
}
