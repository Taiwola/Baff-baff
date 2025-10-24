'use client'

import React from 'react'
import { MoreVertical } from 'lucide-react'

import { Dropdown, Item } from '@components/ui';

type Props = {
   id: string
   onEditClick: (id: string) => void
   onDeleteClick: (id: string) => void
}

export default function ActionButton({ id, onEditClick, onDeleteClick }: Props) {
   function handleChange(item: Item) {
      if (item.key === 'delete') {
         onDeleteClick(id)
      } else {
         onEditClick(id)
      }
   }

   return (
      <Dropdown items={items} onChange={handleChange} markSelected={false}>
         <button className='icon-button flex items-center justify-center'>
            <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
         </button>
      </Dropdown>
   )
}

const items: Item[] = [
   { key: 'edit', value: 'Edit' },
   { key: 'delete', value: 'Delete', color: 'danger' },
]