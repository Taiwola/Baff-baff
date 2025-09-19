import { ICategories } from '@models/categories.model'

export function transformCategory(data: ICategories): Category {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformCategories(data: ICategories[]): Category[] {
  return data.map(transformCategory)
}
