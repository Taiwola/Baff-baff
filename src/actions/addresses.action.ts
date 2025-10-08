'use server'

import { redirect, RedirectType } from 'next/navigation'

import { formatError } from '@utils/formatting'
import { emptyMetaData } from '@utils/pagination'
import { ServerApiClient } from '@utils/api-server'
import {
  CreateAddressDto,
  CreateAddressFormErrors,
  CreateAddressFormState,
  CreateAddressFormValues,
  createAddressSchema,
  UpdateAddressDto,
  UpdateAddressFormErrors,
  UpdateAddressFormState,
  UpdateAddressFormValues,
  updateAddressSchema
} from '@validations/address'

export async function createAddress(state: CreateAddressFormState, formData: FormData): Promise<CreateAddressFormState> {
  const parsedValues: CreateAddressDto = {
    state: String(formData.get('state')),
    city: String(formData.get('city')),
    fullName: String(formData.get('fullName')),
    email: String(formData.get('email')),
    phoneNumber: String(formData.get('phoneNumber')),
    address: String(formData.get('address')),
    altPhoneNumber: String(formData.get('altPhoneNumber')),
    active: state.values.active
  }

  const result = createAddressSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateAddressFormErrors, CreateAddressFormValues>(result.error)
    return { ...state, errors, error: '', values: parsedValues }
  }

  const response = await ServerApiClient.post<Address>(`/addresses`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/addresses', RedirectType.replace)
}

export async function getAddresses(): Promise<Pagination<Address>> {
  const response = await ServerApiClient.get<Pagination<Address>>(`/addresses`)

  if (response.code >= 400) {
    console.log('addresses error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getAddress(id: string) {
  const response = await ServerApiClient.get<Address>(`/addresses/${id}`)

  if (response.code >= 400) {
    console.log('address error: ', response)
    return null
  }

  return response.data
}

export async function updateAddress(id: string, state: UpdateAddressFormState, formData: FormData) {
  const parsedValues: UpdateAddressDto = {
    state: String(formData.get('state')),
    city: String(formData.get('city')),
    fullName: String(formData.get('fullName')),
    email: String(formData.get('email')),
    phoneNumber: String(formData.get('phoneNumber')),
    address: String(formData.get('address')),
    altPhoneNumber: String(formData.get('altPhoneNumber')),
    active: Boolean(formData.get('active'))
  }

  const result = updateAddressSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateAddressFormErrors, UpdateAddressFormValues>(result.error)
    return { ...state, errors, error: '', values: parsedValues }
  }

  const response = await ServerApiClient.patch<Address>(`/addresses/${id}`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/addresses', RedirectType.replace)
}

export async function deleteAddress(id: string) {
  console.log('i got here');
  
  const response = await ServerApiClient.delete<void>(`/addresses/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  redirect('/addresses', RedirectType.replace)
}
