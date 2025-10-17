import { createMeasurement, getAllMeasurements } from '@services/measurement'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformMeasurement, transformMeasurements } from '@adapters/measurement.adapter'
import { createMeasurementSchema } from '@validations/measurement'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { measurementQueryFilter } from '@validations/measurement/query-filter.validation'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const session = await verifySession()

  if (!session?.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const { searchParams } = new URL(req.url)

  const parsed = measurementQueryFilter.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit')
  })

  const queries = parsed.data

  const filters: MeasurementFilter = {
    userId: session.userId
  }

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  filters.page = page
  filters.limit = pageSize

  const measurement = await getAllMeasurements(filters)
  const transform = transformMeasurements({ data: measurement, page, pageSize })

  return sendResponse('Request was successful', transform, 200)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()

  if (!session?.userId) {
    return errorResponse('UnAuthenticated', null, 401)
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

    const measurement = await createMeasurement({ ...result.data, userId: session.userId })
    const transform = transformMeasurement(measurement)

    return sendResponse('Measurement created successfully', transform, 201)
  } catch (error) {
    console.error('Measurement creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
