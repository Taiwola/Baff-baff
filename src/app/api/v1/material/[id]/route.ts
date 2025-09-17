'use server'
import { uploadToCloudinary } from '@lib/cloudinary'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { getAuthUser } from '@middleware/auth'
import { deleteMaterial, getMaterialById, updateMaterial } from '@services/material'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { sendResponse } from '@utils/response/api.response'
import { transformMaterial } from '@utils/transform/material.transform'
import { UpdateMaterialDto, updateMaterialSchema } from '@utils/validation/material'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  if (authUser?.role !== 'admin') {
    return sendResponse(false, 'Forbidden', null, 403)
  }

  const material = await getMaterialById(params.id)
  if (!material) {
    return sendResponse(false, 'Material not found', null, 404)
  }
  const transform = transformMaterial(material)
  return sendResponse(true, 'Material fetched successfully', transform, 200)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  if (authUser?.role !== 'admin') {
    return sendResponse(false, 'Forbidden', null, 403)
  }
  const id = await params.id

  const formData = await req.formData()

  const body: UpdateMaterialDto = {
    name: (formData.get('name') as string) || undefined,
    stock: Number(formData.get('stock')) || undefined
  }

  const result = updateMaterialSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return sendResponse(false, 'Validation failed', validationErrors, 400)
  }

  try {
    const material = await getMaterialById(id)

    if (!material) {
      return sendResponse(false, 'Material not found', null, 404)
    }

    if (formData.get('image') !== null) {
      const image = formData.get('image') as File
      console.log('Image file:', image)

      if (image && image.size > 0) {
        const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)
        if (!validation.isValid) {
          return sendResponse(false, 'File validation failed', { errors: validation.errors }, 400)
        }
      }

      const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.MATERIALS)
      if (!uploadResult.success) {
        return sendResponse(false, 'Image upload failed', { error: uploadResult.error }, 500)
      }

      body.image = uploadResult.data?.url ?? ''
      console.log('Uploaded image URL:', body.image)
    }

    const update = await updateMaterial(material.id, body)
    if (!update) {
      return sendResponse(false, 'Material not found after update', null, 404)
    }
    const transform = transformMaterial(update)

    return sendResponse(true, 'Material updated successfully', transform, 200)
  } catch (error) {
    console.error('Error updating material:', error)
    return sendResponse(false, 'Error updating material', null, 500)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await getAuthUser(req)
  if (authUser?.role !== 'admin') {
    return sendResponse(false, 'Forbidden', null, 403)
  }
  const id = await params.id
  const material = await getMaterialById(id)
  if (!material) {
    return sendResponse(false, 'Material not found', null, 404)
  }
  try {
    const deleted = await deleteMaterial(material.id)
    if (!deleted) {
      return sendResponse(false, 'Material could not be deleted', null, 500)
    }
    return sendResponse(true, 'Material deleted successfully', null, 200)
  } catch (error) {
    console.error('Error deleting material:', error)
    return sendResponse(false, 'Error deleting material', null, 500)
  }
}
