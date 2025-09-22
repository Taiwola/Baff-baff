'use server'
import CartModel, { ICart } from '@models/cart.model'
import { CreateCartDto, UpdateCartDto } from '@utils/validation/cart'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createCart(data: CreateCartDto, session?: ClientSession): Promise<ICart> {
  const Carts = new CartModel({
    ...data
  })

  await Carts.save({ session })
  return Carts
}

export async function getAllCarts(filter?: FilterQuery<ICart>): Promise<ICart[]> {
  return await CartModel.find(filter || {}).populate('product')
}

export async function getOneCartById(id: string): Promise<ICart | null> {
  return await CartModel.findById(id).populate('product')
}

export async function getCartByFilter(filter: FilterQuery<ICart>): Promise<ICart | null> {
  return await CartModel.findOne(filter).populate('product')
}

export async function updateCart(id: string, data: UpdateCartDto, session?: ClientSession): Promise<ICart | null> {
  const Cart = await CartModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return Cart
}

export async function deleteCart(id: string): Promise<ICart | null> {
  return await CartModel.findByIdAndDelete(id)
}
