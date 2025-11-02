'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, RedirectType } from 'next/navigation'

import { formatError } from '@utils/formatting'
import { ServerApiClient } from '@utils/api-server'
import {
  CreateMaterialDto,
  CreateMaterialErrors,
  CreateMaterialFormState,
  createMaterialSchema,
  CreateMaterialValues,
  UpdateMaterialDto,
  UpdateMaterialErrors,
  UpdateMaterialFormState,
  updateMaterialSchema,
  UpdateMaterialValues
} from '@validations/material'
import { emptyMetaData } from '@utils/pagination'

export async function createMaterial(state: CreateMaterialFormState, formData: FormData): Promise<CreateMaterialFormState> {
  const parsedValues: CreateMaterialDto = {
    name: String(formData.get('name')) || '',
    stock: Number(formData.get('stock')) || 0,
    image: formData.get('image') || ''
  }

  const result = createMaterialSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateMaterialErrors, CreateMaterialValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

 const response:any = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/materials`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/dashboard/materials', RedirectType.replace)
}

export async function getMaterials(options: PaginationParams = { }): Promise<Pagination<Material>> {
  const response = await ServerApiClient.get<Pagination<Material>>(`/materials?page=${options.page ?? 1}&limit=${10}`)

  if (response.code >= 400) {
    console.log('materials error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getMaterial(id: string): Promise<Material | null> {
  const response = await ServerApiClient.get<Material>(`/materials/${id}`)

  if (response.code >= 400) {
    console.log('material error: ', response)
    return null
  }

  return response.data
}

export async function updateMaterial(id: string, state: UpdateMaterialFormState, formData: FormData): Promise<UpdateMaterialFormState> {
  const parsedValues: UpdateMaterialDto = {
    name: String(formData.get('name')) || '',
    stock: Number(formData.get('stock')) || 0,
    image: formData.get('image') || ''
  }
  const result = updateMaterialSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateMaterialErrors, UpdateMaterialValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.patch<Material>(`/materials/${id}`, formData)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/dashboard/materials', RedirectType.replace)
}

export async function deleteMaterial(id: string) {
  const response = await ServerApiClient.delete<void>(`/materials/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  redirect('/dashboard/materials', RedirectType.replace)
}
