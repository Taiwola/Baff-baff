import React from 'react'

import { Button, Input } from '@components/ui';

type InitialState = Pick<Region, 'state' | 'city' | 'price'>

type Props = {
   pending: boolean
   initialState: InitialState
   errors: Partial<Record<'state' | 'city' | 'price', string | undefined>>
   action: (payload: FormData) => void
}


export default function RegionForm({ errors, initialState, action, pending }: Props) {
   return (
      <form action={action} className="flex flex-col gap-6 w-full">
         <Input
            name="state"
            label="State"
            type='select'
            options={[{ label: 'Lagos', key: 'Lagos' }]}
            error={errors.state}
            value={initialState.state}
         />

         <Input
            name="city"
            label="City"
            type="select"
            options={[{ label: 'Ikeja', key: 'Ikeja' }, { key: 'Oshodi', label: 'Oshodi' }]}
            error={errors.city}
            value={initialState.city}
         />

         <Input
            name="price"
            label="Price"
            type='number'
            placeholder='NGN Enter'
            error={errors.price}
            value={initialState.price}
         />

         {/* Divider */}
         <hr className="border-t border-gray-300 w-full" />

         {/* Buttons */}
         <div className="flex justify-between w-full gap-4">
            <Button type="button" variant="bordered" rounded="md" fullWidth>
               Cancel
            </Button>

            <Button
               type="submit"
               variant="filled"
               rounded="md"
               fullWidth
               disabled={pending}
            >
               {pending ? 'Saving...' : 'Save'}
            </Button>
         </div>
      </form>
   )
}
