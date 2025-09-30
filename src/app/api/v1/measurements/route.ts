'use server'

import { getAuthUser } from '@middleware/auth'
import { createMeasurement, getAllMeasurements } from '@services/measurement'
import { getUserById } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformMeasurement, transformMeasurements } from '@adapters/measurement.adapter'
import { createMeasurementSchema } from '@validations/measurement'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req)

  const measurement = await getAllMeasurements({ userId: user?.id })
  const transform = transformMeasurements(measurement)

  return sendResponse('Request was successful', transform, 200)
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req)

  const findUser = await getUserById(user?.id as string)

  if (!findUser) {
    return errorResponse('User does not exist', null, 404)
  }
  try {
    const body = await req.json()

    const result = createMeasurementSchema.safeParse(body)
    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return errorResponse('Validation failed', validationErrors, 400)
    }

    result.data.userId = user?.id

    const measurement = await createMeasurement(result.data)
    const transform = transformMeasurement(measurement)

    return sendResponse('Measurement created successfully', transform, 201)
  } catch (error) {
    console.error('Measurement creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
