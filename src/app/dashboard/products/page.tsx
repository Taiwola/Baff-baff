import React from 'react'
import { SearchIcon } from 'lucide-react'

import { Button, Input } from '@components/ui'
import ProductsList from './_components/ProductsList'
import { FilterButton, Header } from '@components/features/dashboard'

export default function ProductsPage() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Products'>
        <FilterButton />

        <div className='w-[17.5rem]'>
          <Input
            name='seach'
            placeholder="Search Product"
            aria-label="Search Product"
            startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <Button as={'link'} href={'/dashboard/products/new'} rounded='sm'>
          Add Product
        </Button>

      </Header>

      {/* Page content */}
      <div className="w-full">
        <ProductsList />
      </div>
    </div>
  )
}
