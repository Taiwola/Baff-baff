import { ICategoryType } from '@models/category.type.model'

export function adaptCategoryType(data: ICategoryType): CategoryType {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptCategoryTypes(data: ICategoryType[]): CategoryType[] {
  return data.map(adaptCategoryType)
}
