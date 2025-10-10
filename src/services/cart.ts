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

export async function getAllCarts(filter?: FilterQuery<CartFilter>): Promise<ICart[]> {
  return await CartModel.find(filter || {})
    .populate('items.product')
    .limit(filter?.limit)
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
  const Cart = await CartModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return Cart
}

export async function deleteCart(id: string): Promise<ICart | null> {
  return await CartModel.findByIdAndDelete(id)
}

export async function deleteManyCarts(filter: FilterQuery<ICart>, session?: ClientSession): Promise<{ deletedCount: number }> {
  const result = await CartModel.deleteMany(filter, { session })
  return { deletedCount: result.deletedCount }
}

export function mergeItems(existing: ICartItem[], incoming?: CartDto['items']): ICartItem[] {
  if (!incoming || incoming.length === 0) return existing

  const map = new Map(existing.map((it) => [it.product.toString(), it]))
  for (const item of incoming) {
    const id = item.productId
    if (map.has(id)) {
      map.get(id)!.quantity += item.quantity
      map.get(id)!.fitting = item.fitting
    } else map.set(id, { ...item, product: item.productId })
  }

  return Array.from(map.values())
}
