import { IRegion } from '@models/region.model'

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

export function adaptRegions(data: IRegion[]): Region[] {
  return data.map(adaptRegion)
}
