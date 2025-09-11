import React from 'react'
import { Button, Input } from '@components/ui'

type Props = {
   action: (formData: FormData) => Promise<void>
}

export default function MeasurementForm({ action }: Props) {
   return (
      <form action={action} className="flex flex-col gap-5 w-full">
         <Input label="Chest" name="chest" type='number' endContent='in' />
         <Input label="Arm" name="arm" type='number' endContent='in' />
         <Input label="Sleeve" name="sleeve" type='number' endContent='in' />
         <Input label="Shoulder" name="shoulder" type='number' endContent='in' />
         <Input label="Length" name="length" type='number' endContent='in' />
         <Input label="Neck" name="neck" type='number' endContent='in' />

         {/* Submit */}
         <div className="md:col-span-2">
            <Button
               type="submit"
               fullWidth
               className="bg-black text-white py-3 px-6 w-full rounded-4xl"
            >
               Save
            </Button>
         </div>
      </form>
   )
}
