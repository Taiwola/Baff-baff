'use server'

import { revalidateTag } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'

import { tag } from '@tags/collaborators.tag'
import { formatError } from '@utils/formatting'
import { emptyMetaData } from '@utils/pagination'
import { ServerApiClient } from '@utils/api-server'
import {
  CreateCollaboratorDto,
  CreateCollaboratorErrors,
  CreateCollaboratorFormState,
  createCollaboratorSchema,
  CreateCollaboratorValues,
  parseCollaboratorFormData,
  UpdateCollaboratorDto,
  UpdateCollaboratorErrors,
  UpdateCollaboratorFormState,
  updateCollaboratorSchema,
  UpdateCollaboratorValues
} from '@validations/collaborators'

export async function createCollaborator(state: CreateCollaboratorFormState, formData: FormData): Promise<CreateCollaboratorFormState> {
  const parsedValues: CreateCollaboratorDto = parseCollaboratorFormData(formData)

  const result = createCollaboratorSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateCollaboratorErrors, CreateCollaboratorValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.post<Collaborator>('/collaborators', formData)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  revalidateTag(tag.default)
  redirect('/dashboard/collaborators', RedirectType.replace)
}

export async function getCollaborators(options: CollaboratorFilter = {}): Promise<Pagination<Collaborator>> {
  const params = new URLSearchParams()

  if (options.page) params.set('page', options.page.toString())
  if (options.limit) params.set('limit', options.limit.toString())
  if (options.search) params.set('search', options.search)

  const queryString = params.toString()
  const url = `/collaborators${queryString ? `?${queryString}` : ''}`
  const response = await ServerApiClient.get<Pagination<Collaborator>>(url, { next: { tags: [tag.default] } })

  if (response.code >= 400) {
    console.log('collaborators error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getCollaborator(id: string): Promise<Collaborator | null> {
  const response = await ServerApiClient.get<Collaborator>(`/collaborators/${id}`, { next: { tags: [tag.createTag(id)] } })

  if (response.code >= 400) {
    console.log('collaborator error: ', response)
    return null
  }

  return response.data
}

export async function updateCollaborator(id: string, state: UpdateCollaboratorFormState, formData: FormData): Promise<UpdateCollaboratorFormState> {
  const parsedValues: UpdateCollaboratorDto = parseCollaboratorFormData(formData)
  const result = updateCollaboratorSchema.safeParse({ ...parsedValues, image: parsedValues.image || state.values.image })

  if (!result.success) {
    const errors = formatError<UpdateCollaboratorErrors, UpdateCollaboratorValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.patch<Collaborator>(`/collaborators/${id}`, formData)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  revalidateTag(tag.default)
  revalidateTag(tag.createTag(id))
  redirect('/dashboard/collaborators', RedirectType.replace)
}

export async function deleteCollaborator(id: string) {
  const response = await ServerApiClient.delete<void>(`/collaborators/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  revalidateTag(tag.default)
  redirect('/dashboard/collaborators', RedirectType.replace)
}
