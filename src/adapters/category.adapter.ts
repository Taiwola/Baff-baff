import { ICategories } from '@models/categories.model'

export function adaptCategory(data: ICategories): Category {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptCategories(data: ICategories[]): Category[] {
  return data.map(adaptCategory)
}
