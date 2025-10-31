import 'server-only'
import { cookies } from 'next/headers'

import { IUser } from '@models/user.model'
import { createCart, deleteCart, getCartByFilter, syncItems, updateCart } from '@services/cart'

export async function mergeCart(user: IUser) {
  const cookieStore = await cookies()
  const guestCartId = cookieStore.get('guestCartId')?.value

  if (guestCartId) {
    const guestCart = await getCartByFilter({ _id: guestCartId })
    const userCart = (await getCartByFilter({ userId: user.id })) || (await createCart({ userId: user.id, items: [] }))
    const syncedCartItems = syncItems(userCart.items, guestCart?.items || [])
    await updateCart(userCart.id, { items: syncedCartItems })
    await deleteCart(guestCartId)
    cookieStore.delete('guestCartId')
  }
}
