'use server'
import { getAuthUser } from '@middleware/auth'
import { createMaterial, getAllMaterials } from '@services/material'
import { sendResponse } from '@utils/response/api.response'
import { transformMaterial, transformMaterials } from '@utils/transform/material.transform'
import { CreateMaterialDto, createMaterialSchema } from '@utils/validation/material'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const authUser = await getAuthUser(req)

  if (authUser?.role !== 'admin') {
    return sendResponse(false, 'Forbidden', null, 403)
  }
  const body: CreateMaterialDto = await req.json()

  const result = createMaterialSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return sendResponse(false, 'Validation failed', validationErrors, 400)
  }

  const material = await createMaterial(body)
  const transform = transformMaterial(material)

  return sendResponse(true, 'Material created successfully', transform, 201)
}

export async function GET(req: NextRequest) {
  const authUser = await getAuthUser(req)
  if (authUser?.role !== 'admin') {
    return sendResponse(false, 'Forbidden', null, 403)
  }
  const materials = await getAllMaterials()
  const transforms = transformMaterials(materials)
  return sendResponse(true, 'Materials fetched successfully', transforms, 200)
}
