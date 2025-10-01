// 'use server'

// import { ServerApiClient } from '@utils/api-server'
// import { formatError } from '@utils/formatting'
// import {
//   CreateCollaboratorDto,
//   CreateCollaboratorErrors,
//   CreateCollaboratorFormState,
//   CreateCollaboratorFormValues,
//   CreateCollaboratorSchema
// } from '@validations/collaborator/create-collaborator.validation'
// import {
//   UpdateCollaboratorDto,
//   UpdateCollaboratorErrors,
//   UpdateCollaboratorFormState,
//   UpdateCollaboratorFormValues,
//   UpdateCollaboratorSchema
// } from '@validations/collaborator/update-collaborator.validation'
// import { redirect, RedirectType } from 'next/navigation'

// export async function createCollaborator(state: CreateCollaboratorFormState, formData: FormData): Promise<CreateCollaboratorFormState> {
//   const parsedValues: CreateCollaboratorDto = {
//     state: String(formData.get('state')) || '',
//     collaborator: String(formData.get('collaborator')) || '',
//     price: Number(formData.get('price')) ?? 0
//   }

//   const result = CreateCollaboratorSchema.safeParse(parsedValues)

//   if (!result.success) {
//     const errors = formatError<CreateCollaboratorErrors, CreateCollaboratorFormValues>(result.error)
//     return { ...state, errors, values: parsedValues }
//   }

//   const response = await ServerApiClient.post<Collaborator>('/collaborators', result.data)

//   if (response.code >= 400) {
//     return { ...state, error: response.message, values: parsedValues }
//   }

//   redirect('/dashboard/collaborators', RedirectType.replace)
// }

// export async function getCollaborators() {
//   const response = await ServerApiClient.get<Collaborator[]>('/collaborators')

//   if (response.code >= 400) {
//     console.log('collaborators error: ', response)
//     return []
//   }

//   return response.data
// }

// export async function getCollaborator(id: string) {
//   const response = await ServerApiClient.get<Collaborator>(`/collaborators/${id}`)

//   if (response.code >= 400) {
//     console.log('collaborator error: ', response)
//     return null
//   }

//   return response.data
// }

// export async function updateCollaborator(id: string, state: UpdateCollaboratorFormState, formData: FormData) {
//   const parsedValues: UpdateCollaboratorDto = {
//     state: String(formData.get('state')) || '',
//     collaborator: String(formData.get('collaborator')) || '',
//     price: Number(formData.get('price')) ?? 0
//   }

//   const result = UpdateCollaboratorSchema.safeParse(parsedValues)

//   if (!result.success) {
//     const errors = formatError<UpdateCollaboratorErrors, UpdateCollaboratorFormValues>(result.error)
//     return { ...state, errors, values: parsedValues }
//   }

//   const response = await ServerApiClient.patch<Collaborator>(`/collaborators/${id}`, result.data)

//   if (response.code >= 400) {
//     return { ...state, error: response.message, values: parsedValues }
//   }

//   redirect('/dashboard/collaborators', RedirectType.replace)
// }

// export async function deleteCollaborator(id: string) {
//   const response = await ServerApiClient.delete<void>(`/collaborators/${id}`)

//   if (response.code >= 400) {
//     return { error: response.message }
//   }

//   redirect('/dashboard/collaborators', RedirectType.replace)
// }
