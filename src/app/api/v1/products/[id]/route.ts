import mongoose from 'mongoose'
import { NextRequest } from 'next/server'

import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { parseProductForm } from '@utils/formatting'
import { adaptProduct } from '@adapters/product.adapter'
import { updateProductSchema } from '@validations/product'
import { errorResponse, sendResponse } from '@utils/api-response'
import { getMaterialById, updateMaterial } from '@services/material'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { deleteProduct, getOneProductById, updateProduct } from '@services/product'

const isLocal = process.env.NODE_ENV !== 'production'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  const userSession = await verifySession()
  if (userSession?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const product = await getOneProductById(id)
  if (!product) return errorResponse('Product not found', null, 404)

  const transform = adaptProduct(product)
  return sendResponse('Product successfully found', transform)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id: productId } = await params

  const userSession = await verifySession()
  if (userSession?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const session = isLocal ? undefined : await mongoose.startSession()
  if (session) session.startTransaction()

  const product = await getOneProductById(productId)
  if (!product) return errorResponse('Product not found', null, 404)

  try {
    const formData = await req.formData()

    const parsedValues = parseProductForm(formData)
    const parsed = updateProductSchema.safeParse(parsedValues)

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

    // positive value ( > 0) means there is an increment in product's yard
    // negative value ( < 0 ) means there is a decreament in product's yard
    // 0 means no change
    const differenceInYard = result.yard - product.yard

    //change in material
    if (result.materialId.toString() !== product.material.toString() && result.yard > material.stock) {
      return errorResponse('Insufficient material stock for yard increase', null, 400)
    }

    // Admin is increasing the yard of producr
    else if (differenceInYard > 0 && differenceInYard > material.stock) {
      return errorResponse('Insufficient material stock for yard increase', null, 400)
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

    const updatedProduct = await updateProduct(productId, result, session)
    if (!updatedProduct) return errorResponse('Product could not be updated', null, 400)

    if (result.materialId.toString() !== product.material.toString()) {
      const newMaterialStock = material.stock - result.yard
      await updateMaterial(material.id, { stock: newMaterialStock }, session)
    } else if (differenceInYard > 0) {
      const newMaterialStock = material.stock - differenceInYard
      await updateMaterial(material.id, { stock: newMaterialStock }, session)
    } else if (differenceInYard < 0) {
      const newMaterialStock = material.stock + (product.yard - result.yard)
      await updateMaterial(material.id, { stock: newMaterialStock }, session)
    }

    if (session) await session.commitTransaction()
    if (session) session.endSession()

    const transform = adaptProduct(updatedProduct)
    return sendResponse('Product updated successfully', transform, 200)
  } catch (error) {
    if (session) await session.abortTransaction()
    if (session) session.endSession()
    console.error('Transaction error:', error)
    return errorResponse('Product update failed', null, 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  const remove = await deleteProduct(id)
  if (!remove) return errorResponse('Product could not be deleted', 404)

  return sendResponse('Product deleted successfully')
}
