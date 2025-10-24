"use client";

import React, { use, useState } from "react";
import { Chip, useDisclosure } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

import ActionButton from "./ActionButton";
import EditMaterial from "./EditMaterial";
import { DataTable } from "@components/layouts";
import { DeleteModal } from "@components/ui/Modals";
import { deleteMaterial } from "@actions/materials.action";

type Props = {
   promise: Promise<Pagination<Material>>
}

export default function MaterialsList({ promise }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const materials = use(promise)
   const [activeMaterial, setActiveMaterial] = useState<Material | null>(null)
   const { isOpen: isOpenEdit, onOpenChange: onChangeEdit, onOpen: onOpenEdit } = useDisclosure()
   const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onChangeDelete, onOpen: onOpenDelete } = useDisclosure()

   function handleShowEditModal(id: string) {
      const foundMaterial = materials.items.find(m => m.id === id)
      if (!foundMaterial) return
      setActiveMaterial(foundMaterial)
      onOpenEdit()
   }

   function handleShowDeleteModal(id: string) {
      const foundMaterial = materials.items.find(m => m.id === id)
      if (!foundMaterial) return
      setActiveMaterial(foundMaterial)
      onOpenDelete()
   }

   const rows = materials.items.map((material) => ({
      key: material.id,
      product: material.name,
      yardLeft: material.stock,
      status: (
         <Chip
            className={`text-xs w-[90px] text-center h-6 ${material.status === 'In Stock'
               ? "bg-green-100 text-green-700"
               : "bg-red-100 text-red-700"}`
            }
            size="sm"
         >
            {material.status || 'Out of Stock'}
         </Chip>
      ),
      actions: (
         <ActionButton
            id={material.id}
            onEditClick={handleShowEditModal}
            onDeleteClick={handleShowDeleteModal}
         />
      )
   }));

   function handleChangePage(page: number) {
      router.replace(pathname + `?page=${page}`)
   }

   return (
      <>
         <DataTable
            columns={columns}
            rows={rows}
            metadata={materials.metadata}
            onChange={handleChangePage}
         />

         {activeMaterial && isOpenEdit ? (
            <EditMaterial
               material={activeMaterial}
               isOpen={isOpenEdit}
               onOpenChange={onChangeEdit}
            />
         ) : null}

         {activeMaterial && isOpenDelete ? (
            <DeleteModal
               isOpen={isOpenDelete}
               confirm='Are you sure you want to delete this Material?'
               onOpenChange={onChangeDelete}
               btnCloseTxt='No'
               btnConfirmTxt='Yes'
               onConfirm={deleteMaterial.bind(null, activeMaterial.id)}
               onClose={onCloseDelete}
            />
         ) : null}
      </>
   )
}

const columns = [
   { key: "product", label: "Product", width: '35%' },
   { key: "yardLeft", label: "Yard Left", width: '35%' },
   { key: "status", label: "Status", width: '20%' },
   { key: "actions", label: "", width: "10%" },
];