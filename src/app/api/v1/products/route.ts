import { NextRequest } from 'next/server'

import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'
import { createProduct, getAllProducts } from '@services/product'
import { errorResponse, sendResponse } from '@utils/api-response'
import { getMaterialById, updateMaterial } from '@services/material'
import { adaptProducts, adaptProduct } from '@adapters/product.adapter'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { CreateProductDto, createProductSchema } from '@validations/product'
import mongoose from 'mongoose'
import { Status } from '@models/product.model'
import { verifySession } from '@lib/dal'

export async function GET(req: NextRequest) {
  const session = await verifySession()
  const { searchParams } = new URL(req.url)
  const searchQuery = searchParams.get('search') || ''
  const categoryQuery = searchParams.get('category') || ''
  const categoryTypeQuery = searchParams.get('category_type') || ''
  const statusQuery = searchParams.get('status') || ''

  const filters: { category?: string; name?: { $regex: string; $options: string }; category_type?: string; status: string } = {
    status: session?.role === 'admin' ? '' : Status.IN_STOCK
  }

  if (searchQuery) {
    filters.name = { $regex: searchQuery, $options: 'i' } // 'i' for case-insensitive
  }

  if (categoryQuery) {
    filters.category = categoryQuery
  }

  if (categoryTypeQuery) {
    filters.category_type = categoryTypeQuery
  }

  if (statusQuery) {
    filters.status = statusQuery
  }

  const products = await getAllProducts(filters)

  const transform = adaptProducts(products)

  return sendResponse('Product was successfully found', transform)
}

export async function POST(req: NextRequest) {
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const formData = await req.formData()
  const images: string[] = []
  const materialId = formData.get('material') as string
  const yard = Number(formData.get('yard'))

  const material = await getMaterialById(materialId)

  if (!material) {
    return errorResponse('Material does not exist', null, 404)
  }

  if (yard > material.stock) {
    return errorResponse('Can not deduct more yard from material stock', null, 400)
  }

  // Upload images first
  for (const entry of formData.getAll('image')) {
    if (entry instanceof File && entry.size > 0) {
      const validation = validateFile(entry, VALIDATION_PRESETS.IMAGE)
      if (!validation.isValid) {
        return errorResponse('File validation failed', { errors: validation.errors }, 400)
      }
      try {
        const uploadResult = await uploadToCloudinary(entry, CLOUDINARY_FOLDERS.PRODUCTS)
        if (!uploadResult.success) {
          return errorResponse('Image upload failed', { error: uploadResult.error }, 500)
        }
        images.push(uploadResult.data?.url || '')
      } catch (error) {
        console.error('Cloudinary upload error:', error)
        return errorResponse('Image upload failed', null, 500)
      }
    }
  }

  // Add image URLs to formData or product data
  formData.append('images', JSON.stringify(images))

  const productData: CreateProductDto = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    status: ['in_stock', 'out_of_stock'].includes(formData.get('status') as string)
      ? (formData.get('status') as 'in_stock' | 'out_of_stock')
      : undefined,
    category_type: formData.get('category_type') as string,
    material: materialId,
    yard,
    images,
    s: formData.get('s') ? JSON.parse(formData.get('s') as string) : undefined,
    m: formData.get('m') ? JSON.parse(formData.get('m') as string) : undefined,
    l: formData.get('l') ? JSON.parse(formData.get('l') as string) : undefined,
    xl: formData.get('xl') ? JSON.parse(formData.get('xl') as string) : undefined,
    xxl: formData.get('xxl') ? JSON.parse(formData.get('xxl') as string) : undefined,
    xxxl: formData.get('xxxl') ? JSON.parse(formData.get('xxxl') as string) : undefined
  }

  const result = createProductSchema.safeParse(productData)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const product = await createProduct(result.data, session)
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
