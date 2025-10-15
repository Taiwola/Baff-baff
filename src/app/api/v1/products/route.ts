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
    status: searchParams.get('status') ?? undefined,
    page: searchParams.get('page') || '',
    limit: searchParams.get('limit') || '',
    search: searchParams.get('search') ?? undefined,
    collaboratorId: searchParams.get('collaboratorId') ?? undefined
  })

  const queries = parsed.data

  const filters: ProductFilter = {}

  if (queries?.search) {
    filters.name = { $regex: queries.search, $options: 'i' } 
  }

  if (queries?.category) {
    filters.category = queries.category
  }

  if (queries?.type) {
    filters.type = queries.type
  }

  if (queries?.status) {
    filters.status = queries.status
  }

  if (queries?.limit) {
    filters.limit = queries.limit || 10
  }

  if(queries?.collaboratorId) {
    filters.collaborator = queries.collaboratorId
  }

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10
  
  const products = await getAllProducts(filters)
  const transform = adaptProducts({ data: products, page, pageSize })
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
