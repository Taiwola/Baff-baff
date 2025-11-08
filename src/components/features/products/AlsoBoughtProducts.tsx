import React from 'react'
import { ProductList } from '@components/ui'
import { getAlsoBoughtProducts } from '@actions/products.action'

export default async function AlsoBoughtProducts() {
   const products = await getAlsoBoughtProducts()

   return (
      <section className='w-full mt-12'>
         <h6 className='text-[1.125rem] mb-7.5 uppercase font-montserrat font-bold'>YOU also bought</h6>
         <ProductList products={products} variant='alsoBought' />
      </section>
   )
}
