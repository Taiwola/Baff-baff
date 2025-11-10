import dbConnect from '@lib/database'
import { cookies } from 'next/headers'
import { verifySession } from '@lib/dal'
import { ICartItem } from '@models/cart.model'
import { sendResponse } from '@utils/api-response'
import { adaptProduct } from '@adapters/product.adapter'
import { getAllCarts, getOneCartById } from '@services/cart'
import { extractProductAttributesFromCart, getRecommendedProducts } from '@utils/recommendation-helper'

export async function GET() {
  await dbConnect()

  const session = await verifySession()
  const cookieStore = await cookies()
  const guestCartId = cookieStore.get('guestCartId')?.value

  const cartItems: ICartItem[] = []

  if (session?.userId) {
    const { carts } = await getAllCarts({ userId: session.userId })
    cartItems.push(...carts.flatMap((cart) => cart.items))
  } else if (guestCartId) {
    const cart = await getOneCartById(guestCartId)
    cartItems.push(...(cart?.items || []))
  }

  const { categories, productTypes, productIds } = await extractProductAttributesFromCart(cartItems)
  const recommendedProducts = await getRecommendedProducts(categories, productTypes, productIds)
  const response = recommendedProducts.map((p) => adaptProduct(p))
  return sendResponse('Request successfull', response, 200)
}
