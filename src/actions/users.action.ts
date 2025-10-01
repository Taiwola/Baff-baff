import { ApiClient } from '@utils/api'
import { ServerApiClient } from '@utils/api-server'

export async function getUsers(): Promise<User[]> {
  const response = await ServerApiClient.get<User[]>('/users')

  if (response.code >= 400) {
    console.log('users error: ', response)
    return []
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
