import React from 'react'
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

import { Button } from '@components/ui'

export default function Catalog() {
   return (
      <section className="relative w-full h-96 md:h-[56.25rem] md:py-12">
         <Image
            src="/images/catalog.jpg"
            alt="Shop catalog background"
            fill
            className="object-cover"
         />

         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-2.5 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
               <div>
                  <div className="flex flex-row justify-center items-center w-[138px] h-[29px] md:w-[539px] md:h-[115px] bg-[#202020]">
                     <span className="font-montserrat font-black text-[24px] leading-[29px] md:text-[94px] md:leading-[115px] text-white">
                        SHOP OUR
                     </span>
                  </div>
                  <div className="flex flex-row justify-center items-center w-32 h-[29px] md:w-[485px] md:h-[115px] bg-[#202020]">
                     <span className="font-montserrat font-black text-2xl leading-[29px] md:text-8xl md:leading-[115px] text-white">
                        CATALOG
                     </span>
                  </div>
               </div>
               <p className="w-full text-white font-montserrat font-bold text-xs md:w-[536px] md:h-[22px] md:text-[18px] md:leading-[22px]">
                  Experience freedom to look good at the click of a button
               </p>
            </div>

            <Button className="p-3 md:p-5 gap-2.5 bg-[#121212]" size='lg'>
               <span className="font-montserrat font-bold text-sm leading-3.5 md:text-2xl text-white">
                  SHOP NOW
               </span>
               <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6 text-white font-extrabold" />
            </Button>
         </div>
      </section>
   )
}
