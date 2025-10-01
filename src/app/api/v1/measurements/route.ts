'use server'

import { createMeasurement, getAllMeasurements } from '@services/measurement'
import { getUserById } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformMeasurement, transformMeasurements } from '@adapters/measurement.adapter'
import { createMeasurementSchema } from '@validations/measurement'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { paginate } from '@utils/pagination'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const session = await verifySession()
  const { searchParams } = new URL(req.url)

  const measurement = await getAllMeasurements({ userId: session?.userId })
  const transform = transformMeasurements(measurement)

  const pageQuery = searchParams.get('page') || ''
  const limitQuery = searchParams.get('limit') || ''

  const page = parseInt(pageQuery) || 1
  const pageSize = parseInt(limitQuery) || 10

  const pagination = paginate({ data: transform, page, pageSize })

  return sendResponse('Request was successful', pagination, 200)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()

  const findUser = await getUserById(session?.userId as string)

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

    result.data.userId = session?.userId

    const measurement = await createMeasurement(result.data)
    const transform = transformMeasurement(measurement)

    return sendResponse('Measurement created successfully', transform, 201)
  } catch (error) {
    console.error('Measurement creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
