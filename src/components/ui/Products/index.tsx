import React from 'react'
import ProductItem from './ProductItem'
import { Product } from '@models/product.model'

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </article>
  )
}
