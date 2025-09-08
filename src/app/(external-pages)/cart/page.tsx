import React from 'react'
import { CartContent, EmptyCart } from './_components'
import { ProductList } from '@components/ui'
import { products } from '@models/product.model'

export default function Cart() {
   return (
      <main className='app-container py-5 md:py-12'>
         <h1 className='text-[1.125rem] md:text-[2.25rem] font-montserrat mb-5 font-bold'>SHOPPING BAG</h1>

         <section className='w-full'>
            {cartItems.length <= 0 ? <EmptyCart /> : <CartContent />}
         </section>

         <section className='w-full mt-12'>
            <h6 className='text-[1.125rem] mb-7.5 uppercase font-montserrat font-bold'>YOU also bought</h6>
            <ProductList products={products.slice(0, 3)} variant='maylike' />
         </section>
      </main>
   )
}

const cartItems = [1]
