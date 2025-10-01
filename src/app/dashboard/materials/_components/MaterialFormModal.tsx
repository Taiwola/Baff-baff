'use client'

import React, { useRef, useState } from 'react'
import { Plus, X } from 'lucide-react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { Button, Input } from '@components/ui';
import Image from 'next/image';

type InitialState = Pick<Material, 'name' | 'stock'> & {
   image?: File | string
}

interface Props {
   id?: string
   initialState: InitialState
   errors: Partial<Record<"name" | "stock" | "image", string | undefined>>
   isOpen: boolean;
   pending: boolean;
   action: (payload: FormData) => void
   onClose: () => void
   onOpenChange: () => void
}

export default function MaterialFormModal({ isOpen, errors, pending, id, initialState, action, onOpenChange }: Props) {
   const fileInputRef = useRef<HTMLInputElement>(null)
   const [preview, setPreview] = useState<string | null>(
      typeof initialState?.image === "string" ? initialState?.image : null
   );

   console.log("preview >>", preview);
   

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
      <Modal
         placement="top"
         hideCloseButton
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         size="full"
         classNames={{
            base: "w-[45%] h-auto rounded-xl shadow-lg bg-white my-5",
         }}
      >
         <ModalContent>
            {(onClose) => (
               <>
                  {/* Header */}
                  <ModalHeader className="flex justify-between items-center px-4 py-3">
                     <h3 className="text-lg font-semibold">{!id ? 'New Material' : 'Edit Material'}</h3>

                     <Button
                        className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                        onClick={onClose}
                     >
                        <X className="icon-button bg-none" />
                     </Button>
                  </ModalHeader>

                  {/* Body (form content goes here) */}
                  <ModalBody className="p-4">
                     <form action={action} className="flex flex-col gap-6 w-full">
                        {/* Image Picker */}
                        {/* <div
                           onClick={handleImageClick}
                           className="border-2 border-dashed border-gray-400 h-[7.8125rem] w-[5.9375rem] rounded-[0.625rem] flex items-center justify-center cursor-pointer"
                        >
                           <Plus className="w-[54px] h-[54px] text-gray-500" />
                           <input
                              type="file"
                              name="image"
                              accept="image/*"
                              ref={fileInputRef}
                              className="hidden"
                           />
                        </div> */}

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
                  </ModalBody>
               </>
            )}
         </ModalContent>
      </Modal>
   );
}
