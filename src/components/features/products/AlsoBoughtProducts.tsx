import React from 'react'
import { ProductList } from '@components/ui'

export default async function AlsoBoughtProducts() {
   return (
      <section className='w-full mt-12'>
         <h6 className='text-[1.125rem] mb-7.5 uppercase font-montserrat font-bold'>YOU also bought</h6>
         <ProductList products={[]} variant='alsoBought' />
      </section>
   )
}
