import React from 'react'
import MarketplaceProductsSkeleton from './MarketplaceProductsSkeleton'

export default function MayLikeProductsSkeleton() {
   return (
      <section className='w-full'>
         <h6 className='text-[18px] mb-7.5'>YOU MAY ALSO LIKE</h6>
         <MarketplaceProductsSkeleton length={4} />
      </section>
   )
}
