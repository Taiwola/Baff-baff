import React from 'react'

import { Button, Input } from '@components/ui'
import { UpdateMeasurementFormValues } from '@validations/measurement'

type Props = {
   values: UpdateMeasurementFormValues
   errors: Partial<Record<"chest" | "arm" | "sleeve" | "shoulder" | "length" | "neck", string | undefined>>
   isPending: boolean
   action: (formData: FormData) => void
}

export default function ShirtForm({ values, errors, isPending, action }: Props) {
   return (
      <form action={action} className="flex flex-col gap-5 w-full">
         <Input
            label="Chest"
            name="chest"
            type='number'
            endContent='in'
            value={values.chest}
            error={errors.chest}
         />

         <Input
            label="Arm"
            name="arm"
            type='number'
            endContent='in'
            value={values.arm}
            error={errors.arm}
         />

         <Input
            label="Sleeve"
            name="sleeve"
            type='number'
            endContent='in'
            value={values.sleeve}
            error={errors.sleeve}
         />

         <Input
            label="Shoulder"
            name="shoulder"
            type='number'
            endContent='in'
            value={values.shoulder}
            error={errors.shoulder}
         />

         <Input
            label="Length"
            name="length"
            type='number'
            endContent='in'
            value={values.length}
            error={errors.length}
         />

         <Input
            label="Neck"
            name="neck"
            type='number'
            endContent='in'
            value={values.neck}
            error={errors.neck}
         />

         {/* Submit */}
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
