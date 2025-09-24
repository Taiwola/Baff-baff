import React from 'react'
import { MoreVertical } from 'lucide-react'
import { useDisclosure } from '@heroui/react';

import { Dropdown, Item } from '@components/ui';
import { DeleteModal } from '@components/ui/Modals';
import MaterialFormModal from './MaterialFormModal';

type Props = {
   id: string
}

export default function ActionButton({ }: Props) {
   const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onChangeDelete, onOpen: onOpenDelete } = useDisclosure()
   const { isOpen: isOpenEdit, onClose: onCloseEdit, onOpenChange: onChangeEdit, onOpen: onOpenEdit } = useDisclosure()

   function handleChange(item: Item) {
      if (item.key === 'delete') {
         onOpenDelete()
      } else {
         onOpenEdit()
      }
   }

   return (
      <>
         <Dropdown items={items} onChange={handleChange} markSelected={false}>
            <button className='icon-button flex items-center justify-center'>
               <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
            </button>
         </Dropdown>

         <DeleteModal
            isOpen={isOpenDelete}
            confirm='Are you sure you want to delete this Material?'
            onOpenChange={onChangeDelete}
            btnCloseTxt='No'
            btnConfirmTxt='Yes'
            onClose={onCloseDelete}
         />

         <MaterialFormModal
            type='edit'
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            onOpenChange={onChangeEdit}
         />
      </>
   )
}

const items: Item[] = [
   { key: 'edit', value: 'Edit Material' },
   { key: 'delete', value: 'Delete', color: 'danger' },
]
