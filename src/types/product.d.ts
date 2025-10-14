type ProductStatus = 'inStock' | 'outOfStock'

type Size = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

type IProductSizes = Record<Size, SizeDetails>

const StatusMap: Record<ProductStatus, string> = {
  inStock: 'In Stock',
  outOfStock: 'Out of Stock'
}

type SizeDetails = {
  price: number
  discountPrice?: number
  quantity: number
}

type ProductCategory = 'corporates' | 'casuals'

type ProductType = 'shirt' | 'trouser' | 'jacket' | 'short'

type Fitting = 'fit' | 'baggy' | 'straight'

type ProductSortType = 'featured' | 'best-selling' | 'a-z' | 'z-a' | 'o-n' | 'n-o' // old to new, new to old

// low = 0 - 10,000; mid = 10,000 - 100,000; high = 100,000 +
type PriceRange = 'low' | 'mid' | 'high'

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
  numberOfSales?: -1 | 1
  createdAt?: -1 | 1
  name?: -1 | 1
}

type ProductQuery = PaginationParams &
  MaketplaceFilter & {
    search?: string
  }

const statusMap: Record<ProductStatus, string> = {
  inStock: 'In Stock',
  outOfStock: 'Out of Stock'
}

type MaketplaceFilter = {
  type?: ProductType
  status?: ProductStatus
  price?: PriceRange
  sort?: ProductSortType
  category?: ProductCategory
}
