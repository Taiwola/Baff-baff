import React from 'react'

export default function CartSkeleton() {
   return (
      <div className="w-full flex flex-col font-montserrat animate-pulse">
         {/* Cart items */}
         <div className="border-t border-b border-brand-dark">
            {[...Array(3)].map((_, i) => (
               <div
                  key={i}
                  className="flex items-start justify-between py-5 md:py-7.5 gap-5"
               >
                  {/* Product image */}
                  <div className="w-[200px] h-[200px] bg-gray-300 rounded-md" />

                  {/* Product details */}
                  <div className="flex flex-col flex-1 gap-5">
                     <Skeleton className="h-6 w-2/3" /> {/* Product name */}
                     <Skeleton className="h-[44px] w-[50px]" /> {/* Size */}
                     <Skeleton className="h-5 w-1/4" /> {/* Price */}
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col-reverse items-end md:flex-row md:items-start gap-12 md:gap-24">
                     {/* Quantity button */}
                     <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-5 w-16 hidden md:block" />
                        <Skeleton className="h-10 w-[120px] rounded-md" />
                     </div>

                     {/* Remove button */}
                     <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
               </div>
            ))}
         </div>

         {/* Cart summary */}
         <div className="flex flex-col items-end gap-2.5 mt-6">
            <div className="flex items-center justify-between w-full md:w-[19rem]">
               <Skeleton className="h-5 w-[100px]" />
               <Skeleton className="h-5 w-[80px]" />
            </div>

            <Skeleton className="h-4 w-full md:w-[19rem]" />

            <Skeleton className="h-10 w-full md:w-[300px] rounded-md" />
         </div>
      </div>
   )
}


function Skeleton({ className = '' }: { className?: string }) {
   return (
      <div
         className={`bg-gray-300 rounded-md ${className}`}
      />
   )
}
