import { ICart } from '@models/cart.model'

export function adaptCart(data: ICart): Cart {
  return {
    id: data._id?.toString() || data.id,
    price: data.price,
    size: data.size,
    quantity: data.quantity,
    subtotal: data.price * parseInt(data.quantity),
    product: {
      id: data.product._id?.toString() || data.product.id,
      images: data.product.images,
      name: data.product.name
    },
    userId: data.userId,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt
  }
}

export function adaptCarts(data: ICart[]): Cart[] {
  return data.map(adaptCart)
}
