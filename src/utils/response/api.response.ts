import { NextResponse } from 'next/server'

export type ApiResponse<T> = {
  success: boolean
  message: string
  data?: T
}

export function sendResponse<T>(success: boolean, message: string, data?: T, status: number = 200) {
  const response: ApiResponse<T> = { success, message, data }
  return NextResponse.json(response, { status })
}
