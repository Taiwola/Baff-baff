import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptCollaborator } from '@adapters/collaborator.adapter'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { parseCollaboratorFormData, updateCollaboratorSchema } from '@validations/collaborators'
import { deleteCollaborator, getCollaboratorById, updateCollaborator } from '@services/collaborator'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const collaborator = await getCollaboratorById(id)
  if (!collaborator) return errorResponse('collaborator not found', null, 404)

  const formData = await req.formData()

  const result = updateCollaboratorSchema.safeParse(parseCollaboratorFormData(formData))

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 422)
  }

  const image = result.data.image || collaborator.image

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

  const updated = await updateCollaborator(collaborator.id, result.data)
  if (!updated) return errorResponse('collaborator not found', null, 404)
  const response = adaptCollaborator(updated)
  return sendResponse('Success', response, 201)
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const collaborator = await getCollaboratorById(id)
  if (!collaborator) return errorResponse('collaborator not found', null, 404)

  const response = adaptCollaborator(collaborator)
  return sendResponse('Collaborators fetched successfully', response, 200)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const { id } = await params

  const collaborator = await getCollaboratorById(id)

  if (!collaborator) {
    return errorResponse('Collaborator not found', null, 404)
  }

  try {
    const deleted = await deleteCollaborator({ id: collaborator.id })
    if (!deleted) {
      return errorResponse('Collaborator could not be deleted', null, 500)
    }
    return sendResponse('Collaborator deleted successfully', null, 200)
  } catch (error) {
    console.error('Error deleting collaborator:', error)
    return errorResponse('Error deleting collaborator', null, 500)
  }
}
