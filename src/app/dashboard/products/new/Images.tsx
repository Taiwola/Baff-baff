'use client'

import React, { useRef } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function Images() {
   const fileInputRef = useRef<HTMLInputElement>(null)

   function handleImageClick() {
      fileInputRef.current?.click()
   }
   return (
      <div className='flex justify-start items-center gap-5'>
         <div
            onClick={handleImageClick}
            className="border border-gray-400 h-[9.375rem] w-[9.375rem] rounded-[0.625rem] flex flex-col items-center justify-center cursor-pointer hover:bg-[#2D4596CC]/80 transition-colors"
         >
            <CloudArrowUpIcon className='w-6 h-6 text-black' />
            <small className='text-[10px] text-brand-dark'>Upload an image</small>
            <small className='text-[8px] font-medium text-black'>Choose file</small>
            <input
               type="file"
               name="image"
               accept="image/*"
               ref={fileInputRef}
               className="hidden"
            />
         </div>

         <>
            {[...Array(4).keys().map((idx) => (
               <div
                  key={idx}
                  onClick={handleImageClick}
                  className="border border-dashed border-gray-400 h-[9.375rem] w-[9.375rem] rounded-[0.625rem] flex flex-col items-center justify-center cursor-pointer hover:bg-[#2D4596CC]/80 transition-colors"
               >
                  <PlusIcon className="w-[3.375rem] h-[3.375rem] text-[#292D32]" />
                  <input
                     type="file"
                     name="image"
                     accept="image/*"
                     ref={fileInputRef}
                     className="hidden"
                  />
               </div>
            ))]}
         </>
      </div>
   )
}
