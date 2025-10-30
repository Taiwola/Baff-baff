import React from 'react'
import ProductItem from './ProductItem'
import { PackageSearch } from 'lucide-react'

type Props = {
  products: Product[]
  variant?: 'default' | 'marketplace' | 'maylike'
}

const variants = {
  default: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5',
  marketplace: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
  maylike: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
}

export default function ProductList({ products, variant = 'default' }: Props) {

  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <PackageSearch size={36} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">No products found</h3>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Try adjusting your filters or check back later.
        </p>
      </div>
    )
  }

  return (
    <article className={`w-full grid gap-5 ${variants[variant]}`}>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </article>
  )
}
