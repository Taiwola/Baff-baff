"use client"

import React from "react"
import Lottie from "lottie-react"
import emptyBox from "@assets/animations/empty-state.json"

export function EmptyState() {
   return (
      <div className="flex flex-col items-center justify-center text-center py-12">
         <div className="w-48 h-48">
            <Lottie animationData={emptyBox} loop autoplay />
         </div>
         <h3 className="mt-4 text-lg font-semibold text-gray-800">
            No products found
         </h3>
         <p className="mt-1 text-gray-500">Start by adding a new product to your store.</p>
      </div>
   )
}
