import React, { Suspense } from 'react'

import Count from './Count'
import { SortButton, Title } from '../../_components'
import { MarketplaceProductsSkeleton } from '@components/ui'
import { MarketPlaceProducts } from '@components/features/products'

type Props = {
   params: Promise<{ search: string }>
   searchParams: Promise<MaketplaceFilter>
}

export default async function SearchMarketplace({ params, searchParams }: Props) {
   const { search } = await params
   const { status = 'inStock', price, sort } = await searchParams

   return (
      <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
         <div className='w-full'>
            <div className='flex justify-start items-center font-montserrat'>
               <span className='text-brand-dark text-[1.375rem]'>{`Showing result for: ${" "}`}</span>
               <Title text={`"${decodeURIComponent(search)}"`} />
            </div>

            <div className='flex justify-between items-center'>
               <Suspense fallback={<div className="inline-block w-40 h-5 rounded bg-gray-200 animate-pulse" />}>
                  <Count filter={{ sort, status, price, search }} />
               </Suspense>
               <SortButton />
            </div>
         </div>

         <Suspense fallback={<MarketplaceProductsSkeleton />}>
            <MarketPlaceProducts filter={{ sort, status, price, search }} />
         </Suspense>
      </div>
   )
}
