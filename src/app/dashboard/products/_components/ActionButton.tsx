import React from 'react'
import { MoreVertical } from 'lucide-react'

import { Dropdown, Item } from '@components/ui';

type Props = {
   id: string
   status: ProductStatus
}

export default function ActionButton({ status }: Props) {

   function handleChange() {

   }

   return (
      <>
         <Dropdown items={items} onChange={handleChange} defaultSelectedKeys={[status]}>
            <button className="p-1 hover:bg-gray-100 rounded w-6 h-6 flex justify-center items-center"
            >
               <MoreVertical className="icon-button w-5 h-5 text-black" />
            </button>
         </Dropdown>
      </>
   )
}

const items: Item[] = [
   { key: 'inStock', value: 'In stock' },
   { key: 'outOfStock', value: 'Out of stock' },
]
