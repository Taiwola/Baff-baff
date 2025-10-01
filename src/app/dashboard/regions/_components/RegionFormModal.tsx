'use client'

import { X } from 'lucide-react';
import React, { ReactNode } from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { Button } from '@components/ui';

interface Props {
   title: string
   isOpen: boolean;
   children: ReactNode;
   onOpenChange: () => void
}

export default function RegionFormModal({ title, isOpen, children, onOpenChange }: Props) {
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
                     <h3 className="text-lg font-semibold">{title}</h3>

                     <Button
                        className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                        onClick={onClose}
                     >
                        <X className="icon-button bg-none" />
                     </Button>
                  </ModalHeader>

                  {/* Body (form content goes here) */}
                  <ModalBody className="p-4">
                     {children}
                  </ModalBody>
               </>
            )}
         </ModalContent>
      </Modal>
   );
}
