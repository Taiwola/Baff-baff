import { ApiClient } from '@utils/api'

export async function getUser(id: string): Promise<User | null> {
  const response = await ApiClient.get<User>(`/users/${id}`)

  if (response.code >= 400) {
    console.log('user error: ', response)
    return null
  }

  return response.data
}
