'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

type Props = {
   images: (File | string)[]
   onChange: (files: (File | string)[]) => void
}

export default function Images({ images, onChange }: Props) {
   const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

   const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.length) return
      const file = event.target.files[0]
      const updated = [...images]
      updated[index] = file
      onChange(updated)
   }

   const handleDelete = (index: number) => {
      const updated = [...images]
      updated.splice(index, 1)
      onChange(updated)
   }

   const handleImageClick = (index: number) => {
      fileInputRefs.current[index]?.click()
   }

   const totalSlots = Math.max(5, images.length + 1)

   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
         {[...Array(totalSlots)].map((_, idx) => {
            const hasImage = !!images[idx]
            return (
               <div
                  key={idx}
                  className="group relative aspect-square border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2D4596CC]/80 transition-colors overflow-hidden"
                  onClick={() => handleImageClick(idx)}
               >
                  {/* Image Preview */}
                  {hasImage ? (
                     <>
                        <Image
                           src={images[idx] instanceof File ? URL.createObjectURL(images[idx]) : (images[idx] as string)}
                           alt={`preview-${idx}`}
                           fill
                           className="object-cover rounded-lg"
                           sizes="150px"
                        />

                        {/* Delete Button (shows on hover) */}
                        <button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(idx)
                           }}
                           className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                           <TrashIcon className="w-4 h-4" />
                        </button>
                     </>
                  ) : idx === 0 ? (
                     <div className="flex flex-col items-center justify-center text-center">
                        <CloudArrowUpIcon className="w-6 h-6 text-black" />
                        <small className="text-[10px] text-brand-dark">Upload an image</small>
                        <small className="text-[8px] font-medium text-black">Choose file</small>
                     </div>
                  ) : (
                     <PlusIcon className="w-12 h-12 text-[#292D32]" />
                  )}

                  {/* Hidden file input */}
                  <input
                     name="images"
                     type="file"
                     accept="image/*"
                     ref={(el) => { fileInputRefs.current[idx] = el }}
                     className="hidden"
                     onChange={(e) => handleFileChange(idx, e)}
                  />
               </div>
            )
         })}
      </div>
   )
}
