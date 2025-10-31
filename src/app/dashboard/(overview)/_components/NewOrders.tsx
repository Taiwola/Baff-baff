import React from 'react'
import { OrdersList } from '@components/features/orders'

type Props = {
  promise: Promise<Pagination<Order>>
}

export default function NewOrders({ promise }: Props) {
  return (
    <div className='w-full'>
      <h2 className='text-base text-black font-medium'>New Orders</h2>

      <div className="w-full h-auto">
        <OrdersList promise={promise} />
      </div>
    </div>
  )
}
