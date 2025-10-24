import React from 'react'
import { OrdersList } from '../../_components'
import { getOrders } from '@actions/orders.action'

type Props = {
  searchParams: Promise<{ query: string }>
} 

export default async function DeliveredOrdersPage({ searchParams }: Props) {
   const { query } = await searchParams
   const promise = getOrders({ status: 'delivered', search: query })

   return (
      <div className="w-full h-auto">
         <OrdersList promise={promise} />
      </div>
   )
}
