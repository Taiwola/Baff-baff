import React, { Suspense } from 'react'

import { MarketPlaceFilters, Title } from '../_components'
import { MarketPlaceProducts } from '@components/features/products'
import { MarketplaceProductsSkeleton } from '@components/ui'


type Props = {
  searchParams: Promise<MaketplaceFilter>
}

export default async function MarketPlace({ searchParams }: Props) {
  const { type = 'shirt', status = 'inStock', price, sort, design } = await searchParams

  return (
    <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
      <div className='w-full'>
        <Title text='Market Place' />
        <MarketPlaceFilters type={type} sort={sort} />
      </div>

      <Suspense fallback={<MarketplaceProductsSkeleton />}>
        <MarketPlaceProducts filter={{ type, sort, status, price, design }} />
      </Suspense>
    </div>
  )
}


