'use server'
import { uploadToCloudinary } from '@lib/cloudinary'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { getAuthUser } from '@middleware/auth'
import { getMaterialById, updateMaterial } from '@services/material'
import { createProduct, getAllProducts } from '@services/product'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { transformProducts, transformProduct } from '@utils/transform/product.transform'
import { CreateProductDto, createProductSchema } from '@utils/validation/product'
import { NextRequest } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  const products = await getAllProducts()

  const transform = transformProducts(products)

  return sendResponse('Product was successfully found', transform)
}

export async function POST(req: NextRequest) {
  const auth = await getAuthUser(req)

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
    sizes: JSON.parse((formData.get('sizes') as string) || '[]')
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

    const transform = transformProduct(product)
    return sendResponse('Product created successfully', transform, 201)
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Transaction error:', error)
    return errorResponse('Product creation failed', null, 500)
  }
}
