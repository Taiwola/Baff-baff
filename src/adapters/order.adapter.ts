import { IOrder } from '@models/order.model'
import { paginate } from '@utils/pagination'

export function adaptOrder(data: IOrder): Order {
  return {
    id: data.id,
    userId: data.userId?.toString(),
    reference: data.reference,
    total: data.total,
    deliveryFee: data.deliveryFee,
    status: data.status,
    items: data.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      fitting: item.fitting,
      size: item.size,
      measurements: item.measurements,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        category: item.product.category,
        type: item.product.type,
        images: item.product.images
      }
    })),
    shippingAddress: data.shippingAddress,
    createdAt: data.createdAt.toISOString()
  }
}

export function adaptOrders({ data, total, page, pageSize }: AdaptersOptions<IOrder[]>): Pagination<Order> {
  return paginate({ data: data.map(adaptOrder), total, page, pageSize })
}
