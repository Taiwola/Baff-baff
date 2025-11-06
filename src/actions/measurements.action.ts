'use server'

import { redirect, RedirectType } from 'next/navigation'
import { ServerApiClient } from '@utils/api-server'
import { formatError } from '@utils/formatting'
import { emptyMetaData } from '@utils/pagination'
import {
  CreateMeasurementDto,
  CreateMeasurementFormErrors,
  CreateMeasurementFormState,
  CreateMeasurementFormValues,
  createMeasurementSchema
} from '@validations/measurement/create-measurement.validation'
import {
  UpdateMeasurementDto,
  UpdateMeasurementFormErrors,
  UpdateMeasurementFormState,
  UpdateMeasurementFormValues,
  updateMeasurementSchema
} from '@validations/measurement/update-measurement.validation'
import { revalidateTag } from 'next/cache'
import { tag } from '@tags/measurements.tag'

export async function createMeasurement(state: CreateMeasurementFormState, formData: FormData): Promise<CreateMeasurementFormState> {
  const parsedValues: CreateMeasurementDto = {
    chest: String(formData.get('chest')),
    arm: String(formData.get('arm')),
    sleeve: String(formData.get('sleeve')),
    shoulder: String(formData.get('shoulder')),
    length: String(formData.get('length')),
    neck: String(formData.get('neck')),
    waist: String(formData.get('waist')),
    lap: String(formData.get('lap')),
    trouserLength: String(formData.get('trouserLength')),
    knee: String(formData.get('knee'))
  }

  const result = createMeasurementSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateMeasurementFormErrors, CreateMeasurementFormValues>(result.error)
    return { ...state, error: '', errors, values: parsedValues }
  }

  const response = await ServerApiClient.post<Measurement>('/measurements', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  revalidateTag(tag.default)
  redirect('/measurements', RedirectType.replace)
}

export async function getMeasurements(options: PaginationParams = {}): Promise<Pagination<Measurement>> {
  const params = new URLSearchParams()
  if (options.page) params.set('page', options.page.toString())
  if (options.limit) params.set('limit', options.limit.toString())

  const queryString = params.toString()
  const url = `/measurements${queryString ? `?${queryString}` : ''}`
  const response = await ServerApiClient.get<Pagination<Measurement>>(url, { next: { tags: [tag.default] } })

  if (response.code >= 400) {
    console.log('measurements error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getMeasurement(id: string) {
  const response = await ServerApiClient.get<Measurement>(`/measurements/${id}`, { next: { tags: [tag.createTag(id)] } })

  if (response.code >= 400) {
    console.log('measurement error: ', response)
    return null
  }

  return response.data
}

export async function getUserMeasurement(): Promise<Measurement> {
  const response = await ServerApiClient.get<Measurement>(`/measurements/user`, { next: { tags: [tag.createTag('user')] } })

  if (response.code >= 400) {
    return {
      id: '',
      userId: '',
      shirt: {
        chest: '',
        arm: '',
        sleeve: '',
        shoulder: '',
        length: '',
        neck: ''
      },
      trouser: {
        waist: '',
        lap: '',
        length: '',
        knee: ''
      },
      createdAt: '',
      updatedAt: ''
    }
  }

  return response.data
}

export async function updateMeasurement(id: string, state: UpdateMeasurementFormState, formData: FormData) {
  const parsedValues: UpdateMeasurementDto = {
    chest: String(formData.get('chest')),
    arm: String(formData.get('arm')),
    sleeve: String(formData.get('sleeve')),
    shoulder: String(formData.get('shoulder')),
    length: String(formData.get('length')),
    neck: String(formData.get('neck')),
    waist: String(formData.get('waist')),
    lap: String(formData.get('lap')),
    trouserLength: String(formData.get('trouserLength')),
    knee: String(formData.get('knee'))
  }

  const result = updateMeasurementSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateMeasurementFormErrors, UpdateMeasurementFormValues>(result.error)
    return { ...state, error: '', errors, values: parsedValues }
  }

  const response = await ServerApiClient.patch<Measurement>(`/measurements/${id}`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  revalidateTag(tag.default)
  revalidateTag(tag.createTag(id))
  redirect('/measurements', RedirectType.replace)
}

export async function updateUserMeasurement(state: UpdateMeasurementFormState, formData: FormData) {
  const parsedValues: UpdateMeasurementDto = {
    chest: formData.get('chest') ? String(formData.get('chest')) : undefined,
    arm: formData.get('arm') ? String(formData.get('arm')) : undefined,
    sleeve: formData.get('sleeve') ? String(formData.get('sleeve')) : undefined,
    shoulder: formData.get('shoulder') ? String(formData.get('shoulder')) : undefined,
    length: formData.get('length') ? String(formData.get('length')) : undefined,
    neck: formData.get('neck') ? String(formData.get('neck')) : undefined,
    waist: formData.get('waist') ? String(formData.get('waist')) : undefined,
    lap: formData.get('lap') ? String(formData.get('lap')) : undefined,
    trouserLength: formData.get('trouserLength') ? String(formData.get('trouserLength')) : undefined,
    knee: formData.get('knee') ? String(formData.get('knee')) : undefined
  }

  const result = updateMeasurementSchema.safeParse(parsedValues)

  if (!result.success) {
    console.log('i got ejjerrr')
    const errors = formatError<UpdateMeasurementFormErrors, UpdateMeasurementFormValues>(result.error)
    return { ...state, error: '', errors, values: parsedValues }
  }

  const response = await ServerApiClient.post<Measurement>(`/measurements/user`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  revalidateTag(tag.default)
  revalidateTag(tag.createTag('user'))
  redirect('/measurements', RedirectType.replace)
}

export async function deleteMeasurement(id: string) {
  const response = await ServerApiClient.delete<void>(`/measurements/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  revalidateTag(tag.default)
  redirect('/measurements', RedirectType.replace)
}
