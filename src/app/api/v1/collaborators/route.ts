import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'
import { errorResponse, sendResponse } from '@utils/api-response'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { createCollaborator, getAllCollaborators } from '@services/collaborator'
import { adaptCollaborator, adaptCollaborators } from '@adapters/collaborator.adapter'
import { collaboratorQueryFilterQuery, createCollaboratorSchema, parseCollaboratorFormData } from '@validations/collaborators'

export async function POST(req: NextRequest) {
  await dbConnect()

  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const formData = await req.formData()

  const result = createCollaboratorSchema.safeParse(parseCollaboratorFormData(formData))

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 422)
  }

  const image = result.data.image

  if (image && image instanceof File) {
    const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)

    if (!validation.isValid) {
      return errorResponse('File validation failed', { errors: validation.errors }, 400)
    }

    try {
      const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.COLLABORATORS)

      if (!uploadResult.success) {
        return errorResponse('Image upload failed', { error: uploadResult.error }, 500)
      }

      result.data.image = uploadResult.data?.url ?? ''
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      return errorResponse('Image upload failed', null, 500)
    }
  }

  const collaborator = await createCollaborator(result.data)
  const response = adaptCollaborator(collaborator)
  return sendResponse('Success', response, 201)
}

export async function GET(req: NextRequest) {
  await dbConnect()
  const auth = await verifySession()
  const { searchParams } = new URL(req.url)

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const parsed = collaboratorQueryFilterQuery.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    search: searchParams.get('search')
  })

  const queries = parsed.data

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  const filters: Record<string, unknown> = {
    skip: (page - 1) * pageSize,
    limit: pageSize
  }

  if (queries?.search) {
    filters.name = { $regex: queries.search, $options: 'i' }
  }

  const collaborators = await getAllCollaborators(filters)
  const response = adaptCollaborators({ data: collaborators, page, pageSize })

  return sendResponse('Materials fetched successfully', response, 200)
}
