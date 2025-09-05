import React from 'react'

import { ProductList } from '@components/ui'
import { Product } from '@models/product.model'

export default function FeaturedProducts() {
   return (
      <section className='w-full py-12 container mx-auto'>
         <h4 className="home-label mb-5 md:mb-12">
            featured products
         </h4>

         <ProductList products={products} />
      </section>
   )
}

const products: Product[] = [
   {
      id: "1",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "2",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "3",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "4",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "5",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "6",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
]
