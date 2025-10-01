import React, { useActionState, useEffect, useMemo } from 'react'

import FormModal from './FormModal'
import MaterialForm from './MaterialForm'
import { useToast } from '@hooks/useToast'
import { updateMaterial } from '@actions/materials.action'
import { UpdateMaterialFormState } from '@validations/material'

type Props = {
   material: Material
   isOpen: boolean
   onOpenChange: () => void
}

export default function EditMaterial({ material, isOpen, onOpenChange }: Props) {
   const toast = useToast()
   const updateMaterialWithId = updateMaterial.bind(null, material.id)

   const initialState: UpdateMaterialFormState = useMemo(() => ({
      errors: {},
      error: '',
      values: {
         name: material.name,
         stock: material.stock,
         image: material.image
      }
   }), [material])


   const [{ error, errors, values }, action, pending] = useActionState(updateMaterialWithId, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error])


   return (
      <FormModal title='Edit Material' isOpen={isOpen} onOpenChange={onOpenChange}>
         <MaterialForm
            initialState={values}
            errors={errors}
            pending={pending}
            action={action}
         />
      </FormModal>
   )
}
