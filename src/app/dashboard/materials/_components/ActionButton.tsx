import { MoreVertical } from 'lucide-react'
import { useDisclosure } from '@heroui/react';
import React, { useActionState, useEffect, useMemo } from 'react'

import { useToast } from '@hooks/useToast';
import { Dropdown, Item } from '@components/ui';
import { DeleteModal } from '@components/ui/Modals';
import MaterialFormModal from './MaterialFormModal';
import { UpdateMaterialFormState } from '@validations/material';
import { deleteMaterial, updateMaterial } from '@actions/materials.action';

type Props = {
   material: Material
}

export default function ActionButton({ material }: Props) {
   const toast = useToast()
   const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onChangeDelete, onOpen: onOpenDelete } = useDisclosure()
   const { isOpen: isOpenEdit, onClose: onCloseEdit, onOpenChange: onChangeEdit, onOpen: onOpenEdit } = useDisclosure()

   function handleChange(item: Item) {
      if (item.key === 'delete') {
         onOpenDelete()
      } else {
         onOpenEdit()
      }
   }

   const initialState: UpdateMaterialFormState = useMemo(() => ({
      errors: {},
      error: '',
      values: {
         name: material.name,
         stock: material.stock,
         image: material.image
      }
   }), [material])

   const updateMaterialWithId = updateMaterial.bind(null, material.id)

   const [{ error, errors, values }, action, pending] = useActionState(updateMaterialWithId, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [toast, error])

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
            onConfirm={deleteMaterial.bind(null, material.id)}
            onClose={onCloseDelete}
         />

         <MaterialFormModal
            id={material.id}
            initialState={values}
            errors={errors}
            pending={pending}
            action={action}
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
