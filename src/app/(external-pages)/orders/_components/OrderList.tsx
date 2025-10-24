import React from 'react'
import Order from './Order'
import OrdersEmptyState from './OrdersEmptyState'

type Props = {
  promise: Promise<Pagination<Order>>
}

export default async function OrderList({ promise }: Props) {
  const orders = await promise

  if (orders.metadata.totalItems < 1) {
    return <OrdersEmptyState />
  }

  return (
    <div className='mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start mt-5'>
      {orders.items.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  )
}