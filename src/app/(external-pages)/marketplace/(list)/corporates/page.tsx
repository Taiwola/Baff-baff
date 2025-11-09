import React, { Suspense } from 'react'

import { MarketPlaceFilters, Title } from '../../_components'
import { MarketPlaceProducts } from '@components/features/products'
import { MarketplaceProductsSkeleton } from '@components/ui'
import { Metadata } from 'next'

type Props = {
  searchParams: Promise<MaketplaceFilter>
}

export const metadata: Metadata = {
  title: 'Marketplace - Corporates',
  description: 'Explore our diverse marketplace with a wide range of products to suit your needs.',
}

export default async function Corporates({ searchParams }: Props) {
   const { type = 'shirt', status = 'inStock', price, sort, design } = await searchParams

  return (
    <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
      <div className='w-full'>
        <Title text='Corporates' />
        <MarketPlaceFilters type={type} sort={sort} />
      </div>

      <Suspense fallback={<MarketplaceProductsSkeleton />}>
        <MarketPlaceProducts filter={{ type, sort, status, price, category: 'corporates', design }} />
      </Suspense>
    </div>
  )
}
