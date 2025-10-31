export function paginate<T>({ data, total, page, pageSize = 10 }: PaginationOptions<T>): Pagination<T> {
  const safePage = Math.max(1, page ?? 1)
  const safePageSize = Math.min(Math.max(1, pageSize), 100)

  const totalPages = Math.ceil(total / safePageSize)
  const hasPrevPage = safePage > 1
  const hasNextPage = safePage < totalPages

  return {
    items: data,
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
