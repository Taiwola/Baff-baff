import { NextRequest } from 'next/server'

import { verifySession } from '@lib/dal'
import { createRegion, getAllRegions } from '@services/region'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptRegion, adaptRegions } from '@adapters/region.adapter'
import { CreateRegionSchema } from '@validations/region/create-region.validation'
import dbConnect from '@lib/database'
import { regionQueryFilter } from '@validations/region'

export async function GET(req: NextRequest) {
    await dbConnect()
  const { searchParams } = new URL(req.url)

  const parsed = regionQueryFilter.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit')
  })

  const queries = parsed.data

  const filters: RegionFilter = {}

  if (queries?.limit) {
    filters.limit = queries.limit || 10
  }

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  const {regions, count} = await getAllRegions(filters)
  const transform = adaptRegions({ data: regions, total: count, page, pageSize })

  return sendResponse('regions fetched successfully', transform, 200)
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifySession()

    if (auth?.role !== 'admin') {
      return errorResponse('Forbidden', null, 403)
    }

    const body = await req.json()
    const result = CreateRegionSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 400)
    }

    const region = await createRegion(result.data)
    const transfrom = adaptRegion(region)
    return sendResponse('Category created successfully', transfrom, 201)
  } catch (error) {
    console.error('region creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
