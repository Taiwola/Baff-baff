'use server'

import { getAuthUser } from '@middleware/auth'
import { deleteCategory, getCategoryById, updateCategory } from '@services/category'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { transformCategory } from '@utils/transform/category.transform'
import { updateCategorySchema } from '@utils/validation/category'
import { NextRequest } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', 403)
  }

  const body = await req.json()

  const result = updateCategorySchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const category = await getCategoryById(id)

  if (!category) {
    return errorResponse('Category does not exist', null, 404)
  }

  try {
    const update = await updateCategory(category._id, result.data)

    if (!update) {
      return errorResponse('Category failed to update', null, 400)
    }

    return sendResponse('Category updated')
  } catch (error) {
    console.error('Error updating category', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const category = await getCategoryById(id)

  if (!category) {
    return errorResponse('Category does not exist', null, 404)
  }

  const transfromData = transformCategory(category)

  return sendResponse('Category found', transfromData, 200)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  const id = await params.id
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  try {
    await deleteCategory(id)
    return sendResponse('Category deleted successfully')
  } catch (error) {
    console.error('Error deleting category', error)
    return errorResponse('Internal server error')
  }
}
