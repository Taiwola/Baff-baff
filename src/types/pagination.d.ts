interface Pagination<T> {
  items: T[]
  metadata: PaginationMetadata
}

type PaginationMetadata = {
  totalItems: number
  currentPage: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type PaginationOptions<T> = {
  data: T[]
  total: number
  page?: number
  pageSize?: number
}

type PaginationParams = {
  page?: number | string
  limit?: number | string
}
