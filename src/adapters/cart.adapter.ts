import { ICart } from '@models/cart.model'
import { paginate } from '@utils/pagination'
import mongoose from 'mongoose'

export function adaptCart(data: ICart): Cart {
  return {
    id: data.id,
    userId: data.userId?.toString(),
    items: data.items.map((item) => {
      if (typeof item.product === 'string' || item.product instanceof mongoose.Types.ObjectId) {
        throw new Error('product not populated')
      }

      return {
        id: item.product.id,
        name: item.product.name,
        product: {
          id: item.product.id,
          name: item.product.name,
          images: item.product.images,
          category: item.product.category,
          type: item.product.type
        },
        price: item.price,
        fitting: item.fitting,
        size: item.size,
        quantity: item.quantity,
        measurements: !item.measurements
          ? undefined
          : {
              arm: item.measurements.arm,
              chest: item.measurements.chest,
              length: item.measurements.length,
              neck: item.measurements.neck,
              shoulder: item.measurements.shoulder,
              sleeve: item.measurements.sleeve,
              knee: item.measurements.knee,
              lap: item.measurements.lap,
              trouserLength: item.measurements.trouserLength,
              waist: item.measurements.waist
            }
      }
    }),
    updatedAt: data.updatedAt.toISOString(),
    createdAt: data.createdAt.toISOString()
  }
}

export function adaptCarts({ data, page, pageSize }: AdaptersOptions<ICart[]>): Pagination<Cart> {
  return paginate({ data: data.map(adaptCart), page, pageSize })
}
