'use client'
import React from 'react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@heroui/react'

export default function SortButton() {
   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(['']))

   const selectedValue = React.useMemo(() => {
      const key = Array.from(selectedKeys)[0] 
      return sortItems.find((item) => item.key === key)?.value ?? 'Sort By'
   }, [selectedKeys])

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
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="bg-brand-light w-[12.75rem] rounded-[1.25rem] border border-[#BCBCBC] overflow-hidden"
            itemClasses={{
               base: [
                  'py-3.5 px-4 text-base text-black transition-colors',
                  'hover:bg-brand-purple/10 hover:text-brand-purple',
               ],
               selectedIcon: 'text-brand-purple w-4 h-3',
            }}
         >
            {sortItems.map((item, idx) => (
               <DropdownItem
                  key={item.key}
                  classNames={{ selectedIcon: 'text-brand-purple w-4 h-3' }}
                  className={idx < sortItems.length - 1 ? 'border-b border-[#BCBCBC]' : ''}
               >
                  {item.value}
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   )
}

const sortItems = [
   { key: 'featured', value: 'Featured' },
   { key: 'best-selling', value: 'Best Selling' },
   { key: 'a-z', value: 'Alphabetically, A-Z' },
   { key: 'z-a', value: 'Alphabetically, Z-A' },
   { key: 'o-n', value: 'Date, Old to New' },
   { key: 'n-o', value: 'Date, New to Old' },
]
