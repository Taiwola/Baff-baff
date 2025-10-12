"use client";

import useSWR from "swr";
import { useState } from "react";
import { Button, Input } from "@components/ui";

import { ApiClient } from "@utils/api";
import { CreateAddressFormValues, UpdateAddressFormValues } from "@validations/address";

type Props = {
   values: CreateAddressFormValues | UpdateAddressFormValues
   errors: Partial<Record<"fullName" | "email" | "phoneNumber" | "altPhoneNumber" | "city" | "state" | "address" | "active", string | undefined>>
   action: (payload: FormData) => void;
   isPending: boolean
};

const fetcher = (url: string) => ApiClient.get<SelectItem[]>(url).then(res => res.data);

export default function AddressForm({ values, errors, isPending, action }: Props) {
   const [selectedState, setSelectedState] = useState<string | undefined>(values.state);

   const { data: states = [] } = useSWR<SelectItem[]>('/regions/states', fetcher);
   const { data: cities = [] } = useSWR<SelectItem[]>(selectedState ? `/regions/cities/?state=${selectedState}` : null, fetcher);

   return (
      <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Row 1 */}
         <Input
            label="Full Name"
            name="fullName"
            value={values.fullName}
            error={errors.fullName}
         />

         <Input
            label="Email"
            name="email"
            value={values.email}
            error={errors.email}
         />

         {/* Row 2 */}
         <Input
            label="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            error={errors.phoneNumber}
         />

         <Input
            label="Phone Number (Optional)"
            name="altPhoneNumber"
            value={values.altPhoneNumber}
            error={errors.altPhoneNumber}
         />

         {/* Row 3 */}
         <Input
            label="State"
            type="select"
            name="state"
            value={selectedState}
            onChange={(val) => setSelectedState(val)}
            options={states || []}
            error={errors.state}
         />
         
         <Input
            label="City"
            type="select"
            name="city"
            options={cities || []}
            value={values.city}
            error={errors.city}
            disabled={!selectedState}
         />

         {/* Row 4 */}
         <div className="md:col-span-2">
            <Input
               label="Address"
               name="address"
               value={values.address}
               error={errors.address}
            />
         </div>

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
   );
}
