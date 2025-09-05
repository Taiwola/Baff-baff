import React from 'react'

import { Button } from '@components/ui'
import { SortButton, Title } from '../../_components'
import { MarketPlaceProducts } from '@components/features/products'

type Props = {
   params: Promise<{ search: string }>
}

export default async function SearchMarketplace({ params }: Props) {
   const { search } = await params

   return (
      <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
         <div className='w-full'>
            <div className='flex justify-start items-center font-montserrat'>
               <span className='text-brand-dark text-[1.375rem]'>{`Showing result for: ${" "}`}</span>
               <Title text={`"${decodeURIComponent(search)}"`} />
            </div>

            <div className='flex justify-between items-center'>
               <p className='text-md font-montserrat'>Found 16 matches</p>
               <SortButton />
            </div>
         </div>

         <MarketPlaceProducts />
      </div>
   )
}
