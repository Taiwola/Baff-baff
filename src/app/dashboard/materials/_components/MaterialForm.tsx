import Image from 'next/image'
import { Plus } from 'lucide-react';
import React, { useRef, useState } from 'react'

import { Button, Input } from '@components/ui';

type InitialState = {
  name?: string
  stock?: number
  image?: File | string
}

interface Props {
  pending: boolean
  initialState: InitialState
  errors: Partial<Record<"name" | "stock" | "image", string | undefined>>
  action: (payload: FormData) => void
}

export default function MaterialForm({ errors, initialState, action, pending }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(
    typeof initialState?.image === "string" ? initialState?.image : null
  );


  function handleImageClick() {
    fileInputRef.current?.click()
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <form action={action} className="flex flex-col gap-6 w-full">
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-gray-400 h-[7.8125rem] w-[5.9375rem] rounded-[0.625rem] flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {preview ? (
          <Image
            width={95}
            height={125}
            src={preview}
            alt="preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <Plus className="w-[54px] h-[54px] text-gray-500" />
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Material Name */}
      <Input
        name="name"
        label="Material name"
        placeholder="Enter material name"
        value={initialState.name}
        error={errors.name}
      />

      <Input
        name="stock"
        type="number"
        label="Stock"
        placeholder="Enter stock quantity"
        endContent='YRD'
        value={initialState.stock}
        error={errors.stock}
      />

      {/* Divider */}
      <hr className="border-t border-gray-300 w-full" />

      {/* Buttons */}
      <div className="flex justify-between w-full gap-4">
        <Button type="button" variant="bordered" rounded="md" fullWidth>
          Cancel
        </Button>

        <Button type="submit" variant="filled" rounded="md" fullWidth disabled={pending}>
          {pending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
