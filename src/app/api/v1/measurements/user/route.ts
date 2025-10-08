import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { errorResponse, sendResponse } from '@utils/api-response'
import { updateMeasurementSchema } from '@validations/measurement'
import { transformMeasurement } from '@adapters/measurement.adapter'
import { getMeasurementByFilter, upsertMeasurementByUserId } from '@services/measurement'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  const session = await verifySession()

  if (!session?.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const body = await req.json()

  const result = updateMeasurementSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }
  try {
    const measurement = await upsertMeasurementByUserId(session.userId, result.data)
    return sendResponse('Measurement updated', measurement)
  } catch (error) {
    console.error('Error updating Measurement', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET() {
  const session = await verifySession()

  if (!session?.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const measurement = await getMeasurementByFilter({ userId: session.userId })

  if (!measurement) {
    return errorResponse('Measurement does not exist', null, 404)
  }

  const transfromData = transformMeasurement(measurement)

  return sendResponse('Measurement found', transfromData, 200)
}
