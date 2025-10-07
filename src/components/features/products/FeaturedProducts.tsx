import React from 'react'

import { ProductList } from '@components/ui'

export default function FeaturedProducts() {
   return (
      <section className='w-full py-12 container mx-auto'>
         <h4 className="home-label mb-5 md:mb-12">
            featured products
         </h4>

         <ProductList products={[]} />
      </section>
   )
}
