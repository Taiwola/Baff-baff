'use server'

import { revalidateTag } from 'next/cache'
import { tag } from '@tags/size-guide.tag'
import { UpsertSizeGuideFormState, upsertSizeGuideSchema } from '@validations/size-guide'
import { ServerApiClient } from '@utils/api-server'

export async function getSizeGuides(gender?: 'men' | 'women'): Promise<SizeGuide[]> {
  const params = gender ? `?gender=${gender}` : ''
  const response = await ServerApiClient.get<SizeGuide[] | SizeGuide>(`/size-guide${params}`, {
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

export async function upsertSizeGuide(_prev: UpsertSizeGuideFormState, formData: FormData): Promise<UpsertSizeGuideFormState> {
  const gender = formData.get('gender') as string

  const entries: Record<number, Record<string, string>> = {}
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^entries\[(\d+)\]\[(\w+)\]$/)
    if (match) {
      const index = Number(match[1])
      const field = match[2]
      if (!entries[index]) entries[index] = {}
      entries[index][field] = value as string
    }
  }

  const body = {
    gender,
    entries: Object.values(entries)
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
  return { error: '', errors: {}, values: result.data, success: true }
}

export async function deleteSizeGuide(gender: string): Promise<void> {
  await ServerApiClient.delete(`/size-guide/${gender}`)
  revalidateTag(tag.default, {})
  revalidateTag(tag.createTag(gender), {})
}
