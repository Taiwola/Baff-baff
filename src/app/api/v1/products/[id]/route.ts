import mongoose from 'mongoose'
import { NextRequest } from 'next/server'

import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { adaptProduct } from '@adapters/product.adapter'
import { updateProductSchema } from '@validations/product'
import { errorResponse, sendResponse } from '@utils/api-response'
import { getMaterialById, updateMaterial } from '@services/material'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { deleteProduct, getOneProductById, updateProduct } from '@services/product'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await getOneProductById(id)

  if (!product) {
    return errorResponse('Product not found', null, 404)
  }

  const transform = adaptProduct(product)
  return sendResponse('Product successfully found', transform)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userSession = await verifySession()

  const session = await mongoose.startSession()
  session.startTransaction()

  if (userSession?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const formData = await req.formData()
  const { id: productId } = await params

  const product = await getOneProductById(productId)

  if (!product) {
    return errorResponse('Product not found', null, 404)
  }

  const parsed = updateProductSchema.safeParse({
    name: formData.get('name') ?? product.name,
    description: formData.get('description') ?? product.description,
    category: formData.get('category') ?? product.category,
    status: formData.get('status') ?? product.status,
    type: formData.get('type') ?? product.type,
    materialId: formData.get('materialId') ?? product.material.toString(),
    yard: formData.get('yard') ?? product.yard,
    images: formData.getAll('images'),
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
    return errorResponse('Insufficient material stock for yard increase', null, 400)
  }

  try {
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

    const updatedProduct = await updateProduct(productId, result, session)

    if (!updatedProduct) {
      return errorResponse('Product could not be updated', null, 400)
    }

    if (result.yard !== product.yard) {
      const newMaterialStock =
        result.yard > product.yard ? material.stock - (result.yard - product.yard) : material.stock + (product.yard - result.yard)
      await updateMaterial(material.id, { stock: newMaterialStock }, session)
    }

    await session.commitTransaction()
    session.endSession()

    const transform = adaptProduct(updatedProduct)
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
