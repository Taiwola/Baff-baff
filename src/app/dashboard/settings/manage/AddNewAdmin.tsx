'use client'

import React from 'react'
import { X } from 'lucide-react';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';

import { Button, Input } from '@components/ui';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function AddNewAdmin() {
   const { isOpen, onOpenChange, onOpen } = useDisclosure()

   async function handleSubmit() { }

   return (
      <>
         <Button
            variant='text'
            rounded='none'
            onClick={onOpen}
            className='text-[#008080] p-0'
         >
            Add New Admin
         </Button>


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
                        <h3 className="text-lg font-semibold">New Admin</h3>

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

                           <Input
                              name="email"
                              label="Email Address"
                              type='email'
                              placeholder='Enter'
                           />

                           {/* Buttons */}
                           <div className="flex justify-between w-full gap-4">
                              <Button type="button" variant="bordered" rounded="md" fullWidth>
                                 Cancel
                              </Button>

                              <Button type="submit" variant="filled" rounded="md" fullWidth className='gap-2'>
                                 <EnvelopeIcon className='w-5 h-5 text-white' />
                                 <span>Send Invite</span>
                              </Button>
                           </div>
                        </form>
                     </ModalBody>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   )
}
