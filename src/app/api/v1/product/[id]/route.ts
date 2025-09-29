'use server'

import { uploadToCloudinary } from '@lib/cloudinary'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { getAuthUser } from '@middleware/auth'
import { getMaterialById, updateMaterial } from '@services/material'
import { deleteProduct, getOneProductById, updateProduct } from '@services/product'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformProduct } from '@utils/transform/product.transform'
import { UpdateProductDto, updateProductSchema } from '@utils/validation/product'
import mongoose from 'mongoose'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id

  const product = await getOneProductById(id)

  if (!product) {
    return errorResponse('Product not found', null, 404)
  }

  const transform = transformProduct(product)
  return sendResponse('Product successfully found', transform)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await getAuthUser(req)

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const formData = await req.formData()
  const productId = params.id
  const product = await getOneProductById(productId)

  if (!product) {
    return errorResponse('Product not found', null, 404)
  }

  const materialId = (formData.get('material') as string) || product.material
  const newYardStr = formData.get('yard')
  const newYard = newYardStr ? Number(newYardStr) : product.yard
  const material = await getMaterialById(materialId as string)

  if (!material) {
    return errorResponse('Material does not exist', null, 404)
  }

  // Handle yard adjustment
  const yardDifference = newYard - product.yard
  if (yardDifference > 0 && newYard > material.stock + product.yard) {
    return errorResponse('Insufficient material stock for yard increase', null, 400)
  }

  const images: string[] = [...product.images]
  // Upload new images
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
        if (images.length < 5) {
          images.push(uploadResult.data?.url || '')
        } else {
          images[0] = uploadResult.data?.url || ''
        }
      } catch (error) {
        console.error('Cloudinary upload error:', error)
        return errorResponse('Image upload failed', null, 500)
      }
    }
  }

  // Build update data
  const updateData: Partial<UpdateProductDto> = {
    name: (formData.get('name') as string) || product.name,
    description: (formData.get('description') as string) || product.description,
    category: (formData.get('category') as string) || product.category,
    category_type: (formData.get('category_type') as string) || product.category_type,
    material: materialId.toString(),
    yard: newYard,
    status: (formData.get('status') as 'in_stock' | 'out_of_stock') || product.status,
    images,
    s: JSON.parse(formData.get('s') as string) || product.s,
    m: JSON.parse(formData.get('m') as string) || product.m,
    l: JSON.parse(formData.get('l') as string) || product.l,
    xl: JSON.parse(formData.get('xl') as string) || product.xl,
    xxl: JSON.parse(formData.get('xxl') as string) || product.xxl,
    xxxl: JSON.parse(formData.get('xxxl') as string) || product.xxxl
  }

  const result = updateProductSchema.safeParse(updateData)
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
    const updatedProduct = await updateProduct(productId, result.data, session)

    if (!updatedProduct) {
      return errorResponse('Product could not be updated', null, 400)
    }

    if (yardDifference !== 0) {
      const newMaterialStock = material.stock - yardDifference
      await updateMaterial(material.id, { stock: newMaterialStock }, session)
    }

    await session.commitTransaction()
    session.endSession()

    const transform = transformProduct(updatedProduct)
    return sendResponse('Product updated successfully', transform, 200)
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Transaction error:', error)
    return errorResponse('Product update failed', null, 500)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const remove = await deleteProduct(id)

  if (!remove) {
    return errorResponse('Product could not be deleted', 404)
  }

  return sendResponse('Product deleted successfully')
}
