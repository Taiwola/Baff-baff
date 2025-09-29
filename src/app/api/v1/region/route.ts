'use server'

import { getAuthUser } from '@middleware/auth'
import { createRegion, getAllRegions } from '@services/region'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformRegion, transformRegions } from '@utils/transform/region.transform'
import { CreateRegionSchema } from '@utils/validation/region/create-region.validation'
import { NextRequest } from 'next/server'

export async function GET() {
  const region = await getAllRegions()

  const transform = transformRegions(region)

  return sendResponse('regions fetched successfully', transform, 200)
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser(req)
    if (authUser?.role !== 'admin') {
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
    const transfrom = transformRegion(region)

    return sendResponse('Category created successfully', transfrom, 201)
  } catch (error) {
    console.error('region creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
