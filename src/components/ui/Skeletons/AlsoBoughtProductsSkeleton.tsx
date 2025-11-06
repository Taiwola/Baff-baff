import React from 'react'
import MarketplaceProductsSkeleton from './MarketplaceProductsSkeleton'

export default async function AlsoBoughtProductsSkeleton() {
   return (
      <section className='w-full mt-12'>
         <h6 className='text-[1.125rem] mb-7.5 uppercase font-montserrat font-bold'>YOU also bought</h6>
         <MarketplaceProductsSkeleton length={4} />
      </section>
   )
}
