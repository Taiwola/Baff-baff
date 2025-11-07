'use client'

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
   length?: number
}

export default function MarketplaceProductsSkeleton({ length = 4 }: Props) {
   return (
      <section className={`w-full grid gap-5 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'`}>
         {Array.from({ length }).map((_, i) => (
            <ProductSkeleton key={i} />
         ))}
      </section>
   )
}


function ProductSkeleton() {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3, ease: 'easeOut' }}
         className="w-full flex flex-col gap-3 animate-pulse"
      >
         {/* Image placeholder */}
         <div className="relative w-full h-52 md:h-80 bg-gray-400 rounded-lg overflow-hidden" />

         {/* Text placeholders */}
         <div className="space-y-2 pt-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
         </div>
      </motion.div>
   )
}
