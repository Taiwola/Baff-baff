import { Region } from '@index'
import { IRegion } from '@models/region.model'

export function transformRegion(data: IRegion): Region {
  return {
    id: data.id,
    price: data.price,
    region: data.region,
    state: data.state,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformRegions(data: IRegion[]): Region[] {
  return data.map(transformRegion)
}
