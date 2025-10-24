import { NextResponse } from 'next/server'

export type ApiResponse<T> = {
  success: boolean
  message: string
  data?: T
}

export function sendResponse<T>(message: string, data?: T, status: number = 200) {
  const success = true
  const response: ApiResponse<T> = { success, message, data }
  return NextResponse.json(response, { status })
}

export function errorResponse<T>(message: string, data?: T, status: number = 500) {
  let errorMessage = message
  if (status >= 500) errorMessage = 'Internal server error'
  const response: ApiResponse<T> = { success: false, message: errorMessage, data }
  return NextResponse.json(response, { status })
}
