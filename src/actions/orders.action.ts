'use server'

import { tag } from '@tags/orders.tag'
import { ServerApiClient } from '@utils/api-server'
import { formatError } from '@utils/formatting'
import { emptyMetaData } from '@utils/pagination'
import { OrderQuery, UpdateOrderDto, UpdateOrderFormErrors, UpdateOrderFormState, updateOrderSchema } from '@validations/order'
import { revalidateTag } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'

export async function getOrders(query: OrderQuery = {}): Promise<Pagination<Order>> {
  const params = new URLSearchParams()

  if (query.page) params.set('page', query.page.toString())
  if (query.limit) params.set('limit', query.limit.toString())
  if (query.search) params.set('search', query.search)
  if (query.status) params.set('status', query.status)
  if (query.userId) params.set('userId', query.userId)

  const queryString = params.toString()
  const url = `/orders${queryString ? `?${queryString}` : ''}`
  const response = await ServerApiClient.get<Pagination<Order>>(url, { next: { tags: [tag.default] } })

  if (response.code >= 400) {
    console.log('Orders error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getOrder(id: string) {
  const response = await ServerApiClient.get<Order>(`/orders/${id}`, { next: { tags: [tag.createTag(id)] } })

  if (response.code >= 400) {
    console.log('order error: ', response)
    return null
  }

  return response.data
}

export async function updateOrder(id: string, state: UpdateOrderFormState, formData: FormData): Promise<UpdateOrderFormState> {
  const parsed = {
    status: String(formData.get('status') || '') as OrderStatus
  }

  const result = updateOrderSchema.safeParse(parsed)

  if (!result.success) {
    const errors = formatError<UpdateOrderFormErrors, UpdateOrderDto>(result.error)
    return { ...state, errors, values: parsed, error: '' }
  }

  const response = await ServerApiClient.patch<Order>(`/orders/${id}`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsed }
  }

  revalidateTag(tag.default)
  revalidateTag(tag.createTag(id))
  redirect(`/dashboard/orders/${id}`, RedirectType.replace)
}
