import { IRegion } from '@models/region.model'
import { paginate } from '@utils/pagination'

export function adaptRegion(data: IRegion): Region {
  return {
    id: data.id,
    price: data.price,
    region: data.region,
    state: data.state,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptRegions({ data, page, pageSize }: AdaptersOptions<IRegion[]>): Pagination<Region> {
  return paginate({ data: data.map(adaptRegion), page, pageSize })
}
