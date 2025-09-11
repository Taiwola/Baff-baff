'use client'

import React from 'react'
import { useDisclosure } from '@heroui/react'
import AddressFormModal from './AddressModal'
import { EmptyState } from '@components/layouts'

export default function EmptyAddress() {
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

   return (
      <>
         <EmptyState
            title='You currently have no addresses saved'
            description='Add address for a quicker checkout experience'
            btnText='Add Address'
            onAdd={onOpen}
         />

         <AddressFormModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
      </>
   )
}
