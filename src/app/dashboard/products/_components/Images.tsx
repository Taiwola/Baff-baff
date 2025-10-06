'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/solid'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

type Props = {
   images?: (File | string)[]
   onChange?: (files: File[]) => void
}

export default function Images({ images = [], onChange }: Props) {
   const [files, setFiles] = useState<(File | string)[]>(images)
   const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

   const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) return
      const file = event.target.files[0]
      setFiles(prev => {
         const updated = [...prev]
         updated[index] = file
         return updated
      })

      if (onChange) onChange(files.filter(f => f instanceof File) as File[])
   }

   const handleImageClick = (index: number) => {
      fileInputRefs.current[index]?.click()
   }

   const totalSlots = Math.max(5, files.length)

   useEffect(() => {
      if (images) {
         setFiles(images)
      }
   }, [images]);

   return (
      <div className='flex flex-wrap gap-5'>
         {[...Array(totalSlots)].map((_, idx) => (
            <div
               key={idx}
               onClick={() => handleImageClick(idx)}
               className="border border-gray-400 h-[9.375rem] w-[9.375rem] rounded-[0.625rem] flex items-center justify-center cursor-pointer hover:bg-[#2D4596CC]/80 transition-colors relative overflow-hidden"
            >
               {files[idx] ? (
                  <Image
                     src={files[idx] instanceof File ? URL.createObjectURL(files[idx]) : files[idx]}
                     alt={`preview-${idx}`}
                     fill
                     className="object-cover rounded-[0.625rem]"
                     sizes="150px"
                  />
               ) : idx === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                     <CloudArrowUpIcon className='w-6 h-6 text-black' />
                     <small className='text-[10px] text-brand-dark'>Upload an image</small>
                     <small className='text-[8px] font-medium text-black'>Choose file</small>
                  </div>
               ) : (
                  <PlusIcon className="w-[3.375rem] h-[3.375rem] text-[#292D32]" />
               )}

               <input
                  name={`images`}
                  type="file"
                  accept="image/*"
                  ref={el => {
                     if (el) {
                        fileInputRefs.current[idx] = el
                     }
                  }}
                  className="hidden"
                  onChange={e => handleFileChange(idx, e)}
               />
            </div>
         ))}
      </div>
   )
}
