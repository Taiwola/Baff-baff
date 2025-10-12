import React from 'react'
import ProductItem from './ProductItem'

type Props = {
  products: Product[]
  variant?: 'default' | 'marketplace' | 'maylike'
}

const variants = {
  default: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5',
  marketplace: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4',
  maylike: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
}

export default function ProductList({ products, variant = 'default' }: Props) {
  return (
    <article className={`w-full grid gap-5 ${variants[variant]}`}>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </article>
  )
}
