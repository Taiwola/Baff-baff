import { IRegion } from '@models/region.model'
import { paginate } from '@utils/pagination'

export function adaptRegion(data: IRegion): Region {
  return {
    id: data.id,
    price: data.price,
    city: data.city,
    state: data.state,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptRegions({ data, total, page, pageSize }: AdaptersOptions<IRegion[]>): Pagination<Region> {
  return paginate({ data: data.map(adaptRegion), total, page, pageSize })
}
