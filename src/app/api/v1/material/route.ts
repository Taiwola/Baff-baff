'use server'
import { uploadToCloudinary } from '@lib/cloudinary'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { getAuthUser } from '@middleware/auth'
import { createMaterial, getAllMaterials } from '@services/material'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformMaterial, transformMaterials } from '@utils/transform/material.transform'
import { CreateMaterialDto, createMaterialSchema } from '@utils/validation/material'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const authUser = await getAuthUser(req)

  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }
  const formData = await req.formData()

  const body: CreateMaterialDto = {
    name: formData.get('name') as string,
    stock: Number(formData.get('stock'))
  }

  const result = createMaterialSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const image = formData.get('image') as File

  if (image && image.size > 0) {
    const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)
    if (!validation.isValid) {
      return errorResponse('File validation failed', { errors: validation.errors }, 400)
    }
  }

  try {
    const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.MATERIALS)
    if (!uploadResult.success) {
      return errorResponse('Image upload failed', { error: uploadResult.error }, 500)
    }

    body.image = uploadResult.data?.url ?? ''
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return errorResponse('Image upload failed', null, 500)
  }

  const material = await createMaterial(body)
  const transform = transformMaterial(material)

  return sendResponse('Material created successfully', transform, 201)
}

export async function GET(req: NextRequest) {
  const authUser = await getAuthUser(req)
  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }
  const materials = await getAllMaterials()
  const transforms = transformMaterials(materials)
  return sendResponse('Materials fetched successfully', transforms, 200)
}
