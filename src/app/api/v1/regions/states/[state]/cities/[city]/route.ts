import { NextRequest } from 'next/server'

import { getRegionByFilter } from '@services/region'
import { adaptRegion } from '@adapters/region.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import dbConnect from '@lib/database'

type Params = Promise<{
  state: string
  city: string
}>
export async function GET(_req: NextRequest, { params }: { params: Params }) {
    await dbConnect()
  const { state, city } = await params
  const region = await getRegionByFilter({ state, city })
  if (!region) return errorResponse('Region not found', null, 404)
  const response = adaptRegion(region)
  return sendResponse('success', response)
}
