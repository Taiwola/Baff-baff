import React from 'react'
import { ProductList } from '@components/ui'

import { getMayLikeProducts } from '@actions/products.action'

export default async function MayLikeProducts() {
   const products = await getMayLikeProducts()

   return (
      <section className='w-full'>
         <h6 className='text-[18px] mb-7.5'>YOU MAY ALSO LIKE</h6>
         <ProductList products={products} variant='maylike' />
      </section>
   )
}
