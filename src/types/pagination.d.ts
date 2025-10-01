interface Pagination<T> {
  items: T[]
  metadata: {
    totalItems: number
    currentPage: number
    pageSize: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

type PaginationOptions<T> = {
  data: T[]
  page?: number
  pageSize?: number
}
