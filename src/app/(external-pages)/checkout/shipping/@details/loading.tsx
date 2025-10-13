'use client'
import React from 'react'
import { Skeleton } from '@heroui/react'

import { Button } from '@components/ui'

export default function ShippingDetailsSkeleton() {
   return (
      <>
         <div className="mb-7.5 border border-foreground rounded-[0.625rem] py-5 px-2.5 animate-pulse">
            {/* Order items skeleton */}
            <div className="flex flex-col divide-y divide-foreground">
               {[1, 2].map((i) => (
                  <div
                     key={i}
                     className="flex items-start justify-between py-2.5"
                  >
                     {/* Left side */}
                     <div className="flex items-start gap-2.5">
                        <Skeleton className="w-[50px] h-[50px] rounded-[4px]" />
                        <div className="flex flex-col gap-1">
                           <Skeleton className="w-20 h-3 rounded-[4px]" />
                           <Skeleton className="w-10 h-5 rounded-[4px]" />
                        </div>
                     </div>

                     {/* Price */}
                     <Skeleton className="w-10 h-3 rounded-[4px]" />
                  </div>
               ))}
            </div>

            {/* Divider */}
            <hr className="border-t border-foreground my-2.5" />

            {/* Subtotal + Delivery */}
            <div className="space-y-1.5">
               <div className="flex justify-between items-center">
                  <Skeleton className="w-16 h-3 rounded-[4px]" />
                  <Skeleton className="w-10 h-3 rounded-[4px]" />
               </div>
               <div className="flex justify-between items-center">
                  <Skeleton className="w-20 h-3 rounded-[4px]" />
                  <Skeleton className="w-10 h-3 rounded-[4px]" />
               </div>
            </div>

            {/* Total */}
            <div className="border-t border-foreground mt-2.5 pt-2.5 flex justify-between items-center">
               <Skeleton className="w-12 h-3 rounded-[4px]" />
               <Skeleton className="w-16 h-5 rounded-[4px]" />
            </div>
         </div>

         {/* Button */}
         <Button
            disabled
            size="md"
            fullWidth
            className="bg-[#E5E5E5] text-transparent"
         >
            Proceed to Payment
         </Button>
      </>
   )
}
