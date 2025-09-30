'use server'

import { getAuthUser } from '@middleware/auth'
import { deleteCategoryType, getCategoryTypeById, updateCategoryType } from '@services/category-type'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptCategoryType } from '@adapters/category-type.adapter'
import { updateCategoryTypeSchema } from '@validations/category-type/update.category-type.validation'
import { NextRequest } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', 403)
  }

  const body = await req.json()

  const result = updateCategoryTypeSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const category = await getCategoryTypeById(id)

  if (!category) {
    return errorResponse('Category type does not exist', null, 404)
  }

  try {
    const update = await updateCategoryType(category._id, result.data)

    if (!update) {
      return errorResponse('Category type failed to update', null, 400)
    }

    return sendResponse('Category type updated')
  } catch (error) {
    console.error('Error updating category', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const category = await getCategoryTypeById(id)

  if (!category) {
    return errorResponse('Category type does not exist', 404)
  }

  const transfromData = adaptCategoryType(category)

  return sendResponse('Category type found', transfromData, 200)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  try {
    await deleteCategoryType(id)
    return sendResponse('Category type deleted successfully')
  } catch (error) {
    console.error('Error deleting category type', error)
    return errorResponse('Internal server error', 500)
  }
}
