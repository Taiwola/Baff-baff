'use client'

import React from 'react'
import { useDisclosure } from '@heroui/react'

import { Button } from '@components/ui'
import RegionFormModal from './RegionFormModal'

export default function AddNewRegion() {
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

   return (
      <>
         <Button rounded='sm' onClick={onOpen}>
            Add New
         </Button>

         <RegionFormModal
            type='create'
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
         />
      </>
   )
}
