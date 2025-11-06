'use server'

import { tag } from '@tags/regions.tag'
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
import { revalidateTag } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'

export async function createRegion(state: CreateRegionFormState, formData: FormData): Promise<CreateRegionFormState> {
  const parsedValues: CreateRegionDto = {
    state: String(formData.get('state')) || '',
    city: String(formData.get('city')) || '',
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

  revalidateTag(tag.default)
  redirect('/dashboard/regions', RedirectType.replace)
}

export async function getRegions(options: PaginationParams = {}): Promise<Pagination<Region>> {
  const params = new URLSearchParams()
  if (options.page) params.set('page', options.page.toString())
  if (options.limit) params.set('limit', options.limit.toString())

  const queryString = params.toString()
  const url = `/regions${queryString ? `?${queryString}` : ''}`
  const response = await ServerApiClient.get<Pagination<Region>>(url, { next: { tags: [tag.default] } })

  if (response.code >= 400) {
    console.log('regions error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getRegion(id: string) {
  const response = await ServerApiClient.get<Region>(`/regions/${id}`, { next: { tags: [tag.createTag(id)] } })

  if (response.code >= 400) {
    console.log('region error: ', response)
    return null
  }

  return response.data
}

export async function getRegionSC(state: string, city: string) {
  const response = await ServerApiClient.get<Region>(`/regions/states/${state}/cities/${city}`, { next: { tags: [tag.createTag(state + city)] } })

  if (response.code >= 400) {
    console.log('region error: ', response)
    return null
  }

  return response.data
}

export async function updateRegion(id: string, state: UpdateRegionFormState, formData: FormData) {
  const parsedValues: UpdateRegionDto = {
    state: String(formData.get('state')) || '',
    city: String(formData.get('city')) || '',
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

  revalidateTag(tag.default)
  revalidateTag(tag.createTag(id))
  revalidateTag(tag.createTag(response.data.state + response.data.city))
  redirect('/dashboard/regions', RedirectType.replace)
}

export async function deleteRegion(id: string) {
  const response = await ServerApiClient.delete<void>(`/regions/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  revalidateTag(tag.default)  
  redirect('/dashboard/regions', RedirectType.replace)
}
