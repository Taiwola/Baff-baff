import React from 'react'

import { Button, Input } from '@components/ui'
import { UpdateMeasurementFormValues } from '@validations/measurement'

type Props = {
   values: UpdateMeasurementFormValues
   errors: Partial<Record<"waist" | "lap" | "trouserLength" | "knee", string | undefined>>
   isPending: boolean
   action: (formData: FormData) => void
}

export default function TrouserForm({ values, errors, isPending, action }: Props) {
   return (
      <form action={action} className="flex flex-col gap-5 w-full">
         <Input
            label="Waist"
            name="waist"
            type='number'
            endContent='in'
            value={values.waist}
            error={errors.waist}
         />

         <Input
            label="Lap"
            name="lap"
            type='number'
            endContent='in'
            value={values.lap}
            error={errors.lap}
         />

         <Input
            label="Trouser Length"
            name="trouserLength"
            type='number'
            endContent='in'
            value={values.trouserLength}
            error={errors.trouserLength}
         />

         <Input
            label="Knee"
            name="knee"
            type='number'
            endContent='in'
            value={values.knee}
            error={errors.knee}
         />
         
         <div className="md:col-span-2">
            <Button
               type="submit"
               fullWidth
               className="bg-black text-white py-3 px-6 w-full rounded-4xl"
            >
               {isPending ? 'Saving...' : 'Save'}
            </Button>
         </div>
      </form>
   )
}
