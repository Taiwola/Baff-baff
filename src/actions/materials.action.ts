'use server'

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

  const response = await ServerApiClient.post<Material>('/materials', formData)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/dashboard/materials', RedirectType.replace)
}

export async function getMaterials(): Promise<Material[]> {
  const response = await ServerApiClient.get<Material[]>('/materials')

  if (response.code >= 400) {
    console.log('materials error: ', response)
    return []
  }

  return response.data
}

export async function getMaterial(id: string): Promise<Material | null> {
  const response = await ServerApiClient.get<Material>(`/materials/${id}`)

  if (response.code >= 400) {
    console.log('materials error: ', response)
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
