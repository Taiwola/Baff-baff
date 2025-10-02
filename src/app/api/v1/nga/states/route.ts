import axios from 'axios'
import { ApiResponse, State } from '@index'
import { errorResponse, sendResponse } from '@utils/api-response'

const API_BASE_URL = process.env.API_REGION_URL

export async function GET() {
  try {
    const response = await axios.get<ApiResponse<State[]>>(`${API_BASE_URL}/fetch`, {
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
