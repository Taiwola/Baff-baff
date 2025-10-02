import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { ApiResponse, LocalGovernment } from '@index'
import { errorResponse, sendResponse } from '@utils/api-response'

const API_BASE_URL = process.env.API_REGION_URL

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const state = searchParams.get('state')

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 })
  }

  try {
    const response = await axios.get<ApiResponse<LocalGovernment[]>>(`${API_BASE_URL}/`, {
      params: { state: encodeURIComponent(state) },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return sendResponse('Request was successfull', response.data.data)
  } catch (error) {
    console.error('Error fetching states:', error)
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Failed to fetch states'
      const status = error.response?.status || 500
      return errorResponse(message, null, status)
    }
    return errorResponse('Failed to fetch states')
  }
}
