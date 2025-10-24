'use client'

import React from 'react'
import { useDisclosure } from '@heroui/react'

import { Button } from '@components/ui'
import AddMaterial from './AddMaterial'



export default function AddButton() {
   const { isOpen, onOpenChange, onOpen } = useDisclosure()

   return (
      <>
         <Button rounded='sm' onClick={onOpen}>
            New Material
         </Button>

         <AddMaterial
            isOpen={isOpen}
            onOpenChange={onOpenChange}
         />
      </>
   )
}
