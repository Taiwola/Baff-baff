'use client'

import React, { useActionState, useEffect, useRef } from 'react'

import { Input } from '@components/ui'

import { useToast } from '@hooks/useToast'
import { updateOrder } from '@actions/orders.action'
import { UpdateOrderFormState } from '@validations/order'

const initialState: UpdateOrderFormState = {
   errors: {},
   error: '',
   values: { status: 'paid' }
}

type Props = {
   id: string
}

export default function UpdateStatus({ id }: Props) {
   const toast = useToast()
   const ref = useRef<HTMLFormElement | null>(null)
   const [{ error }, action] = useActionState(updateOrder.bind(null, id), initialState)

   function handleChange() {
      ref.current?.requestSubmit()
   }

   useEffect(() => {
      if (error) {
         toast.error({ title: 'Oops! An Error Occured', description: error })
      }
   }, [toast, error]);

   return (
      <form ref={ref} action={action} className='w-[6rem] sm:w-[7.5rem] h-[2.5rem] sm:h-[2.6875rem]'>
         <Input
            placeholder={'Paid'}
            name='status'
            type='select'
            options={[
               { key: 'delivered', label: 'Delivered' },
               { key: 'cancelled', label: 'Cancelled' }
            ]}
            onChange={handleChange}
            className='bg-green-500'
         />
      </form>
   )
}
