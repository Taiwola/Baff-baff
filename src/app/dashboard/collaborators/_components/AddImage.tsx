'use client'

import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import React, { useRef } from 'react'

export default function AddImage() {
   const fileInputRef = useRef<HTMLInputElement>(null)

   function handleImageClick() {
      fileInputRef.current?.click()
   }

   return (
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
   )
}
