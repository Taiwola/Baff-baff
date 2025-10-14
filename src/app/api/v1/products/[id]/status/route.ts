import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { adaptProduct } from '@adapters/product.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { getOneProductById, updateProduct } from '@services/product'
import { statusSchema } from '@validations/product/shared.validation'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
   await dbConnect()
  const { id: productId } = await params

  const userSession = await verifySession()
  if (userSession?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const product = await getOneProductById(productId)
  if (!product) return errorResponse('Product not found', null, 404)

  const body = await req.json()

  console.log('parsed', body)
  const parsed = statusSchema.safeParse(body.status)
  if (!parsed.success) {
    const validationErrors = parsed.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 422)
  }

  const updatedProduct = await updateProduct(productId, { status: parsed.data })
  if (!updatedProduct) return errorResponse(`${product.name} status could not be updated`, null, 400)

  const transform = adaptProduct(updatedProduct)
  return sendResponse('Product updated successfully', transform, 200)
}
