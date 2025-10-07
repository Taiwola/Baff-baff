import { adaptProduct } from '@adapters/product.adapter'
import { getProductByFilter } from '@services/product'
import { errorResponse, sendResponse } from '@utils/api-response'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const product = await getProductByFilter({ slug })
  if (!product) return errorResponse('Product not found', null, 404)

  const transform = adaptProduct(product)
  return sendResponse('Product successfully found', transform)
}
