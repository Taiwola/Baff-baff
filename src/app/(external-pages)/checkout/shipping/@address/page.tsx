import { getActveAddress } from '@actions/addresses.action'
import { Button } from '@components/ui'
import React from 'react'

export default async function Shipping() {
  const address = await getActveAddress()

  return (
    <div className='flex flex-col items-start justify-start'>
      <h2 className='text-[1.25rem] text-brand-dark mb-5'>Shipping Address</h2>
      <p className='font-medium text-[#181818B2] mb-2.5'>{address?.fullName}</p>
      <p className='font-medium text-[#181818B2]'>{address?.address}</p>
      <p className='font-medium text-[#181818B2] mb-5'>{address?.phoneNumber}</p>
      <hr className='w-full border-t border-[#D9D9D9] mb-5' />
      <Button as={'link'} href={'/checkout/shipping/edit'} variant='bordered' fullWidth className='bg-transparent'>Change</Button>
    </div>
  )
}
