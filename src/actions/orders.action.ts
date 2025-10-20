'use server'

import { ServerApiClient } from '@utils/api-server'
import { emptyMetaData } from '@utils/pagination'
import { OrderQuery } from '@validations/order'

export async function getOrders(query: OrderQuery = {}): Promise<Pagination<Order>> {
  const params = new URLSearchParams()

  if (query.page) params.set('page', query.page.toString())
  if (query.limit) params.set('limit', query.limit.toString())
  if (query.search) params.set('search', query.search)
  if (query.status) params.set('status', query.status)

  const queryString = params.toString()
  const url = `/orders${queryString ? `?${queryString}` : ''}`
  const response = await ServerApiClient.get<Pagination<Order>>(url)

  if (response.code >= 400) {
    console.log('Orders error: ', response)
    return emptyMetaData
  }

  return response.data
}
