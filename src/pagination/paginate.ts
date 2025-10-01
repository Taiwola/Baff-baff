export function paginate<T>({ data, page = 1, pageSize = 10 }: { data: T[]; page?: number; pageSize?: number }): Pagination<T> {
  const safePage = Math.max(1, page)
  const safePageSize = Math.min(Math.max(1, pageSize), 100)

  const offset = (safePage - 1) * safePageSize

  const paginatedItems = data.slice(offset, offset + safePageSize)
  const totalRecords = data.length
  const totalPages = Math.ceil(totalRecords / safePageSize)
  const hasPrevPage = safePage > 1
  const hasNextPage = safePage < totalPages

  return {
    items: paginatedItems,
    metadata: {
      totalItems: totalRecords,
      totalPages: totalPages,
      currentPage: safePage,
      pageSize: safePageSize,
      hasNextPage,
      hasPrevPage
    }
  }
}
