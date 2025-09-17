'use server'
import { getAuthUser } from '@middleware/auth'
import { deleteMaterial, getMaterialById, updateMaterial } from '@services/material'
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

  const body: UpdateMaterialDto = await req.json()

  const result = updateMaterialSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return sendResponse(false, 'Validation failed', validationErrors, 400)
  }

  try {
    const material = await getMaterialById(params.id)

    if (!material) {
      return sendResponse(false, 'Material not found', null, 404)
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
