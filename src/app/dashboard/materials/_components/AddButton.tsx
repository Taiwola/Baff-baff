'use client'

import React from 'react'
import { useDisclosure } from '@heroui/react'

import { Button } from '@components/ui'
import MaterialFormModal from './MaterialFormModal'

export default function AddButton() {
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

   return (
      <>
         <Button rounded='sm' onClick={onOpen}>
            New Material
         </Button>

         <MaterialFormModal
            type='create'
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
         />
      </>
   )
}
