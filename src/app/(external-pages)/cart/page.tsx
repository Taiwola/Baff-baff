import React, { Suspense } from 'react'

import { CartList } from './_components'
import { AlsoBoughtProductsSkeleton } from '@components/ui'
import { AlsoBoughtProducts } from '@components/features/products'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart',
   description: 'Review the items in your shopping bag and proceed to checkout.',
}

export default function Cart() {
   return (
      <main className='app-container py-5 md:py-12'>
         <h1 className='text-[1.125rem] md:text-[2.25rem] font-montserrat mb-5 font-bold'>SHOPPING BAG</h1>

         <section className='w-full'>
            <CartList />
         </section>

         <Suspense fallback={<AlsoBoughtProductsSkeleton />}>
            <AlsoBoughtProducts />
         </Suspense>
      </main>
   )
}
