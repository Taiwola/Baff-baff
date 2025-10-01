'use server'

import { createCategory, getAllCategories, getCategoryByFilter } from '@services/category'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptCategories, adaptCategory } from '@adapters/category.adapter'
import { createCategorySchema } from '@validations/category'
import { NextRequest } from 'next/server'
import { verifySession } from '@lib/dal'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pageQuery = searchParams.get('page') || ''
  const limitQuery = searchParams.get('limit') || ''

  const page = parseInt(pageQuery) || 1
  const pageSize = parseInt(limitQuery) || 10

  const categories = await getAllCategories(pageSize)
  const transformedCategories = adaptCategories({ data: categories, page, pageSize })

  return sendResponse('Categories fetched successfully', transformedCategories, 200)
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (session?.role !== 'admin') {
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
    const transform = adaptCategory(category)

    return sendResponse('Category created successfully', transform, 201)
  } catch (error) {
    console.error('Category creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
