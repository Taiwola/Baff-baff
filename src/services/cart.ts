'use server'
import CartModel, { ICart, ICartItem } from '@models/cart.model'
import { CartDto } from '@validations/cart'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createCart(data: CartDto, session?: ClientSession): Promise<ICart> {
  const Carts = new CartModel({
    ...data
  })

  await Carts.save({ session })
  return Carts
}

export async function getAllCarts(filter?: FilterQuery<CartFilter>): Promise<ICart[]> {
  return await CartModel.find(filter || {})
    .populate('product')
    .limit(filter?.limit)
}

export async function getOneCartById(id: string): Promise<ICart | null> {
  return await CartModel.findById(id).populate('product')
}

export async function getCartByFilter(filter: FilterQuery<ICart>): Promise<ICart | null> {
  return await CartModel.findOne(filter).populate('product')
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

export function mergeItems(existing: ICartItem[], incoming?: ICartItem[]): ICartItem[] {
  if (!incoming || incoming.length === 0) return existing

  const map = new Map(existing.map((it) => [it.productId.toString(), it]))
  for (const item of incoming) {
    const id = item.productId.toString()
    if (map.has(id)) {
      map.get(id)!.quantity += item.quantity
      map.get(id)!.fitting = item.fitting
    } else map.set(id, item)
  }

  return Array.from(map.values())
}
