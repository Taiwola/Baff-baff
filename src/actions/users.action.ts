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
import { InviteAdminDto, InviteAdminFormErrors, InviteAdminFormState, InviteAdminFormValues, inviteAdminSchema } from '@validations/users'

export async function getUsers(options: UserFilter = {}): Promise<Pagination<User>> {
  const params = new URLSearchParams()

  if (options.page) params.set('page', options.page.toString())
  if (options.limit) params.set('limit', options.limit.toString())
  if (options.role) params.set('role', options.role.toString())

  const queryString = params.toString()
  const url = `/users${queryString ? `?${queryString}` : ''}`

  const response = await ServerApiClient.get<Pagination<User>>(url)

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
    firstName: String(formData.get('firstName')) || state.values.firstName,
    lastName: String(formData.get('lastName')) || state.values.lastName,
    phoneNumber: String(formData.get('phoneNumber')) ?? state.values.phoneNumber,
    gender: (String(formData.get('gender')) as Gender) || state.values.gender
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

export async function updateRole(user: User, role: UserRole): Promise<User> {
  const response = await ServerApiClient.patch<User>(`/users/${user.id}`, { role })

  if (response.code >= 400) {
    throw new Error(response.message)
  }

  return response.data
}

export async function inviteAdmin(state: InviteAdminFormState, formData: FormData): Promise<InviteAdminFormState> {
  const parsedValues: InviteAdminDto = {
    email: String(formData.get('email') || '')
  }

  const result = inviteAdminSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<InviteAdminFormErrors, InviteAdminFormValues>(result.error)
    return { ...state, errors, error: '', values: parsedValues }
  }
  
  const response = await ServerApiClient.post<void>('/users/admins/invite', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }
  
  redirect('/dashboard/settings/manage', RedirectType.replace)
}
