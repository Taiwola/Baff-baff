import { IOrder } from '@models/order.model'
import { paginate } from '@utils/pagination'

export function transformOrder(data: IOrder): Order {
  return {
    id: data.id,
    orderId: 'ORDER-' + data.id.substring(0, 5),
    date: data.datePlaced.toISOString(),
    deliveryFee: data.deliveryFee,
    subTotal: data.amount,
    totalAmount: data.totalAmount,
    deliveryZone: data.region,
    address: data.address,
    email: data.email,
    fullName: data.fullName,
    paymentStatus: data.paymentStatus,
    status: data.status,
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

export function transformOrders({ data, page, pageSize }: { data: IOrder[]; page: number; pageSize: number }): Pagination<Order> {
  return paginate({ data: data.map(transformOrder), page, pageSize })
}
