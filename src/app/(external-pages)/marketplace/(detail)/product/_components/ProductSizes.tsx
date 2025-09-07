'use client'

import React, { useState } from 'react'
import { Listbox, ListboxItem, Selection } from '@heroui/react'

type ListBoxWrapperType = {
   children: React.ReactNode
}
const ListboxWrapper = ({ children }: ListBoxWrapperType) => (
   <div className="w-full h-auto flex justify-start items-center">
      {children}
   </div>
)

const items = [
   { key: 'xxl', label: 'XXL' },
   { key: 'xl', label: 'XL' },
   { key: 'l', label: 'L' },
   { key: 'm', label: 'M' },
   { key: 's', label: 'S' },
]

export default function ProductSizes() {
   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['m'])) // default M selected

   return (
      <ListboxWrapper>
         <Listbox
            aria-label="Sizes"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            disallowEmptySelection // ensures one is always selected
            selectionMode="single" // single select
            classNames={{
               base: 'flex flex-row gap-3',
               list: 'flex flex-row gap-3',
            }}
         >
            {items.map((item) => (
               <ListboxItem
                  key={item.key}
                  classNames={{
                     base: 'flex justify-center items-center',
                     wrapper: 'flex justify-center items-center',
                     description: 'hidden',
                     selectedIcon: 'hidden',
                  }}
                  className="w-[3.125rem] h-[2.5rem] text-black border border-foreground cursor-pointer hover:bg-gray-100 data-[selected=true]:border-brand-dark"
               >
                  <span className="w-full flex justify-center items-center">
                     {item.label}
                  </span>
               </ListboxItem>
            ))}
         </Listbox>
      </ListboxWrapper>
   )
}
