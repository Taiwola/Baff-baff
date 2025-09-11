import React from 'react'
import Image from 'next/image'

import { Button } from '@components/ui'
import { formatCurrency } from '@utils'
import { CheckoutBreadcrumbs } from '../_components'

type Props = Readonly<{
   children: React.ReactNode
}>

export default function ShippingLayout({ children }: Props) {
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

         {/* Two-column layout */}
         <section className="flex flex-col lg:flex-row justify-between items-start gap-6">
            {/* Left (Form content) */}
            <article className="w-full lg:w-[68%] border border-[#1818184D] rounded-[1.25rem] min-h-[16rem] py-7.5 px-5">
               {children}
            </article>

            {/* Right (Order summary) */}
            <article className="w-full lg:w-[31%]">
               <div className="mb-7.5 border border-foreground rounded-[0.625rem] py-5 px-2.5">
                  {/* Order items */}
                  <div className="flex flex-col divide-y divide-foreground">
                     {items.map((item) => (
                        <div
                           key={item.id}
                           className="flex items-start justify-between py-2.5"
                        >
                           {/* Left side */}
                           <div className="flex items-start gap-2.5">
                              <Image
                                 src={item.img}
                                 alt={item.name}
                                 width={50}
                                 height={50}
                                 className="object-cover"
                              />

                              <div className="flex flex-col text-[0.625rem] text-black">
                                 <span>{item.name}</span>
                                 <span className="w-7.5 h-6 flex justify-center items-center text-[8px] border border-brand-dark">
                                    {item.size}
                                 </span>
                              </div>
                           </div>

                           {/* Price */}
                           <span className="text-xs font-semibold text-brand-dark">
                              {formatCurrency(item.price)}
                           </span>
                        </div>
                     ))}
                  </div>

                  {/* Divider */}
                  <hr className="border-t border-foreground my-2.5" />

                  {/* Subtotal + Delivery */}
                  <div className="space-y-1.5">
                     <div className="flex justify-between text-sm text-black">
                        <span>Subtotal</span>
                        <span>{formatCurrency(65000)}</span>
                     </div>
                     <div className="flex justify-between text-sm text-black">
                        <span>Delivery Fee</span>
                        <span>{formatCurrency(5000)}</span>
                     </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-foreground mt-2.5 pt-2.5 flex justify-between items-center">
                     <span className="text-black">Total</span>
                     <span className="text-[18px] text-brand-dark font-bold">
                        {formatCurrency(70000)}
                     </span>
                  </div>
               </div>

               {/* Button */}
               <Button
                  size="md"
                  fullWidth
                  className="bg-black disabled:bg-[#B5B5B5]"
               >
                  Proceed to Payment
               </Button>
            </article>
         </section>
      </main>
   )
}

const items = [
   {
      id: 1,
      name: 'T-Shirt',
      size: 'M',
      price: 20000,
      img: '/images/product-image.png',
   },
   {
      id: 2,
      name: 'Hoodie',
      size: 'L',
      price: 45000,
      img: '/images/product-image.png',
   },
]
