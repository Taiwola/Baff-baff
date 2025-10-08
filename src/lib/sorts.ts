type SortItem = {
   key: ProductSortType
   value: string
}

export const sortItems: Array<SortItem> = [
   { key: 'featured', value: 'Featured' },
   { key: 'best-selling', value: 'Best Selling' },
   { key: 'a-z', value: 'Alphabetically, A-Z' },
   { key: 'z-a', value: 'Alphabetically, Z-A' },
   { key: 'o-n', value: 'Date, Old to New' },
   { key: 'n-o', value: 'Date, New to Old' },
]