import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptSizeGuide, adaptSizeGuides } from '@adapters/size-guide.adapter'
import { getAllSizeGuides, getSizeGuideByGender, upsertSizeGuide } from '@services/size-guide.service'
import { upsertSizeGuideSchema } from '@validations/size-guide'

// Public — no auth needed, storefront needs this
export async function GET(req: NextRequest) {
  await dbConnect()

  const { searchParams } = new URL(req.url)
  const gender = searchParams.get('gender')

  if (gender) {
    if (gender !== 'men' && gender !== 'women') {
      return errorResponse('Invalid gender. Must be "men" or "women"', null, 400)
    }

    const guide = await getSizeGuideByGender(gender)

    if (!guide) {
      return errorResponse('Size guide not found', null, 404)
    }

    return sendResponse('Size guide fetched successfully', adaptSizeGuide(guide), 200)
  }

  const guides = await getAllSizeGuides()
  return sendResponse('Size guides fetched successfully', adaptSizeGuides(guides), 200)
}

// Admin only — create or replace a gender's size guide
export async function POST(req: NextRequest) {
  await dbConnect()
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const body = await req.json()

  const result = upsertSizeGuideSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }))
    return errorResponse('Validation failed', validationErrors, 422)
  }

  const guide = await upsertSizeGuide(result.data.gender, result.data.entries)
  const transform = adaptSizeGuide(guide)

  return sendResponse('Size guide saved successfully', transform, 200)
}