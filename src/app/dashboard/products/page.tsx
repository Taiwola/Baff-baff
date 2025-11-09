import Form from 'next/form'
import React, { Suspense } from 'react'
import { SearchIcon } from 'lucide-react'

import ProductsList from './_components/ProductsList'
import { FilterButton, Header } from '@components/features/dashboard'
import { Button, DashboardProductsSkeleton, Input } from '@components/ui'

import { getProducts } from '@actions/products.action'
import { Metadata } from 'next'

type Props = {
  searchParams: Promise<ProductQuery>;
}

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage and explore your products effectively.',
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = await searchParams
  const promise = getProducts(query)

  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Products'>
        <FilterButton />

        <Form action={'/dashboard/products'} replace className='flex-1 md:w-70'>
          <Input
            name='seach'
            placeholder="Search Product"
            aria-label="Search Product"
            isClearable={true}
            startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
          />
        </Form>

        <Button as={'link'} href={'/dashboard/products/new'} rounded='sm' className='w-full md:w-auto'>
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
