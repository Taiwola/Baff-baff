import 'server-only'

import { ApiClient } from './api'
import { cookies } from 'next/headers'

async function withServerCookies(headers: HeadersInit = {}): Promise<HeadersInit> {
  const cookieStore = await cookies()
  const cookieString = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ')

  return cookieString ? { ...headers, cookie: cookieString } : headers
}

export const ServerApiClient = {
  async get<T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.get<T>(endpoint, {
      ...options,
      headers: await withServerCookies(options?.headers)
    })
  },

  async post<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.post<T>(endpoint, payload, {
      ...options,
      headers: await withServerCookies(options?.headers)
    })
  },

  async put<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.put<T>(endpoint, payload, {
      ...options,
      headers: await withServerCookies(options?.headers)
    })
  },

  async patch<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.patch<T>(endpoint, payload, {
      ...options,
      headers: await withServerCookies(options?.headers)
    })
  },

  async delete<T>(endpoint: string, options?: FetchOptions) {
    return ApiClient.delete<T>(endpoint, {
      ...options,
      headers: await withServerCookies(options?.headers)
    })
  }
}
