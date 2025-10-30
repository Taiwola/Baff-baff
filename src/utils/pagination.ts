export function paginate<T>({ data, total, page = 1, pageSize = 10 }: PaginationOptions<T>): Pagination<T> {
  const safePage = Math.max(1, page)
  const safePageSize = Math.min(Math.max(1, pageSize), 100)

  const offset = (safePage - 1) * safePageSize

  const paginatedItems = data.slice(offset, offset + safePageSize)
  const totalPages = Math.ceil(total / safePageSize)
  const hasPrevPage = safePage > 1
  const hasNextPage = safePage < totalPages

  return {
    items: paginatedItems,
    metadata: {
      totalItems: total,
      totalPages: totalPages,
      currentPage: safePage,
      pageSize: safePageSize,
      hasNextPage,
      hasPrevPage
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyMetaData: Pagination<any> = {
  items: [],
  metadata: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 1,
    hasNextPage: false,
    hasPrevPage: false
  }
}
