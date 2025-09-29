import { CategoryType } from '@index'
import { ICategoryType } from '@models/category.type.model'

export function transformCategoryType(data: ICategoryType): CategoryType {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformCategoryTypes(data: ICategoryType[]): CategoryType[] {
  return data.map(transformCategoryType)
}
