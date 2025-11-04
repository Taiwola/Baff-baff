import React from 'react'
import ProductItem from './ProductItem'
import EmptyProductList from './EmptyProductList'

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
     <EmptyProductList variant={variant} />
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
