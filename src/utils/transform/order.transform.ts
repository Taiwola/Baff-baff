import { Order } from '@index'
import { IOrder } from '@models/order.model'

export function transformOrder(data: IOrder): Order {
  return {
    id: data.id,
    datePlaced: data.datePlaced,
    deliveryFee: data.deliveryFee,
    subTotal: data.amount,
    totalAmount: data.totalAmount,
    deliveryZone: data.region,
    email: data.email,
    fullName: data.fullName,
    orderStatus: data.status,
    phoneNumber: data.phoneNumber,
    products: data.products.map((product) => {
      return {
        id: product.id,
        category: product.category,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        size: product.size
      }
    })
  }
}

export function transformOrders(data: IOrder[]): Order[] {
  return data.map(transformOrder)
}
