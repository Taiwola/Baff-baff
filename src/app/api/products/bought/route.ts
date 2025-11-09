import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { getAllOrders } from '@services/order'
import { sendResponse } from '@utils/api-response'
import { adaptProduct } from '@adapters/product.adapter'
import { extractProductAttributesFromOrders, getRecommendedProducts } from '@utils/recommendation-helper'

export async function GET() {
  await dbConnect()
  const session = await verifySession()

  if (!session?.userId) {
    return sendResponse('Request successful', [])
  }

  const { orders } = await getAllOrders({})

  const { categories, productIds, productTypes } = extractProductAttributesFromOrders(orders)

  const recommendedProduct = await getRecommendedProducts(categories, productTypes, productIds)
  const response = recommendedProduct.map((p) => adaptProduct(p))
  return sendResponse('Request successful', response, 200)
}
