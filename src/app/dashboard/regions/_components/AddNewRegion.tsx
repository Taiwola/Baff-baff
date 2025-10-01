'use client'

import { useDisclosure } from '@heroui/react'
import React, { useActionState, useEffect } from 'react'

import RegionForm from './RegionForm'
import { Button } from '@components/ui'
import RegionFormModal from './RegionFormModal'

import { useToast } from '@hooks/useToast'
import { createRegion } from '@actions/regions.action'
import { CreateRegionFormState } from '@validations/region/create-region.validation'

const initialState: CreateRegionFormState = {
   errors: {},
   error: '',
   values: {
      state: '',
      region: '',
      price: 0
   }
}

export default function AddNewRegion() {
   const toast = useToast()
   const { isOpen, onOpenChange, onOpen } = useDisclosure()
   const [{ error, errors, values }, action, pending] = useActionState(createRegion, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error])

   return (
      <>
         <Button rounded='sm' onClick={onOpen}>
            Add New
         </Button>

         <RegionFormModal
            title='Add New Region'
            isOpen={isOpen}
            onOpenChange={onOpenChange}
         >
            <RegionForm
               errors={errors}
               initialState={values}
               pending={pending}
               action={action}
            />
         </RegionFormModal>
      </>
   )
}
