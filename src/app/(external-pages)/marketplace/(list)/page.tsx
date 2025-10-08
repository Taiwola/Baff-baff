import React from 'react'

import { MarketPlaceProducts } from '@components/features/products'
import { FilterDrawer, SortButton, SortDrawer, Title, TypeFilter } from '../_components'


type Props = {
  searchParams: Promise<MaketplaceFilter>
}

export default async function MarketPlace({ searchParams }: Props) {
  const { type = 'shirt', status = 'inStock', price, sort } = await searchParams

  return (
    <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
      <div className='w-full'>
        <Title text='Market Place' />

        {/* Desktop */}
        <div className='hidden md:flex justify-between items-center'>
          <div>
            <TypeFilter defaultType={type} />
            <p className='uppercase text-sm'>Stand out and look goods rocking top quality work shirts.</p>
          </div>

          <SortButton sort={sort} />
        </div>

        {/* Mobile */}
        <div className='md:hidden'>
          <p className='uppercase text-sm'>Stand out and look goods rocking top quality work shirts.</p>

          <div className='flex items-center py-7.5'>
            <FilterDrawer />
            <SortDrawer sort={sort} />
          </div>
        </div>
      </div>

      <MarketPlaceProducts type={type} />
    </div>
  )
}


