import React, { useActionState, useEffect, useMemo } from 'react'

import { useToast } from '@hooks/useToast'
import { updateRegion } from '@actions/regions.action'
import { UpdateRegionFormState } from '@validations/region/update-region.validation'

import RegionForm from './RegionForm'
import RegionFormModal from './RegionFormModal'

type Props = {
   region: Region
   isOpen: boolean
   onOpenChange: () => void
}

export default function EditRegion({ region, isOpen, onOpenChange }: Props) {
   const toast = useToast()
   const updateRegionWithId = updateRegion.bind(null, region.id)

   const initialState: UpdateRegionFormState = useMemo(() => ({
      errors: {},
      error: '',
      values: {
         state: region.state,
         region: region.region,
         price: region.price
      }
   }), [region])

   const [{ error, errors, values }, action, pending] = useActionState(updateRegionWithId, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error])


   return (
      <RegionFormModal
         title='Edit Region'
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
   )
}
