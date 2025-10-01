import { ApiClient } from '@utils/api'
import { emptyMetaData } from '@utils/pagination'
import { ServerApiClient } from '@utils/api-server'

export async function getUsers(options: PaginationParams = { }): Promise<Pagination<User>> {
  const response = await ServerApiClient.get<Pagination<User>>(`/users?page=${options.page ?? 1}&limit=${10}`)

  if (response.code >= 400) {
    console.log('users error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getUser(id: string): Promise<User | null> {
  const response = await ApiClient.get<User>(`/users/${id}`)

  if (response.code >= 400) {
    console.log('user error: ', response)
    return null
  }

  return response.data
}
