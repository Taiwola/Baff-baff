'use client'

import { use, useState } from 'react'
import { useDisclosure } from '@heroui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import EditSizeGuide from './EditSizeGuide'
import ActionButton from './ActionButton'
import { DataTable } from '@components/layouts'
import { DeleteModal } from '@components/ui/Modals'
import { deleteSizeGuide } from '@actions/size-guide.actions'

type Props = {
  promise: Promise<SizeGuide[]>
}

export default function SizeGuideList({ promise }: Props) {
  const guides = use(promise)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeGender = (searchParams.get('gender') as 'men' | 'women') ?? undefined

  const [activeGuide, setActiveGuide] = useState<SizeGuide | null>(null)

  const { isOpen: isOpenEdit, onOpenChange: onChangeEdit, onOpen: onOpenEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onChangeDelete, onOpen: onOpenDelete } = useDisclosure()

  function handleGenderFilter(gender?: 'men' | 'women') {
    const params = new URLSearchParams(searchParams.toString())
    if (gender) {
      params.set('gender', gender)
    } else {
      params.delete('gender')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  function handleShowEditModal(id: string) {
    const found = guides.find((g) => g.id === id)
    if (!found) return
    setActiveGuide(found)
    onOpenEdit()
  }

  function handleShowDeleteModal(id: string) {
    const found = guides?.find((g) => g.id === id)
    if (!found) return
    setActiveGuide(found)
    onOpenDelete()
  }

  const rows = guides?.map((guide) => ({
    key: guide?.id,
    gender: <span className="capitalize">{guide.gender}</span>,
    entries: `${guide?.entries?.length} sizes`,
    sizes: guide?.entries?.map((e) => e.size).join(', '),
    actions: (
      <ActionButton
        id={guide.id}
        onEditClick={handleShowEditModal}
        onDeleteClick={handleShowDeleteModal}
      />
    )
  }))

  return (
    <>
      {/* Gender filter tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
        {([undefined, 'women', 'men'] as const).map((g) => (
          <button
            key={g ?? 'all'}
            type="button"
            onClick={() => handleGenderFilter(g)}
            className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors border-b-2 -mb-px ${
              activeGender === g
                ? 'border-[#202020] text-[#202020]'
                : 'border-transparent text-gray-400 hover:text-[#202020]'
            }`}
          >
            {g ?? 'All'}
          </button>
        ))}
      </div>

      <DataTable columns={columns} rows={rows} />

      {isOpenEdit && activeGuide ? (
        <EditSizeGuide
          guide={activeGuide}
          isOpen={isOpenEdit}
          onOpenChange={onChangeEdit}
        />
      ) : null}

      {isOpenDelete && activeGuide ? (
        <DeleteModal
          isOpen={isOpenDelete}
          confirm={`Are you sure you want to delete the ${activeGuide.gender}'s size guide?`}
          onOpenChange={onChangeDelete}
          btnCloseTxt="No"
          btnConfirmTxt="Yes"
          onClose={onCloseDelete}
          onConfirm={deleteSizeGuide.bind(null, activeGuide.gender)}
        />
      ) : null}
    </>
  )
}

const columns = [
  { key: 'gender', label: 'Gender' },
  { key: 'entries', label: 'Total Sizes' },
  { key: 'sizes', label: 'Sizes' },
  { key: 'actions', label: '' },
]