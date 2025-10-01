import { ICategoryType } from '@models/category.type.model'
import { paginate } from '@utils/pagination'

export function adaptCategoryType(data: ICategoryType): CategoryType {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptCategoryTypes({ data, page, pageSize }: { data: ICategoryType[]; page: number; pageSize: number }): Pagination<CategoryType> {
  return paginate({ data: data.map(adaptCategoryType), page, pageSize })
}
