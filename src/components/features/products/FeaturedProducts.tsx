import React from 'react'

import { ProductList } from '@components/ui'
import { getProducts } from '@actions/products.action'

export default async function FeaturedProducts() {
   const products = await getProducts({ limit: 5, sort: 'featured' })

   return (
      <section className='w-full py-12 container mx-auto'>
         <h4 className="home-label mb-5 md:mb-12">
            featured products
         </h4>

         <ProductList products={products.items} />
      </section>
   )
}
