import React from "react";

export default function AddressesSkeleton({ count = 3 }: { count?: number }) {
   return (
      <section className="mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start font-montserrat">
         {Array.from({ length: count }).map((_, idx) => (
            <div
               key={idx}
               className="w-full h-[11.3125rem] py-7.5 px-5 rounded-[1.25rem] border border-foreground bg-gray-100 animate-pulse"
            >
               <div className="flex justify-between items-start mb-3.5">
                  <div className="h-4 w-40 bg-gray-300 rounded-md" />
                  <div className="flex gap-2">
                     <div className="w-6 h-6 bg-gray-300 rounded-full" />
                     <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  </div>
               </div>

               <div className="space-y-2.5">
                  <div className="h-5 w-1/3 bg-gray-300 rounded-md" />
                  <div className="h-5 w-2/3 bg-gray-300 rounded-md" />
                  <div className="h-5 w-1/2 bg-gray-300 rounded-md" />
               </div>
            </div>
         ))}

         <div className="w-full flex justify-center">
            <div className="h-12 w-48 bg-gray-300 rounded-[3rem] animate-pulse" />
         </div>
      </section>
   );
}
