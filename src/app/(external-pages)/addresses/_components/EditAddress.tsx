import React, { useActionState, useEffect } from 'react'

import { useToast } from '@hooks/useToast'
import { updateAddress } from '@actions/addresses.action'
import { AddressForm } from '@components/features/address'
import { UpdateAddressFormState } from '@validations/address'

type Props = {
  address: Address
}

export default function EditAddress({ address }: Props) {
  const toast = useToast()
  const updateWithId = updateAddress.bind(null, address.id)

  const initialState: UpdateAddressFormState = {
    errors: {},
    error: '',
    values: {
      fullName: address.fullName,
      email: address.email,
      phoneNumber: address.phoneNumber,
      city: address.city,
      state: address.state,
      address: address.address,
      altPhoneNumber: address.altPhoneNumber,
    }
  }

  const [{ values, errors, error }, action, isPending] = useActionState(updateWithId, initialState)

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
