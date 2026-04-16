'use server'

import { revalidateTag } from 'next/cache'
import { tag } from '@tags/size-guide.tag'
import { UpsertSizeGuideFormState, upsertSizeGuideSchema } from '@validations/size-guide'
import { ServerApiClient } from '@utils/api-server'
import { redirect, RedirectType } from 'next/navigation'

export async function getSizeGuides(gender?: 'men' | 'women', type?: 'shirt' | 'trouser' | 'jacket' | 'short'): Promise<SizeGuide[]> {
  const params = new URLSearchParams()
  if (gender) params.append('gender', gender)
  if (type) params.append('type', type)

  const queryString = params.toString() ? `?${params.toString()}` : ''
  const response = await ServerApiClient.get<SizeGuide[] | SizeGuide>(`/size-guide${queryString}`, {
    next: { tags: [gender ? tag.createTag(gender) : tag.default] }
  })

  if (!response.data || typeof response.data !== 'object') return []

  // API returns single object when gender filter is used, array otherwise
  if (Array.isArray(response.data)) return response.data

  // Single object — check it has actual content (not empty {})
  if ('id' in response.data && response.data.id) return [response.data]

  return []
}

export async function getSizeGuideByGender(gender: 'men' | 'women'): Promise<SizeGuide | null> {
  const response = await ServerApiClient.get<SizeGuide>(`/size-guide?gender=${gender}`, {
    next: { tags: [tag.createTag(gender)] }
  })

  if (!response.data || typeof response.data !== 'object') return null
  if ('id' in response.data && response.data.id) return response.data as SizeGuide
  return null
}

export async function getSizeGuideByGenderAndType(
  gender: 'men' | 'women',
  type: 'shirt' | 'trouser' | 'jacket' | 'short'
): Promise<SizeGuide | null> {
  const response = await ServerApiClient.get<SizeGuide>(`/size-guide?gender=${gender}&type=${type}`, {
    next: { tags: [tag.createTag(gender)] }
  })

  if (!response.data || typeof response.data !== 'object') return null
  if ('gender' in response.data) return response.data as SizeGuide
  return null
}

export async function upsertSizeGuide(_prev: UpsertSizeGuideFormState, formData: FormData): Promise<UpsertSizeGuideFormState> {
  const gender = formData.get('gender') as string

  // Parse entries with nested measurements
  const entries: Record<number, { size: string; type: string; measurements: Record<string, string> }> = {}

  for (const [key, value] of formData.entries()) {
    // Match entries[index][size] or entries[index][type]
    const directMatch = key.match(/^entries\[(\d+)\]\[(\w+)\]$/)
    if (directMatch) {
      const index = Number(directMatch[1])
      const field = directMatch[2]
      if (!entries[index]) {
        entries[index] = { size: '', type: '', measurements: {} }
      }
      if (field === 'size' || field === 'type') {
        entries[index][field] = value as string
      }
    }

    // Match entries[index][measurements][fieldName]
    const measurementMatch = key.match(/^entries\[(\d+)\]\[measurements\]\[(\w+)\]$/)
    if (measurementMatch) {
      const index = Number(measurementMatch[1])
      const field = measurementMatch[2]
      if (!entries[index]) {
        entries[index] = { size: '', type: '', measurements: {} }
      }
      entries[index].measurements[field] = value as string
    }
  }

  const body = {
    gender,
    entries: Object.values(entries).map((entry) => ({
      ...entry,
      // Remove empty measurement fields
      measurements: Object.fromEntries(Object.entries(entry.measurements).filter(([_, v]) => v !== ''))
    }))
  }

  const result = upsertSizeGuideSchema.safeParse(body)

  if (!result.success) {
    const errors = Object.fromEntries(result.error.issues.map((i) => [i.path.join('.'), i.message]))
    return { error: '', errors, values: body as UpsertSizeGuideFormState['values'] }
  }

  const response = await ServerApiClient.post<SizeGuide>('/size-guide', result.data)

  if (response.code >= 400) {
    return { error: response.message, errors: {}, values: result.data }
  }

  revalidateTag(tag.default, {})
  revalidateTag(tag.createTag(gender), {})
  redirect('/dashboard/size-guide', RedirectType.replace)
}

export async function deleteSizeGuide(gender: string): Promise<void> {
  await ServerApiClient.delete(`/size-guide/${gender}`)
  revalidateTag(tag.default, {})
  revalidateTag(tag.createTag(gender), {})
  redirect('/dashboard/size-guide', RedirectType.replace)
}
