import { ICategories } from '@models/categories.model'
import { paginate } from '@utils/pagination'

export function adaptCategory(data: ICategories): Category {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptCategories({ data, page, pageSize }: { data: ICategories[]; page: number; pageSize: number }): Pagination<Category> {
  return paginate({ data: data.map(adaptCategory), page, pageSize })
}
