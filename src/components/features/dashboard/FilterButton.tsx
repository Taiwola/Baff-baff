'use client'

import React from 'react'
import { Dropdown, Item } from '@components/ui'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// type Item = { key: string; value: string }

export default function FilterButton() {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   function handleChange(item: Item) {
      if (item.key === 'clear') {
         const params = new URLSearchParams(searchParams.toString())
         params.delete('status')
         router.replace(`${pathname}?${params.toString()}`)
         return
      }

      const params = new URLSearchParams(searchParams.toString())
      params.set('status', item.key)
      router.replace(`${pathname}?${params.toString()}`)
   }

   return (
      <Dropdown items={items} onChange={handleChange}>
         <button className='w-8.5 h-8.5 border border-brand-dark icon-button rounded-[0.625rem] flex items-center justify-center'>
            <AdjustmentsHorizontalIcon className='w-4.5 h-4.5 text-brand-dark' />
         </button>
      </Dropdown>
   )
}

const items: Item[] = [
   { key: 'inStock', value: 'In Stock' },
   { key: 'outOfStock', value: 'Out of Stock' },
   { key: 'clear', value: 'Clear', color: 'danger' },
]
