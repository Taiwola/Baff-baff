'use server'

import { getAuthUser } from '@middleware/auth'
import { createCategoryType, getAllCategoryTypes, getCategoryTypeByFilter } from '@services/category-type'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformCategoryType, transformCategoryTypes } from '@utils/transform/category-type.transfrom'
import { createCategoryTypeSchema } from '@utils/validation/category-type'
import { NextRequest } from 'next/server'

export async function GET() {
  const categoryTypes = await getAllCategoryTypes()
  const transformedCategories = transformCategoryTypes(categoryTypes)

  return sendResponse('Categories fetched successfully', transformedCategories, 200)
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser(req)
    if (authUser?.role !== 'admin') {
      return errorResponse('Forbidden', null, 403)
    }

    const body = await req.json()

    const result = createCategoryTypeSchema.safeParse(body)
    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return errorResponse('Validation failed', validationErrors, 400)
    }

    const categoryTypeExist = await getCategoryTypeByFilter({ name: result.data.name })

    if (categoryTypeExist) {
      return errorResponse('Category type with this name already exists', null, 400)
    }

    const categoryType = await createCategoryType(result.data)
    const transform = transformCategoryType(categoryType)

    return sendResponse('Category type created successfully', transform, 201)
  } catch (error) {
    console.error('Category creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
