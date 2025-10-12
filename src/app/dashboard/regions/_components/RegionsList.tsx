'use client'

import React, { use, useState } from 'react'
import { useDisclosure } from '@heroui/react'
import { usePathname, useRouter } from 'next/navigation'

import EditRegion from './EditRegion'
import ActionButton from './ActionButton'
import { DataTable } from '@components/layouts'
import { DeleteModal } from '@components/ui/Modals'

import { deleteRegion } from '@actions/regions.action'

type Props = {
  promise: Promise<Pagination<Region>>
}

export default function RegionsList({ promise }: Props) {
  const regions = use(promise)

  const router = useRouter()
  const pathname = usePathname()

  const [activeRegion, setActiveRegion] = useState<Region | null>(null)

  const { isOpen: isOpenEdit, onOpenChange: onChangeEdit, onOpen: onOpenEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onChangeDelete, onOpen: onOpenDelete } = useDisclosure()

  function handleShowEditModal(id: string) {
    const foundRegion = regions.items.find(m => m.id === id)
    if (!foundRegion) return
    setActiveRegion(foundRegion)
    onOpenEdit()
  }

  function handleShowDeleteModal(id: string) {
    const foundRegion = regions.items.find(m => m.id === id)
    if (!foundRegion) return
    setActiveRegion(foundRegion)
    onOpenDelete()
  }

  const rows = regions.items.map((region) => ({
    key: region.id,
    state: region.state,
    city: region.city,
    price: region.price,
    actions: (
      <ActionButton
        id={region.id}
        onEditClick={handleShowEditModal}
        onDeleteClick={handleShowDeleteModal}
      />
    )
  }))

  function handleChangePage(page: number) {
    router.replace(pathname + `?page=${page}`)
  }

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        metadata={regions.metadata}
        onChange={handleChangePage}
      />

      {isOpenEdit && activeRegion ? (
        <EditRegion
          region={activeRegion}
          isOpen={isOpenEdit}
          onOpenChange={onChangeEdit}
        />
      ) : null}

      {isOpenDelete && activeRegion ? (
        <DeleteModal
          isOpen={isOpenDelete}
          confirm='Are you sure you want to delete this Region?'
          onOpenChange={onChangeDelete}
          btnCloseTxt='No'
          btnConfirmTxt='Yes'
          onClose={onCloseDelete}
          onConfirm={deleteRegion.bind(null, activeRegion.id)}
        />
      ) : null}
    </>
  );
}


const columns = [
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "price", label: "Delivery Price" },
  { key: "actions", label: "" },
];
