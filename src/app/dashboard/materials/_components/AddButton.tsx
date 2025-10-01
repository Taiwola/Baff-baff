'use client'

import React, { useActionState, useEffect } from 'react'
import { useDisclosure } from '@heroui/react'

import { Button } from '@components/ui'
import MaterialFormModal from './MaterialFormModal'
import { CreateMaterialFormState } from '@validations/material'
import { createMaterial } from '@actions/materials.action'
import { useToast } from '@hooks/useToast'

const initialState: CreateMaterialFormState = {
   errors: {},
   error: '',
   values: {
      name: '',
      stock: 0,
      image: undefined
   }
}

export default function AddButton() {
   const toast = useToast()
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()
   const [{ error, errors, values }, action, pending] = useActionState(createMaterial, initialState)

   useEffect(() => {
      if (error) {
         toast.error({  description: error })
      }
   }, [toast, error])

   return (
      <>
         <Button rounded='sm' onClick={onOpen}>
            New Material
         </Button>

         <MaterialFormModal
            initialState={values}
            errors={errors}
            pending={pending}
            isOpen={isOpen}
            action={action}
            onClose={onClose}
            onOpenChange={onOpenChange}
         />
      </>
   )
}
