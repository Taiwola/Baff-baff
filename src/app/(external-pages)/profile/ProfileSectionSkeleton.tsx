'use client'

import React from 'react'

export default function ProfileSectionSkeleton() {
   return (
      <section className="mx-auto w-full md:max-w-[85%] flex flex-col gap-8 justify-center items-start font-montserrat border border-foreground rounded-xl p-6 relative animate-pulse">
         {/* Edit button placeholder */}
         <div className="absolute top-4 right-4 h-10 w-28 bg-gray-200 rounded-[48px]" />

         {/* Skeleton rows */}
         <div className="w-full flex flex-col gap-4">
            {[...Array(5)].map((_, idx) => (
               <div key={idx} className="grid grid-cols-2 w-full items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-48 bg-gray-300 rounded" />
               </div>
            ))}
         </div>
      </section>
   )
}
