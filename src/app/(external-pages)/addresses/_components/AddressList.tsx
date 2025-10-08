'use client'

import React, { use } from 'react'
import { useDisclosure } from '@heroui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Button } from '@components/ui'
import EmptyAddress from './EmptyAddress'
import AddressModal from './AddressModal'
import { DeleteModal } from '@components/ui/Modals'
import AddAdress from './AddAdress'

type Props = {
  promise: Promise<Pagination<Address>>
}

export default function AddressList({ promise }: Props) {
  const addresses = use(promise)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onOpenChangeDelete, onOpen: onOpenDelete } = useDisclosure()
  console.log("IS OPEN", isOpen);

  // if (addresses.metadata.totalItems < 1) {
  //   return <EmptyAddress />
  // }

  let content = <EmptyAddress onClick={onOpen} />

  if (addresses.metadata.totalItems > 0) {
    content = (
      <section className='mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start font-montserrat'>
        {addresses.items.map((address) => (
          <div key={address.id} className='w-full h-[11.3125rem] py-7.5 px-5 rounded-[1.25rem] border border-foreground'>
            <div className='flex justify-between items-start mb-3.5'>
              {address.active ? <p className='text-sm text-brand-dark opacity-60'>Preferred delivery address</p> : <div />}

              <div className='flex justify-center items-center'>
                <PencilIcon onClick={onOpen} className='icon-button w-6 h-6' />
                <TrashIcon onClick={onOpenDelete} className='icon-button w-6 h-6' />
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
        onOpenChange={onOpenChange}
      >
        <AddAdress />
      </AddressModal>

      <DeleteModal
        confirm='Are you sure you want to remove this Address?'
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onOpenChange={onOpenChangeDelete}
        onConfirm={() => { }}
      />
    </>
  )
}

