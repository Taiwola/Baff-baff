import useSWR from 'swr';
import React, { useState } from 'react'

import { Button, Input } from '@components/ui';
import { getLocalGovts, getStates } from '@actions/nga.action';

type InitialState = Pick<Region, 'state' | 'city' | 'price'>

type Props = {
   pending: boolean
   initialState: InitialState
   errors: Partial<Record<'state' | 'city' | 'price', string | undefined>>
   action: (payload: FormData) => void
}

export default function RegionForm({ errors, initialState, action, pending }: Props) {
   const [selectedState, setSelectedState] = useState<string | undefined>(initialState.state);

   const { data: states = [] } = useSWR<NGA[]>(`/nga/states`, getStates);
   const { data: cities = [] } = useSWR<NGA[]>(selectedState ?? null, getLocalGovts);

   return (
      <form action={action} className="flex flex-col gap-6 w-full">
         <Input
            name="state"
            label="State"
            type='select'
            options={states}
            error={errors.state}
            value={initialState.state}
            onChange={(val) => setSelectedState(val)}
         />

         <Input
            name="city"
            label="City"
            type="select"
            options={cities}
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
