'use client'

import React, { useActionState, useEffect } from 'react'

import { useToast } from '@hooks/useToast'
import { createAddress } from '@actions/addresses.action'
import { AddressForm } from '@components/features/address'
import { CreateAddressFormState } from '@validations/address'

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

export default function AddAdress() {
   const toast = useToast()
   const [{ values, errors, error }, action, isPending] = useActionState(createAddress, initialState)

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
