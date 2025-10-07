'use server'

import { redirect, RedirectType } from 'next/navigation'

import { emptyMetaData } from '@utils/pagination'
import { ServerApiClient } from '@utils/api-server'
import {
  UpdateUserDto,
  UpdateUserFormErrors,
  UpdateUserFormState,
  UpdateUserFormValues,
  updateUserSchema
} from '@validations/users/update-user.validation'
import { formatError } from '@utils/formatting'

export async function getUsers(options: PaginationParams = {}): Promise<Pagination<User>> {
  const response = await ServerApiClient.get<Pagination<User>>(`/users?page=${options.page ?? 1}&limit=${10}`)

  if (response.code >= 400) {
    console.log('users error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getUser(id: string): Promise<User | null> {
  const response = await ServerApiClient.get<User>(`/users/${id}`)

  if (response.code >= 400) {
    console.log('user error: ', response)
    return null
  }

  return response.data
}

export async function updateUser(id: string, state: UpdateUserFormState, formData: FormData) {
  const parsedValues: UpdateUserDto = {
    firstName: String(formData.get('firstName')) || '',
    lastName: String(formData.get('lastName')) || '',
    phoneNumber: String(formData.get('phoneNumber')) ?? '',
    gender: String(formData.get('gender')) as Gender
  }

  const result = updateUserSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateUserFormErrors, UpdateUserFormValues>(result.error)
    return { error: '', errors, values: parsedValues }
  }

  const response = await ServerApiClient.patch<User>(`/users/${id}`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  if (response.data.role === 'admin') {
    redirect('/dashboard/settings/profile', RedirectType.replace)
  } else redirect('/profile', RedirectType.replace)
}
