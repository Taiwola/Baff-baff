import Form from 'next/form'
import React, { Suspense } from 'react'
import { SearchIcon } from 'lucide-react'

import { Button, DashboardProductsSkeleton, Input } from '@components/ui'
import ProductsList from './_components/ProductsList'
import { FilterButton, Header } from '@components/features/dashboard'
import { getProducts } from '@actions/products.action'

type Props = {
  searchParams: Promise<ProductQuery>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = await searchParams
  const promise = getProducts(query)

  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Products'>
        <FilterButton />

        <Form action={'/dashboard/products'} replace className='w-[17.5rem]'>
          <Input
            name='seach'
            placeholder="Search Product"
            aria-label="Search Product"
            isClearable={true}
            startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
          />
        </Form>

        <Button as={'link'} href={'/dashboard/products/new'} rounded='sm'>
          Add Product
        </Button>

      </Header>

      {/* Page content */}
      <div className="w-full">
        <Suspense fallback={<DashboardProductsSkeleton />}>
          <ProductsList promise={promise} />
        </Suspense>
      </div>
    </div>
  )
}
