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

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const session = await verifySession()
  const { searchParams } = new URL(req.url)

  const parsed = productFilterSchema.safeParse({
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    page: searchParams.get('page') || '',
    limit: searchParams.get('limit') || ''
  })

  const queries = parsed.data

  const filters: ProductFilter = {}

  if (session?.role !== 'admin') {
    filters.status = 'inStock'
  }

  if (queries?.search) {
    filters.name = { $regex: queries.search, $options: 'i' } // 'i' for case-insensitive
  }

  if (queries?.category) {
    filters.category = queries.category
  }

  if (queries?.type) {
    filters.type = queries.type
  }

  if (queries?.status && session?.role === 'admin') {
    filters.status = queries.status
  }

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  const products = await getAllProducts(pageSize, filters)

  const transform = adaptProducts({ data: products, page, pageSize })

  return sendResponse('Product was successfully found', transform)
}

export async function POST(req: NextRequest) {
  const auth = await verifySession()

  const session = await mongoose.startSession()
  session.startTransaction()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const formData = await req.formData()

  try {
    const parsed = createProductSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      category: formData.get('category'),
      status: formData.get('status'),
      type: formData.get('type'),
      materialId: formData.get('materialId'),
      yard: formData.get('yard'),
      images: formData.getAll('images'),
      fittings: formData.getAll('fittings').map((f) => String(f)),
      s: formData.get('s'),
      m: formData.get('m'),
      l: formData.get('l'),
      xl: formData.get('xl'),
      xxl: formData.get('xxl'),
      xxxl: formData.get('xxxl')
    })

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

    result.images = images

    const product = await createProduct(result, session)
    const currentMaterialStock = material.stock - product.yard
    await updateMaterial(material.id, { stock: currentMaterialStock }, session)

    await session.commitTransaction()
    session.endSession()

    const transform = adaptProduct(product)
    return sendResponse('Product created successfully', transform, 201)
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Transaction error:', error)
    return errorResponse('Product creation failed', null, 500)
  }
}
