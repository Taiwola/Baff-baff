'use client'

import React from 'react'
import { Dropdown } from '@components/ui'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'

type Item = { key: string; value: string }

export default function FilterButton() {
   function handleChange(item: Item) {
      console.log(item);
   }

   return (
      <Dropdown items={items} onChange={handleChange}>
         <button className='w-8.5 h-8.5 border border-brand-dark icon-button rounded-[0.625rem] flex items-center justify-center'>
            <AdjustmentsHorizontalIcon className='w-4.5 h-4.5 text-brand-dark' />
         </button>
      </Dropdown>
   )
}

const items = [
   { key: 'inStock', value: 'In Stock' },
   { key: 'outOfStock', value: 'Out of Stock' },
]
