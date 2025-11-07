'use client'

import React, { useActionState, useEffect, useRef, useState } from 'react'

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
   const [{ values, error }, action] = useActionState(updateOrder.bind(null, id), initialState)

   const [status, setStatus] = useState(values.status)

   function handleChange(val: string) {
      setStatus(val as OrderStatus)
   }

   useEffect(() => {
      ref.current?.requestSubmit()
   }, [status])


   useEffect(() => {
      if (error) {
         toast.error({ title: 'Oops! An Error Occured', description: error })
      }
   }, [toast, error]);

   return (
      <form ref={ref} action={action} className='w-24 sm:w-30 h-10 sm:h-10.75'>
         <Input
            value={status}
            name='status'
            type='select'
            options={[
               { key: 'paid', label: 'Paid' },
               { key: 'delivered', label: 'Delivered' },
               { key: 'cancelled', label: 'Cancelled' },
            ]}
            onChange={handleChange}
            className='bg-blue-500'
         />
      </form>
   )
}
