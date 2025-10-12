'use client'

import React, { useMemo } from 'react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, SharedSelection } from '@heroui/react'

import { sortItems } from '@lib/sorts'

type Props = {
   sort?: ProductSortType | ''
}

export default function SortButton({ sort = '' }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const selectedValue = useMemo(() => {
      return sortItems.find((item) => item.key === sort)?.value ?? 'Sort By'
   }, [sort])


   function handleChange(keys: SharedSelection) {
      const key = Array.from(keys)[0]
      const params = new URLSearchParams(searchParams.toString())
      if (key === 'clear') params.delete('sort')
      else params.set('sort', key.toString())
      router.replace(`${pathname}?${params.toString()}`)
   }

   return (
      <Dropdown>
         <DropdownTrigger>
            <button className="flex justify-start items-center gap-1 bg-none hover:bg-transparent cursor-pointer focus:outline-none">
               <Bars3BottomLeftIcon className="icon-button" />
               <small>{selectedValue}</small>
            </button>
         </DropdownTrigger>

         <DropdownMenu
            aria-label="Sorting Actions"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={new Set([sort])}
            onSelectionChange={handleChange}
            className="bg-brand-light w-[12.75rem] rounded-[1.25rem] border border-[#BCBCBC] no-scrollbar overflow-y-scroll h-[300px]"
            itemClasses={{
               base: [
                  'py-3.5 px-4 text-base text-black transition-colors',
                  'hover:bg-brand-purple/10 hover:text-brand-purple',
               ],
               selectedIcon: 'text-brand-purple w-4 h-3',
            }}
         >
            <>
               {sortItems.map((item) => (
                  <DropdownItem
                     key={item.key}
                     classNames={{ selectedIcon: 'text-brand-purple w-4 h-3' }}
                     className={'border-b border-[#BCBCBC]'}
                  >
                     {item.value}
                  </DropdownItem>
               ))}

               {/* Clear Sort */}
               <DropdownItem key="clear" className="text-red-600">
                  Clear Sort
               </DropdownItem>
            </>
         </DropdownMenu>
      </Dropdown>
   )
}
