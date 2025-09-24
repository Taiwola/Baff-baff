'use server'

import { getAuthUser } from '@middleware/auth'
import { deleteRegion, getOneRegionById, updateRegion } from '@services/region'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { UpdateRegionSchema } from '@utils/validation/region/update-region.validation'
import { NextRequest } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', 403)
  }

  const body = await req.json()

  const result = UpdateRegionSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const region = await getOneRegionById(id)

  if (!region) {
    return errorResponse('Region does not exist', null, 404)
  }

  try {
    const update = await updateRegion(region._id as string, result.data)

    if (!update) {
      return errorResponse('Region failed to update', null, 400)
    }

    return sendResponse('Region updated')
  } catch (error) {
    console.error('Error updating Region', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const region = await getOneRegionById(id)

  if (!region) {
    return errorResponse('Region does not exist', null, 404)
  }

  return sendResponse('Region found', region, 200)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  try {
    await deleteRegion(id)
    return sendResponse('Region deleted successfully')
  } catch (error) {
    console.error('Error deleting Region', error)
    return errorResponse('Internal server error')
  }
}
