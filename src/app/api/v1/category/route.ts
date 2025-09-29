'use server'

import { getAuthUser } from '@middleware/auth'
import { createCategory, getAllCategories, getCategoryByFilter } from '@services/category'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformCategories, transformCategory } from '@utils/transform/category.transform'
import { createCategorySchema } from '@utils/validation/category'
import { NextRequest } from 'next/server'

export async function GET() {
  const categories = await getAllCategories()
  const transformedCategories = transformCategories(categories)

  return sendResponse('Categories fetched successfully', transformedCategories, 200)
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser(req)
    if (authUser?.role !== 'admin') {
      return errorResponse('Forbidden', null, 403)
    }

    const body = await req.json()

    const result = createCategorySchema.safeParse(body)
    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return errorResponse('Validation failed', validationErrors, 400)
    }

    const categoryExist = await getCategoryByFilter({ name: result.data.name })

    if (categoryExist) {
      return errorResponse('Category with this name already exists', null, 400)
    }

    const category = await createCategory(result.data)
    const transform = transformCategory(category)

    return sendResponse('Category created successfully', transform, 201)
  } catch (error) {
    console.error('Category creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
