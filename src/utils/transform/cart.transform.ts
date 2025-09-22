import { Cart } from '@index'
import { ICart } from '@models/cart.model'
import mongoose from 'mongoose'

export function transformCart(data: ICart): Cart {
  return {
    id: data._id?.toString() || data.id,
    price: data.price,
    size: data.size,
    quantity: data.quantity,
    subtotal: data.price * parseInt(data.quantity),
    product:
      typeof data.product === 'string' || data.product instanceof mongoose.Types.ObjectId
        ? data.product.toString()
        : {
            id: data.product._id?.toString() || data.product.id,
            image: data.product.images[0],
            name: data.product.name
          },
    userId: data.userId,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt
  }
}

export function transformCarts(data: ICart[]): Cart[] {
  return data.map(transformCart)
}
