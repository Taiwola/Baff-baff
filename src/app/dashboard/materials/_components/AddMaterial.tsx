'use client'

import React, { useActionState, useEffect } from 'react'

import FormModal from './FormModal';
import MaterialForm from './MaterialForm';
import { useToast } from '@hooks/useToast';
import { CreateMaterialFormState } from '@validations/material';

import { createMaterial } from '@actions/materials.action';

type Props = {
   isOpen: boolean
   onOpenChange: () => void
}

const initialState: CreateMaterialFormState = {
   errors: {},
   error: '',
   values: {
      name: '',
      stock: 0,
      image: undefined
   }
}

export default function AddMaterial({ isOpen, onOpenChange }: Props) {
   const toast = useToast()
   const [{ error, errors, values }, action, pending] = useActionState(createMaterial, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error])

   return (
      <FormModal title='New Material' isOpen={isOpen} onOpenChange={onOpenChange}>
         <MaterialForm
            initialState={values}
            errors={errors}
            pending={pending}
            action={action}
         />
      </FormModal>
   )
}
