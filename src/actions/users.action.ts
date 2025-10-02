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

// export async function updateUser(id: string, state: UpdateRegionFormState, formData: FormData) {
//   const parsedValues: UpdateRegionDto = {
//     state: String(formData.get('state')) || '',
//     region: String(formData.get('region')) || '',
//     price: Number(formData.get('price')) ?? 0
//   }

//   const result = UpdateRegionSchema.safeParse(parsedValues)

//   if (!result.success) {
//     const errors = formatError<UpdateRegionErrors, UpdateRegionFormValues>(result.error)
//     return { ...state, errors, values: parsedValues }
//   }

//   const response = await ServerApiClient.patch<Region>(`/regions/${id}`, result.data)

//   if (response.code >= 400) {
//     return { ...state, error: response.message, values: parsedValues }
//   }

//   redirect('/dashboard/regions', RedirectType.replace)
// }
