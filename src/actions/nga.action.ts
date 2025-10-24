import { ApiClient } from '@utils/api'

export async function getStates(): Promise<NGA[]> {
  const response = await ApiClient.get<NGA[]>(`/nga/states`)

  if (response.code >= 400) {
    console.log('GET STATES error: ', response)
    return []
  }

  return response.data
}

export async function getLocalGovts(state: string) {
    const response = await ApiClient.get<NGA[]>(`/nga/lgas?state=${state}`)

  if (response.code >= 400) {
    console.log('GET STATES error: ', response)
    return []
  }

  return response.data
}
