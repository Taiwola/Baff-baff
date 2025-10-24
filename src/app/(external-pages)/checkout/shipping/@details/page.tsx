import React from 'react'
import Image from 'next/image'

import { formatCurrency } from '@utils'
import { ServerApiClient } from '@utils/api-server'

import { getRegionSC } from '@actions/regions.action'
import { getActveAddress } from '@actions/addresses.action'

import DetailsButton from './DetailsButton'

export default async function ShippingDetailsPage() {
   const response = await ServerApiClient.get<Cart | null>('/carts')
   const cartItems = response.data?.items || []

   const address = await getActveAddress()
   const region = await getRegionSC(address?.state || '', address?.city || '')
   const deliveryFee = region?.price || 0
   const subTotal = cartItems.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0)

   return (
      <>
         <div className="mb-7.5 border border-foreground rounded-[0.625rem] py-5 px-2.5">
            {/* Order items */}
            <div className="flex flex-col divide-y divide-foreground max-h-[200px] overflow-y-auto no-scrollbar">
               {cartItems.map((item) => (
                  <div
                     key={item.id}
                     className="flex items-start justify-between py-2.5"
                  >
                     {/* Left side */}
                     <div className="flex items-start gap-2.5">
                        <Image
                           src={item.product.images[0]}
                           alt={item.name}
                           width={50}
                           height={50}
                           className="object-cover"
                        />

                        <div className="flex flex-col text-[0.625rem] text-black">
                           <span>{item.name}</span>

                           <span className="min-w-5.5 h-6 flex justify-center items-center text-[8px] border border-brand-dark uppercase">
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
                  <span>{formatCurrency(subTotal)}</span>
               </div>

               <div className="flex justify-between text-sm text-black">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
               </div>
            </div>

            {/* Total */}
            <div className="border-t border-foreground mt-2.5 pt-2.5 flex justify-between items-center">
               <span className="text-black">Total</span>
               <span className="text-[18px] text-brand-dark font-bold">
                  {formatCurrency(subTotal + deliveryFee)}
               </span>
            </div>
         </div>

         <DetailsButton address={address} region={region} cart={response.data} />
      </>
   )
}
