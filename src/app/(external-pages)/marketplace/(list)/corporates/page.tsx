import React from 'react'

import { MarketPlaceFilters, Title } from '../../_components'
import { MarketPlaceProducts } from '@components/features/products'

type Props = {
  searchParams: Promise<MaketplaceFilter>
}

export default async function Corporates({ searchParams }: Props) {
   const { type = 'shirt', status = 'inStock', price, sort, design } = await searchParams

  return (
    <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
      <div className='w-full'>
        <Title text='Corporates' />
        <MarketPlaceFilters type={type} sort={sort} />
      </div>

      <MarketPlaceProducts filter={{ type, sort, status, price, category: 'corporates', design }} />
    </div>
  )
}
