'use client'

import React, { useRef } from 'react'
import { Plus, X } from 'lucide-react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { Button, Input } from '@components/ui';

interface Props {
   type?: 'edit' | 'create'
   isOpen: boolean;
   onClose: () => void
   onOpenChange: () => void
}

export default function MaterialFormModal({ isOpen, onOpenChange, type = 'create' }: Props) {
   const fileInputRef = useRef<HTMLInputElement>(null)

   async function handleSubmit() { }

   function handleImageClick() {
      fileInputRef.current?.click()
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
                     <h3 className="text-lg font-semibold">{type === 'create' ? 'New Material' : 'Edit Material'}</h3>

                     <Button
                        className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                        onClick={onClose}
                     >
                        <X className="icon-button bg-none" />
                     </Button>
                  </ModalHeader>

                  {/* Body (form content goes here) */}
                  <ModalBody className="p-4">
                     <form action={handleSubmit} className="flex flex-col gap-6 w-full">
                        {/* Image Picker */}
                        <div
                           onClick={handleImageClick}
                           className="border-2 border-dashed border-gray-400 h-[125px] w-[95px] rounded-[10px] flex items-center justify-center cursor-pointer"
                        >
                           <Plus className="w-[54px] h-[54px] text-gray-500" />
                           <input
                              type="file"
                              name="image"
                              accept="image/*"
                              ref={fileInputRef}
                              className="hidden"
                           />
                        </div>

                        {/* Material Name */}
                        <Input
                           name="name"
                           label="Material name"
                           placeholder="Enter material name"
                        />

                        {/* Add Stock */}
                        {type === 'edit' ? (
                           <Input
                              name="stock"
                              type="number"
                              label="Current Stock"
                              placeholder="Enter stock quantity"
                              value={60}
                              endContent='YRD'
                              disabled
                           />
                        ) : null}

                        <Input
                           name="stock"
                           type="number"
                           label="Add stock"
                           placeholder="Enter stock quantity"
                           endContent='YRD'
                        />

                        {/* Divider */}
                        <hr className="border-t border-gray-300 w-full" />

                        {/* Buttons */}
                        <div className="flex justify-between w-full gap-4">
                           <Button type="button" variant="bordered" rounded="md" fullWidth>
                              Cancel
                           </Button>

                           <Button type="submit" variant="filled" rounded="md" fullWidth>
                              Save
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
