import React from 'react'

export default function CollaboratorsSkeleton() {
   const placeholders = Array.from({ length: 10 })

   return (
      <div
         className="
        bg-white rounded-[20px] py-7.5 px-14.5 w-full h-full 
        grid gap-7.5 mb-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
      >
         {placeholders.map((_, idx) => (
            <div key={idx} className="flex flex-col items-center text-center animate-pulse">
               {/* Circle image skeleton */}
               <div className="w-[174px] h-[174px] rounded-full bg-gray-200 mb-3.5" />

               {/* Name text skeleton */}
               <div className="h-5 w-24 bg-gray-200 rounded mb-1" />
            </div>
         ))}
      </div>
   )
}
