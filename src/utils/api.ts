import config from './config'
import { catchError, createFailure, createSuccess } from './result'

/**
 * Generic fetch wrapper that standardizes API calls.
 * Handles JSON, blobs, and error responses consistently.
 *
 * @param endpoint - API endpoint relative to the base URL. Must begin with "/" e.g /lenses
 * @param options - Extended fetch options, including body, headers, and responseType
 * @returns A Result<T> object containing either data or an error
 */
async function customFetch<T>(endpoint: string, options: FetchOptions): Promise<Result<T>> {
  const { body, responseType = 'json', ...restOptions } = options

  // Automatically set Content-Type header for JSON string bodies
  if (typeof body === 'string') {
    options.headers = { ...options.headers, 'Content-Type': 'application/json' }
  }

  // Perform fetch with error capture
  const [error, response] = await catchError(
    fetch(`${config.baseUrl}${endpoint}`, { ...restOptions, body, headers: { ...options.headers }, credentials: 'include' })
  )

  // Handle error or non-OK response
  if (error || !response?.ok) {
    console.log("error >>>", response)
    // Try to parse error response if available
    const errorData = error ? error : { ...(await response?.json()), status: response?.status }

    return createFailure<T>(errorData)
  }

  // Handle No Content (204) response
  if (response.status === 204) {
    return createSuccess<T>({} as T)
  }

  // Handle file/blob response
  if (responseType === 'blob') {
    const blob = await response.blob()
    return createSuccess<T>(blob as T)
  }

  // Default: parse JSON response
  const data = await response.json()
  return createSuccess<T>(data.data)
}

export const ApiClient = {
  /**
   * Helper for GET requests
   */
  async get<T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) {
    return await customFetch<T>(endpoint, { ...options, method: 'GET' })
  },

  /**
   * Helper for POST requests
   */
  async post<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    const body = payload instanceof FormData ? payload : JSON.stringify(payload)
    return await customFetch<T>(endpoint, { ...options, method: 'POST', body })
  },

  /**
   * Helper for PUT requests
   */
  async put<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    const body = payload instanceof FormData ? payload : JSON.stringify(payload)
    return await customFetch<T>(endpoint, { ...options, method: 'PUT', body })
  },

  /**
   * Helper for PATCH requests
   */
  async patch<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    const body = payload instanceof FormData ? payload : JSON.stringify(payload)
    return await customFetch<T>(endpoint, { ...options, method: 'PATCH', body })
  },

  /**
   * Helper for DELETE requests
   */
  async delete<T>(endpoint: string, options?: FetchOptions) {
    return await customFetch<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// /**
//  * Helper for GET requests
//  *
//  * @param endpoint - API endpoint relative to the base URL. Must begin with "/" e.g /lenses
//  * @param options - Extended fetch options, including headers, and responseType
//  * @returns A Result<T> object containing either data or an error
//  */
// export async function Get<T>(endpoint: string, options?: FetchOptions) {
//   return await customFetch<T>(endpoint, { ...options, method: 'GET' })
// }

// /**
//  * Helper for POST requests
//  *
//  * @param endpoint - API endpoint relative to the base URL. Must begin with "/" e.g /lenses
//  * @param options - Extended fetch options, including body, headers, and responseType
//  * @returns A Result<T> object containing either data or an error
//  */
// export async function Post<T>(endpoint: string, options?: FetchOptions) {
//   const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body)
//   return await customFetch<T>(endpoint, { ...options, method: 'POST', body })
// }

// /**
//  * Helper for PUT requests
//  *
//  * @param endpoint - API endpoint relative to the base URL. Must begin with "/" e.g /lenses
//  * @param options - Extended fetch options, including body, headers, and responseType
//  * @returns A Result<T> object containing either data or an error
//  */
// export async function Put<T>(endpoint: string, options?: FetchOptions) {
//   const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body)
//   return await customFetch<T>(endpoint, { ...options, method: 'PUT', body })
// }

// /**
//  * Helper for PATCH requests
//  *
//  * @param endpoint - API endpoint relative to the base URL. Must begin with "/" e.g /lenses
//  * @param options - Extended fetch options, including body, headers, and responseType
//  * @returns A Result<T> object containing either data or an error
//  */
// export async function Patch<T>(endpoint: string, options?: FetchOptions) {
//   const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body)
//   return await customFetch<T>(endpoint, { ...options, method: 'PATCH', body })
// }

// /**
//  * Helper for DELETE requests
//  *
//  * @param endpoint - API endpoint relative to the base URL. Must begin with "/" e.g /lenses
//  * @param options - Extended fetch options, including body, headers, and responseType
//  * @returns A Result<T> object containing either data or an error
//  */
// export async function Delete<T>(endpoint: string, options?: FetchOptions) {
//   return await customFetch<T>(endpoint, { ...options, method: 'DELETE' })
// }
