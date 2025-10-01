'use server'

import { ServerApiClient } from '@utils/api-server'
import { formatError } from '@utils/formatting'
import { emptyMetaData } from '@utils/pagination'
import {
  CreateRegionDto,
  CreateRegionErrors,
  CreateRegionFormState,
  CreateRegionFormValues,
  CreateRegionSchema
} from '@validations/region/create-region.validation'
import {
  UpdateRegionDto,
  UpdateRegionErrors,
  UpdateRegionFormState,
  UpdateRegionFormValues,
  UpdateRegionSchema
} from '@validations/region/update-region.validation'
import { redirect, RedirectType } from 'next/navigation'

export async function createRegion(state: CreateRegionFormState, formData: FormData): Promise<CreateRegionFormState> {
  const parsedValues: CreateRegionDto = {
    state: String(formData.get('state')) || '',
    region: String(formData.get('region')) || '',
    price: Number(formData.get('price')) ?? 0
  }

  const result = CreateRegionSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateRegionErrors, CreateRegionFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.post<Region>('/regions', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/dashboard/regions', RedirectType.replace)
}

export async function getRegions(options: PaginationParams = { }): Promise<Pagination<Region>> {
  const response = await ServerApiClient.get<Pagination<Region>>(`/regions?page=${options.page ?? 1}&limit=${10}`)

  if (response.code >= 400) {
    console.log('regions error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getRegion(id: string) {
  const response = await ServerApiClient.get<Region>(`/regions/${id}`)

  if (response.code >= 400) {
    console.log('region error: ', response)
    return null
  }

  return response.data
}

export async function updateRegion(id: string, state: UpdateRegionFormState, formData: FormData) {
  const parsedValues: UpdateRegionDto = {
    state: String(formData.get('state')) || '',
    region: String(formData.get('region')) || '',
    price: Number(formData.get('price')) ?? 0
  }

  const result = UpdateRegionSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateRegionErrors, UpdateRegionFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.patch<Region>(`/regions/${id}`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/dashboard/regions', RedirectType.replace)
}

export async function deleteRegion(id: string) {
  const response = await ServerApiClient.delete<void>(`/regions/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  redirect('/dashboard/regions', RedirectType.replace)
}
