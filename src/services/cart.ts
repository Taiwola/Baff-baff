import 'server-only'

import CartModel, { ICart, ICartItem } from '@models/cart.model'
import { CartDto } from '@validations/cart'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createCart(data: CartDto, session?: ClientSession): Promise<ICart> {
  const items = data.items.map((item) => ({ ...item, product: item.productId }))
  const Carts = new CartModel({ ...data, items })

  await Carts.save({ session })
  return await CartModel.populate(Carts, { path: 'items.product' })
}

export async function getAllCarts({ limit, page = 1, ...filter }: FilterQuery<CartFilter>): Promise<ICart[]> {
  const query = CartModel.find(filter).populate('items.product')

  if (limit) {
    const skip = (page - 1) * limit
    query.limit(limit).skip(skip)
  }

  return await query
}

export async function getOneCartById(id: string): Promise<ICart | null> {
  return await CartModel.findById(id).populate('items.product')
}

// this is not populated
export async function getCartById(id: string): Promise<ICart | null> {
  return await CartModel.findById(id)
}

export async function getCartByFilter(filter: FilterQuery<ICart>): Promise<ICart | null> {
  return await CartModel.findOne(filter).populate('items.product')
}

export async function updateCart(id: string, data: Partial<ICart>, session?: ClientSession): Promise<ICart | null> {
  const cart = await CartModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return await CartModel.populate(cart, { path: 'items.product' })
}

export async function deleteCart(id: string, session?: ClientSession): Promise<ICart | null> {
  return await CartModel.findByIdAndDelete(id, session)
}

export async function deleteManyCarts(filter: FilterQuery<ICart>, session?: ClientSession): Promise<{ deletedCount: number }> {
  const result = await CartModel.deleteMany(filter, { session })
  return { deletedCount: result.deletedCount }
}

export function mergeItems(existing: ICartItem[], incoming?: CartDto['items']): ICartItem[] {
  if (!incoming || incoming.length === 0) return existing

  const map = new Map(existing.map((it) => [getCartItemKey({ id: it.product.toString(), fitting: it.fitting, size: it.size }), it]))

  for (const item of incoming) {
    const key = getCartItemKey({ id: item.productId, size: item.size, fitting: item.fitting })
    map.set(key, { ...item, product: item.productId })
  }

  return Array.from(map.values())
}

export function syncItems(userItems: ICartItem[], guestItems?: ICartItem[]): ICartItem[] {
  if (!guestItems || guestItems.length === 0) return userItems

  const map = new Map(userItems.map((it) => [getCartItemKey({ id: it.product.toString(), fitting: it.fitting, size: it.size }), it]))

  for (const item of guestItems) {
    const key = getCartItemKey({ id: item.product.toString(), size: item.size, fitting: item.fitting })
    if (map.has(key)) {
      const foundItem = map.get(key)
      map.set(key, { ...item, quantity: item.quantity + (foundItem?.quantity || 0) })
    } else {
      map.set(key, item)
    }
  }

  return Array.from(map.values())
}

export function getCartItemKey({ id, fitting, size }: DistinctCartItem): string {
  return id + fitting + size
}
