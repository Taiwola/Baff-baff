'use client'

import Image from 'next/image'
import React, { forwardRef, ReactNode } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

type Props = {
  name: string
  image?: string | File
  emptyContent?: ReactNode
  accept?: string
  onClick: () => void
  onDelete: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ name, image, emptyContent, accept, onClick, onDelete, onChange }, ref) => {
    const hasImage = !!image

    return (
      <div
        className="group relative border border-gray-400 h-[9.375rem] w-[9.375rem] rounded-[0.625rem] flex items-center justify-center cursor-pointer hover:bg-[#2D4596CC]/80 transition-colors overflow-hidden"
        onClick={onClick}
      >
        {hasImage ? (
          <>
            <Image
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`preview-${name}`}
              fill
              className="object-cover rounded-[0.625rem]"
              sizes="150px"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          emptyContent || (
            <div className="flex flex-col items-center justify-center text-center">
              <CloudArrowUpIcon className="w-6 h-6 text-black" />
              <small className="text-[10px] text-brand-dark">Upload an image</small>
              <small className="text-[8px] font-medium text-black">Choose file</small>
            </div>
          )
        )}

        <input
          name={name}
          type="file"
          accept={accept}
          ref={ref} 
          className="hidden"
          onChange={onChange}
        />
      </div>
    )
  }
)

ImageInput.displayName = 'ImageInput'

export default ImageInput
