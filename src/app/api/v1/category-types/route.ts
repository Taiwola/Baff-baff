'use server'

import { createCategoryType, getAllCategoryTypes, getCategoryTypeByFilter } from '@services/category-type'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptCategoryType, adaptCategoryTypes } from '@adapters/category-type.adapter'
import { createCategoryTypeSchema } from '@validations/category-type'
import { NextRequest } from 'next/server'
import { verifySession } from '@lib/dal'
import dbConnect from '@lib/database'
import { paginate } from '@pagination/paginate'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const categoryTypes = await getAllCategoryTypes()
  const transformedCategories = adaptCategoryTypes(categoryTypes)

  const pageQuery = searchParams.get('page') || ''
  const limitQuery = searchParams.get('limit') || ''

  const page = parseInt(pageQuery) || 1
  const pageSize = parseInt(limitQuery) || 10

  const pagination = paginate({ data: transformedCategories, page, pageSize })

  return sendResponse('Categories fetched successfully', pagination, 200)
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (session?.role !== 'admin') {
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
    const transform = adaptCategoryType(categoryType)

    return sendResponse('Category type created successfully', transform, 201)
  } catch (error) {
    console.error('Category creation error:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
