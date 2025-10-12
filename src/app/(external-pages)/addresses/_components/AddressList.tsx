'use client'

import React, { use, useState } from 'react'
import { useDisclosure } from '@heroui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

import AddAdress from './AddAdress'
import { Button } from '@components/ui'
import EditAddress from './EditAddress'
import AddressModal from './AddressModal'
import EmptyAddress from './EmptyAddress'
import { DeleteModal } from '@components/ui/Modals'
import { deleteAddress } from '@actions/addresses.action'

type Props = {
  promise: Promise<Pagination<Address>>
}

export default function AddressList({ promise }: Props) {
  const addresses = use(promise)
  const [activeAddress, setActiveAddress] = useState<Address | null>(null)

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEdit, onOpenChange: onOpenChangeEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onOpenChangeDelete, onOpen: onOpenDelete } = useDisclosure()

  function handleEdit(address: Address) {
    setActiveAddress(address)
    onOpenEdit()
  }

  function handleCloseEdit() {
    setActiveAddress(null)
    onCloseEdit()
  }

  function handleOpenDelete(address: Address) {
    setActiveAddress(address)
    onOpenDelete()
  }

  let content = <EmptyAddress onClick={onOpen} />

  if (addresses.metadata.totalItems > 0) {
    content = (
      <section className='mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start font-montserrat'>
        {addresses.items.map((address) => (
          <div key={address.id} className='w-full h-[11.3125rem] py-7.5 px-5 rounded-[1.25rem] border border-foreground'>
            <div className='flex justify-between items-start mb-3.5'>
              {address.active ? <p className='text-sm text-brand-dark opacity-60'>Preferred delivery address</p> : <div />}

              <div className='flex justify-center items-center'>
                <PencilIcon onClick={() => handleEdit(address)} className='icon-button w-6 h-6' />
                <TrashIcon onClick={() => handleOpenDelete(address)} className='icon-button w-6 h-6' />
              </div>
            </div>

            <p className='font-medium mb-2.5'>{address.fullName}</p>
            <p className='font-medium'>{address.address}</p>
            <p className='font-medium'>{address.phoneNumber}</p>
          </div>
        ))}

        <Button onClick={onOpen} className='bg-black rounded-[3rem]'>Add Address</Button>
      </section>
    )
  }

  return (
    <>
      {content}

      <AddressModal
        title="New Address"
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <AddAdress />
      </AddressModal>

      {activeAddress ? (
        <AddressModal
          title="Edit Address"
          isOpen={isOpenEdit}
          onClose={handleCloseEdit}
          onOpenChange={onOpenChangeEdit}
        >
          <EditAddress address={activeAddress} />
        </AddressModal>
      ) : null}

      {activeAddress ? (
        <DeleteModal
          confirm='Are you sure you want to remove this Address?'
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          onOpenChange={onOpenChangeDelete}
          onConfirm={deleteAddress.bind(null, activeAddress.id)}
        />
      ) : null}
    </>
  )
}

