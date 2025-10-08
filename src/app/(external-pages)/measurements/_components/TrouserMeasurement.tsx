import { useDisclosure } from '@heroui/react'
import React, { useActionState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'

import TrouserForm from './TrouserForm'
import MeasurementFormModal from './MeasurementModal'

import { useToast } from '@hooks/useToast'
import { UpdateMeasurementFormState } from '@validations/measurement'
import { updateUserMeasurement } from '@actions/measurements.action'

type Props = {
   measurement: Measurement
}

export default function TrouserMeasurement({ measurement }: Props) {
   const toast = useToast()
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

   const initialState: UpdateMeasurementFormState = {
      errors: {},
      error: '',
      values: {
         chest: measurement.shirt.chest,
         arm: measurement.shirt.arm,
         sleeve: measurement.shirt.sleeve,
         shoulder: measurement.shirt.shoulder,
         length: measurement.shirt.length,
         neck: measurement.shirt.neck,
         waist: measurement.trouser.waist,
         lap: measurement.trouser.lap,
         trouserLength: measurement.trouser.length,
         knee: measurement.trouser.knee,
      }
   }

   const [{ values, errors, error }, action, isPending] = useActionState(updateUserMeasurement, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error]);

   return (
      <>
         <div className="w-full h-[11.3125rem] py-7.5 px-5 rounded-[1.25rem] border border-foreground">
            {/* Header */}
            <div className="flex justify-between items-start mb-3.5">
               <p className="text-sm text-brand-dark opacity-60 capitalize">
                  Trouser Measurement
               </p>

               <PencilIcon onClick={onOpen} className="icon-button w-6 h-6" />
            </div>

            <div className="grid grid-cols-1 gap-y-2 gap-x-6 text-sm text-black">
               <div className="flex gap-2">
                  <span className="capitalize">Waist:</span>
                  <span className="font-medium">{measurement.trouser.waist}</span>
               </div>

               <div className="flex gap-2">
                  <span className="capitalize">Lap:</span>
                  <span className="font-medium">{measurement.trouser.lap}</span>
               </div>

               <div className="flex gap-2">
                  <span className="capitalize">Length:</span>
                  <span className="font-medium">{measurement.trouser.length}</span>
               </div>

               <div className="flex gap-2">
                  <span className="capitalize">Knee:</span>
                  <span className="font-medium">{measurement.trouser.knee}</span>
               </div>
            </div>
         </div>

         <MeasurementFormModal
            title='Trouser Measurement'
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
         >
            <TrouserForm
               values={values}
               errors={errors}
               action={action}
               isPending={isPending}
            />
         </MeasurementFormModal>
      </>
   )
}