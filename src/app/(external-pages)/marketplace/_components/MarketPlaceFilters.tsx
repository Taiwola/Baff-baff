import React from 'react'

import TypeFilter from './TypeFilter'
import SortButton from './SortButton'
import SortDrawer from './SortDrawer'
import FilterDrawer from './FilterDrawer'

type Props = {
   type: ProductType
   sort?: ProductSortType
}

export default function MarketPlaceFilters({ type, sort }: Props) {
   return (
      <>
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
      </>
   )
}
