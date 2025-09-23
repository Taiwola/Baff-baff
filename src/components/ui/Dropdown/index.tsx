'use client'

import React, { ReactNode, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@heroui/react'

export type Item = { key: string; value: string; color?: 'danger' }

type Props = {
   children: ReactNode
   items: Item[]
   onChange?: (selected: Item) => void 
   selectedKey?: string 
   markSelected?: boolean
}

export default function CustomDropdown({ children, items, onChange, selectedKey, markSelected = true }: Props) {
   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([selectedKey || '']))
   
   useEffect(() => {
      if (selectedKey) {
         setSelectedKeys(new Set([selectedKey]))
      }
   }, [selectedKey])

   const handleSelectionChange = (keys: Selection) => {
      setSelectedKeys(keys)
      if (onChange) {
         const key = Array.from(keys)[0]
         const selectedItem = items.find((item) => item.key === key)
         if (selectedItem) onChange(selectedItem)
      }
   }

   return (
      <Dropdown>
         <DropdownTrigger >
            {children}
         </DropdownTrigger>

         <DropdownMenu
            aria-label="Sorting Actions"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            className="bg-brand-light w-max max-w-[12.75rem] rounded-[1.25rem] border border-[#BCBCBC] overflow-hidden"
            itemClasses={{
               base: [
                  'py-3.5 px-4 text-base text-black transition-colors',
                  'hover:bg-brand-purple/10 hover:text-brand-purple text-sm',
               ],
               selectedIcon: `${markSelected ? '' : 'hidden'} text-brand-purple w-4 h-3`,
            }}
         >
            {items.map((item, idx) => (
               <DropdownItem
                  key={item.key}
                  classNames={{ selectedIcon: 'text-brand-purple w-4 h-3' }}
                  className={idx < items.length - 1 ? 'border-b border-[#BCBCBC]' : item.color ===  'danger' ? 'text-[#D22F27] hover:text-[#D22F27]' : ''}
               >
                  {item.value}
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   )
}