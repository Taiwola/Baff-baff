import { IMaterial } from '@models/material.model'
import { paginate } from '@utils/pagination'

export function adaptMaterial(data: IMaterial): Material {
  return {
    id: data.id,
    name: data.name,
    stock: data.stock,
    image: data.image,
    status: data.stock > 0 ? 'In Stock' : 'Out of Stock',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptMaterials({ data, total , page, pageSize }: AdaptersOptions<IMaterial[]>): Pagination<Material> {
  return paginate({ data: data.map(adaptMaterial), total, page, pageSize })
}
