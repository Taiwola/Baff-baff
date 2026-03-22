import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptSizeGuide } from '@adapters/size-guide.adapter'
import { deleteSizeGuide, getSizeGuideByGender } from '@services/size-guide.service'

type Params = { params: Promise<{ gender: string }> }

// Public — storefront fetches men's or women's guide individually
export async function GET(_req: NextRequest, { params }: Params) {
  await dbConnect()

  const { gender } = await params

  if (gender !== 'men' && gender !== 'women') {
    return errorResponse('Invalid gender param. Must be "men" or "women"', null, 400)
  }

  const guide = await getSizeGuideByGender(gender)

  if (!guide) {
    return errorResponse('Size guide not found', null, 404)
  }

  const transform = adaptSizeGuide(guide)
  return sendResponse('Size guide fetched successfully', transform, 200)
}

// Admin only — remove a gender's size guide entirely
export async function DELETE(_req: NextRequest, { params }: Params) {
  await dbConnect()
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const { gender } = await params

  if (gender !== 'men' && gender !== 'women') {
    return errorResponse('Invalid gender param. Must be "men" or "women"', null, 400)
  }

  const deleted = await deleteSizeGuide(gender)

  if (!deleted) {
    return errorResponse('Size guide not found', null, 404)
  }

  return sendResponse('Size guide deleted successfully', null, 200)
}