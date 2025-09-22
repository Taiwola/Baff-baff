import { Cart } from '@index'
import { ICart } from '@models/cart.model'

export function transformCart(data: ICart): Cart {
  return {
    id: data._id?.toString() || data.id,
    price: data.price,
    size: data.size,
    quantity: data.quantity,
    userId: data.userId,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt
  }
}

export function transformCarts(data: ICart[]): Cart[] {
  return data.map(transformCart)
}
