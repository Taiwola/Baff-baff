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
