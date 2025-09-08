'use client'

import React from 'react'
import { Button } from '@components/ui'
import { useDisclosure } from '@heroui/react'
import AddressFormModal from './AddressModal'

export default function EmptyAddress() {
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

   return (
      <>
         <section className='mx-auto w-full md:max-w-[65%] flex flex-col justify-center items-start border border-foreground md:rounded-lg p-5'>
            <h6 className='font-medium mb-2.5'>You currently have no addresses saved</h6>
            <p className='mb-3.5'>Add address for a quicker checkout experience</p>
            <Button onClick={onOpen} fullWidth size='lg' className='bg-black rounded-[48px]' rounded='md'>Add Address</Button>
         </section>

         <AddressFormModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
      </>
   )
}
