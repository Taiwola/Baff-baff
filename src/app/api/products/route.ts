/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'
import { createProduct, getAllProducts } from '@services/product'
import { errorResponse, sendResponse } from '@utils/api-response'
import { getMaterialById, updateMaterial } from '@services/material'
import { adaptProducts, adaptProduct } from '@adapters/product.adapter'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { createProductSchema, productFilterSchema } from '@validations/product'
import { parseProductForm } from '@utils/formatting'

const isLocal = process.env.NODE_ENV !== 'production'

export async function GET(req: NextRequest) {
  await dbConnect()
  const { searchParams } = new URL(req.url)

  // may like, featured
  const parsed = productFilterSchema.safeParse({
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    design: searchParams.get('design') || '',
    status: searchParams.get('status') ?? undefined,
    page: searchParams.get('page') || '',
    limit: searchParams.get('limit') || '',
    search: searchParams.get('search') ?? undefined,
    collaboratorId: searchParams.get('collaboratorId') ?? undefined,
    priceRange: searchParams.get('priceRange') || undefined,
    sort: searchParams.get('sort') ?? undefined
  })

  const queries = parsed.data

  const filters: ProductFilter & { $or?: any[] } = {}

  if (queries?.search) {
    filters.name = { $regex: queries.search, $options: 'i' }
  }

  if (queries?.category) {
    filters.category = queries.category
  }

  if (queries?.type) {
    filters.type = queries.type
  }

  if (queries?.design) {
    filters.design = queries.design
  }

  if (queries?.status) {
    filters.status = queries.status
  }

  if (queries?.priceRange) {
    const sizeKeys: Size[] = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl']
    let priceRangeQuery: { $gte?: number; $lte?: number; $gt?: number }
    switch (queries.priceRange) {
      case 'low':
        priceRangeQuery = { $gte: 0, $lte: 15000 }
        break
      case 'mid':
        priceRangeQuery = { $gt: 15000, $lte: 20000 }
        break
      case 'high':
        priceRangeQuery = { $gt: 20000 }
        break
    }
    filters.$or = [
      ...sizeKeys.map((size) => ({
        [`${size}.price`]: priceRangeQuery
      })),
      ...sizeKeys.map((size) => ({
        [`${size}.discountPrice`]: priceRangeQuery
      }))
    ]
  }

  if (queries?.sort) {
    filters.sort = {}
    if (queries.sort === 'best-selling') {
      filters.sort.numberOfSales = -1
    } else if (queries.sort === 'n-o') {
      filters.sort.createdAt = 1
    } else if (queries.sort === 'o-n') {
      filters.sort.createdAt = -1
    } else if (queries.sort === 'a-z') {
      filters.sort.name = 1
    } else if (queries.sort === 'z-a') {
      filters.sort.name = -1
    }
  }

  if (queries?.collaboratorId) {
    filters.collaborator = queries.collaboratorId
  }

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  filters.page = page
  filters.limit = pageSize

  const {products, count} = await getAllProducts(filters)
  const transform = adaptProducts({ data: products, total: count, page, pageSize })
  return sendResponse('Product was successfully found', transform)
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const auth = await verifySession()

  const session = isLocal ? undefined : await mongoose.startSession()
  if (session) session.startTransaction()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }
  try {
    const formData = await req.formData()

    const parsedValues = parseProductForm(formData)
    const parsed = createProductSchema.safeParse(parsedValues)

    if (!parsed.success) {
      const validationErrors = parsed.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 422)
    }

    const result = parsed.data

    const material = await getMaterialById(result.materialId)

    if (!material) {
      return errorResponse('Material does not exist', null, 404)
    }

    if (result.yard > material.stock) {
      return errorResponse('Can not deduct more yard from material stock', null, 400)
    }

    const images: string[] = []

    for (const entry of result.images) {
      if (entry instanceof File) {
        if (entry.size <= 0) continue
        const validation = validateFile(entry, VALIDATION_PRESETS.IMAGE)

        if (!validation.isValid) {
          return errorResponse('File validation failed', { errors: validation.errors }, 400)
        }

        try {
          const uploadResult = await uploadToCloudinary(entry, CLOUDINARY_FOLDERS.PRODUCTS)

          if (!uploadResult.success) {
            return errorResponse('Image upload failed', { error: uploadResult.error }, 500)
          }

          if (uploadResult.data?.url) {
            images.push(uploadResult.data.url)
          }
        } catch (error) {
          console.error('Cloudinary upload error:', error)
          return errorResponse('Image upload failed', null, 500)
        }
      } else {
        images.push(entry)
      }
    }

    if (images.length < 4) {
      return errorResponse('At least four images are required', null, 400)
    }

    result.images = images

    const product = await createProduct(result, session)
    const currentMaterialStock = material.stock - product.yard
    await updateMaterial(material.id, { stock: currentMaterialStock }, session)

    if (session) await session.commitTransaction()
    if (session) session.endSession()

    const transform = adaptProduct(product)
    return sendResponse('Product created successfully', transform, 201)
  } catch (error) {
    if (session) await session.abortTransaction()
    if (session) session.endSession()
    console.error('Transaction error:', error)
    return errorResponse('Product creation failed', null, 500)
  }
}
