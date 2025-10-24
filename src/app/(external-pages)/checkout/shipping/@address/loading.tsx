import React from 'react'

export default function ShippingAddressSkeleton() {
   return (
      <div className="flex flex-col items-start justify-start animate-pulse">
         {/* Heading */}
         <div className="h-5 w-40 bg-gray-300 rounded mb-5" />

         {/* Name */}
         <div className="h-4 w-32 bg-gray-200 rounded mb-2.5" />
         {/* Address line */}
         <div className="h-4 w-64 bg-gray-200 rounded mb-2" />
         {/* Phone */}
         <div className="h-4 w-28 bg-gray-200 rounded mb-5" />

         {/* Divider */}
         <div className="w-full border-t border-[#D9D9D9] mb-5" />

         {/* Button placeholder */}
         <div className="h-10 w-full bg-gray-300 rounded" />
      </div>
   )
}
