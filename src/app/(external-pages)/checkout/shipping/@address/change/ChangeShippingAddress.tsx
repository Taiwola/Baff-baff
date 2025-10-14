'use client'

import { changeAddress } from '@actions/addresses.action'
import { AddressForm } from '@components/features/address'
import { useToast } from '@hooks/useToast'
import { CreateAddressFormState } from '@validations/address'
import React, { useActionState, useEffect } from 'react'

const initialState: CreateAddressFormState = {
   errors: {},
   error: '',
   values: {
      fullName: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
      address: '',
      altPhoneNumber: '',
      active: true
   }
}

export default function ChangeShippingAddress() {
   const toast = useToast()
   const [{ values, errors, error }, action, isPending] = useActionState(changeAddress, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error]);

   return (
      <AddressForm
         values={values}
         errors={errors}
         action={action}
         isPending={isPending}
      />
   )

}
