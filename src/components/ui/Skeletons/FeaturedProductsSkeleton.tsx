import React from 'react'
import MarketplaceProductsSkeleton from './MarketplaceProductsSkeleton'

export default function FeaturedProductsSkeleton() {
   return (
      <div className='w-full py-12 container mx-auto'>
         <h4 className="home-label mb-5 md:mb-12">
            featured products
         </h4>

         <MarketplaceProductsSkeleton />
      </div>
   )
}
