import React from 'react'

type Props = {
   length?: number
}

export default function DashboardProductsSkeleton({ length = 6 }: Props) {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-7.5 mb-5 w-full">
         {Array.from({ length }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>
   )
}


function ProductSkeleton() {
   return (
      <div className="w-full h-[28rem] bg-white flex flex-col shadow animate-pulse">
         {/* Image skeleton */}
         <div className="w-full h-[22rem] bg-gray-200 border border-gray-300" />

         {/* Content skeleton */}
         <div className="flex-1 flex flex-col p-2.5 gap-2">
            <div className="flex items-start justify-between">
               <div className="h-4 w-2/3 bg-gray-200 rounded" />
               <div className="h-6 w-6 bg-gray-200 rounded-full" />
            </div>
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-3 w-1/4 bg-gray-200 rounded" />
         </div>
      </div>
   )
}