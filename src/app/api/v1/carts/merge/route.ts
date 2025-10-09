import { cookies } from 'next/headers'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { errorResponse, sendResponse } from '@utils/api-response'
import { createCart, getCartByFilter, getOneCartById, updateCart } from '@services/cart'

export async function POST(req: Request) {
  await dbConnect()

  const cookieStore = await cookies()
  const session = await verifySession()

  if (!session || !session.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const guestCartId = cookieStore.get('guestCartId')?.value
  if (!guestCartId) return sendResponse('No guest cart')

  const guestCart = await getOneCartById(guestCartId)
  if (!guestCart) {
    // clear cookie
    cookieStore.delete('guestCartId')
    return sendResponse('ok')
  }

  let userCart = await getCartByFilter({ userId: session.userId })
  if (!userCart) {
    userCart = await createCart({ userId: session.userId, items: guestCart.items.map((i) => ({ ...i, productId: i.productId.toString() })) })
  } else {
    // merge
    const map = new Map(userCart.items.map((i) => [i.productId.toString(), i]))
    for (const it of guestCart.items) {
      const id = it.productId.toString()
      map.set(id, { ...map.get(id), ...it })
    }
    userCart.items = Array.from(map.values())
    userCart = await updateCart(userCart.id, { items: userCart.items })
  }
  // delete guest cart
  await guestCart.deleteOne()
  cookieStore.delete('guestCartId')
  return sendResponse('ok')
}
