import { Button, Input } from '@components/ui'
import React from 'react'

type Props = {
   action: (formData: FormData) => Promise<void>
}

export default function AddressForm({ action }: Props) {
   return (
      <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Row 1 */}
         <Input label="Full Name" name="fullName" />
         <Input label="Email" name="email" />

         {/* Row 2 */}
         <Input label="Phone Number" name="phoneNumber" />
         <Input label="Phone Number (Optional)" name="altPhoneNumber" />

         {/* Row 3 */}
         <Input
            label="City"
            type="select"
            name="city"
            options={[
               { key: 'lagos', label: 'Lagos' },
               { key: 'abuja', label: 'Abuja' },
               { key: 'ibadan', label: 'Ibadan' },
            ]}
         />
         <Input
            label="State"
            type="select"
            name="state"
            options={[
               { key: 'lagos-state', label: 'Lagos State' },
               { key: 'fct', label: 'FCT' },
               { key: 'oyo', label: 'Oyo' },
            ]}
         />

         {/* Row 4 */}
         <div className="md:col-span-2">
            <Input label="Address" name="address" />
         </div>

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
