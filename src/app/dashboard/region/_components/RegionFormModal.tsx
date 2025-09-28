'use client'

import React from 'react'
import { X } from 'lucide-react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { Button, Input } from '@components/ui';

interface Props {
   type?: 'edit' | 'create'
   isOpen: boolean;
   onClose: () => void
   onOpenChange: () => void
}

export default function RegionFormModal({ isOpen, onOpenChange, type = 'create' }: Props) {

   async function handleSubmit() { }
   return (
      <Modal
         placement="auto"
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
                     <h3 className="text-lg font-semibold">{type === 'create' ? 'Add New Region' : 'Edit Region'}</h3>

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

                        {/* Material Name */}
                        <Input
                           name="state"
                           label="State"
                           type='select'
                           options={[]}
                        />

                        <Input
                           name="city"
                           label="City"
                           type="select"
                           options={[]}
                        />

                        <Input
                           name="price"
                           label="Price"
                           type='number'
                           placeholder='NGN Enter'
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
