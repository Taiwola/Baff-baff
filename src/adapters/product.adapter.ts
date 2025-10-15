import { paginate } from '@utils/pagination'
import { IProduct, ISizeDetails } from '@models/product.model'
import mongoose from 'mongoose'

export function adaptProduct(data: IProduct): Product {
  const collaborator = !data.collaborator || (typeof data.collaborator === 'string' || data.collaborator instanceof mongoose.Types.ObjectId) ? undefined : {
    id: data.collaborator.id,
    name: data.collaborator.name
  }

  return {
    id: data._id,
    slug: data.slug,
    images: data.images,
    category: data.category,
    type: data.type,
    design: data.design,
    yard: data.yard,
    description: data.description,
    name: data.name,
    sizes: {
      s: getSize(data.s),
      m: getSize(data.m),
      l: getSize(data.l),
      xl: getSize(data.xl),
      xxl: getSize(data.xxl),
      xxxl: getSize(data.xxxl),
    },
    collaborator,
    status: data.status,
    material: data.material.toString(),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString()
  }
}

export function adaptProducts({ data, page, pageSize }: AdaptersOptions<IProduct[]>): Pagination<Product> {
  const pagination = paginate({ data: data.map(adaptProduct), page, pageSize })
  return pagination
}

function getSize(s: ISizeDetails): SizeDetails {
  return {
    price: s.price,
    discountPrice: s.discountPrice,
    quantity: s.quantity
  }
}
