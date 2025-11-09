import React from 'react'

import { CheckoutBreadcrumbs } from '../_components'
import { Metadata } from 'next'

type Props = Readonly<{
   address: React.ReactNode
   details: React.ReactNode
}>

export const metadata: Metadata = {
  title: 'Checkout - Shipping',
   description: 'Provide your shipping information to complete your order.',
}

export default function ShippingLayout({ address, details }: Props) {
   return (
      <main className="app-container py-5 md:py-12 font-montserrat">
         {/* Breadcrumbs */}
         <nav className="w-full mb-7.5">
            <CheckoutBreadcrumbs />
         </nav>

         {/* Page Title */}
         <h1 className="text-[1.125rem] md:text-[2.25rem] font-montserrat mb-7 font-bold uppercase">
            Shipping
         </h1>
 
         <section className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <article className="w-full lg:w-[68%] border border-[#1818184D] rounded-[1.25rem] min-h-[16rem] py-7.5 px-5">
               {address}
            </article>
        
            <article className="w-full lg:w-[31%]">
               {details}
            </article>
         </section>
      </main>
   )
}