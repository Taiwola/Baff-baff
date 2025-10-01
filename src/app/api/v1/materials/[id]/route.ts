import { NextRequest } from 'next/server'

import { verifySession } from '@lib/dal'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'
import { adaptMaterial } from '@adapters/material.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { UpdateMaterialDto, updateMaterialSchema } from '@validations/material'
import { deleteMaterial, getMaterialById, updateMaterial } from '@services/material'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const material = await getMaterialById(params.id)
  if (!material) {
    return errorResponse('Material not found', null, 404)
  }
  const transform = adaptMaterial(material)
  return sendResponse('Material fetched successfully', transform, 200)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const { id } = await params

  const material = await getMaterialById(id)

  if (!material) {
    return errorResponse('Material not found', null, 404)
  }

  const formData = await req.formData()

  const body: UpdateMaterialDto = {
    name: String(formData.get('name')) || material.name,
    stock: Number(formData.get('stock')) || material.stock,
    image: material.image
  }

  const result = updateMaterialSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }

  try {
    const image = formData.get('image')

    if (image !== null && image instanceof File && image.size > 0) {
      const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)

      if (!validation.isValid) {
        return errorResponse('File validation failed', { errors: validation.errors }, 400)
      }

      const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.MATERIALS)

      if (!uploadResult.success) {
        return errorResponse('Image upload failed', { error: uploadResult.error }, 500)
      }

      body.image = uploadResult.data?.url || material.image
    }

    const update = await updateMaterial(material.id, body)

    if (!update) {
      return errorResponse('Material not found after update', null, 404)
    }
    
    const transform = adaptMaterial(update)

    return sendResponse('Material updated successfully', transform, 200)
  } catch (error) {
    console.error('Error updating material:', error)
    return errorResponse('Error updating material', null, 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const { id } = await params

  const material = await getMaterialById(id)

  if (!material) {
    return errorResponse('Material not found', null, 404)
  }

  try {
    const deleted = await deleteMaterial(material.id)
    if (!deleted) {
      return errorResponse('Material could not be deleted', null, 500)
    }
    return sendResponse('Material deleted successfully', null, 200)
  } catch (error) {
    console.error('Error deleting material:', error)
    return errorResponse('Error deleting material', null, 500)
  }
}
