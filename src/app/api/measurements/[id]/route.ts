'use server'

import { deleteMeasurement, getOneMeasurementById, updateMeasurement } from '@services/measurement'
import { errorResponse, sendResponse } from '@utils/api-response'
import { transformMeasurement } from '@adapters/measurement.adapter'
import { updateMeasurementSchema } from '@validations/measurement'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect()
  const id = (await params).id

  const body = await req.json()

  const result = updateMeasurementSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }

  const measurement = await getOneMeasurementById(id)

  if (!measurement) {
    return errorResponse('Measurement does not exist', null, 404)
  }

  try {
    const update = await updateMeasurement(measurement.id, result.data)

    if (!update) {
      return errorResponse('Measurement failed to update', null, 400)
    }

    return sendResponse('Measurement updated', update)
  } catch (error) {
    console.error('Error updating Measurement', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET(__req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect()
  const id = (await params).id
  const measurement = await getOneMeasurementById(id)

  if (!measurement) {
    return errorResponse('Measurement does not exist', null, 404)
  }

  const transfromData = transformMeasurement(measurement)

  return sendResponse('Measurement found', transfromData, 200)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  try {
    await deleteMeasurement(id)
    return sendResponse('Measurement deleted successfully')
  } catch (error) {
    console.error('Error deleting Measurement', error)
    return errorResponse('Internal server error')
  }
}
