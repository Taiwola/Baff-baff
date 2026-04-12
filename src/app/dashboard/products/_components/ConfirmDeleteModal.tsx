import React from 'react'
import { X } from 'lucide-react'
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from '@heroui/react'

import { Button } from '@components/ui'

interface Props {
   isOpen: boolean
   onOpenChange: () => void
   onConfirm: () => void | Promise<void>
   isLoading?: boolean
   title?: string
   message?: string
}

export default function ConfirmDeleteModal({
   isOpen,
   onOpenChange,
   onConfirm,
   isLoading = false,
   title = 'Delete Product',
   message = 'Are you sure you want to delete this product? This action cannot be undone.'
}: Props) {
   return (
      <Modal
         placement="center"
         hideCloseButton
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         size="md"
         classNames={{
            base: 'w-full max-w-md rounded-xl shadow-lg bg-white',
         }}
      >
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className="flex justify-between items-center px-6 py-4">
                     <h3 className="text-lg font-semibold">{title}</h3>
                     <Button
                        className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                        onClick={onClose}
                        disabled={isLoading}
                     >
                        <X className="icon-button bg-none" size={20} />
                     </Button>
                  </ModalHeader>

                  <ModalBody className="px-6 py-4">
                     <p className="text-sm text-gray-700">{message}</p>
                  </ModalBody>

                  <ModalFooter className="border-t border-gray-200 flex justify-end items-center gap-3 px-6 py-4">
                     <Button
                        onClick={onClose}
                        rounded="sm"
                        variant="bordered"
                        disabled={isLoading}
                        className="px-6 py-2"
                     >
                        Cancel
                     </Button>
                     <Button
                        onClick={onConfirm}
                        rounded="sm"
                        variant="danger"
                        disabled={isLoading}
                        className="px-6 py-2"
                     >
                        {isLoading ? 'Deleting...' : 'Delete'}
                     </Button>
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   )
}
