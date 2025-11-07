import { auth } from '@auth'
import React, { Suspense } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { getOrders } from '@actions/orders.action'

import OrderList from './_components/OrderList'
import { BreadCrumbItemType, BreadCrumbs, OrderListSkeleton } from '@components/ui'

export default async function Orders() {
   const session = await auth()
   const promise = getOrders({ status: 'paid', userId: session?.user.id })

   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={items}
            />
         </div>

         <h2 className='md:hidden font-semibold text-black text-[1.125rem]'>ORDER HISTORY</h2>

         <Suspense fallback={<OrderListSkeleton />}>
            <OrderList promise={promise} />
         </Suspense>
      </main>
   )
}

const items: BreadCrumbItemType[] = [
   {
      label: 'HOME',
      href: '/',
      isCurrent: false,
      isDisabled: false
   },
   {
      label: 'ORDER HISTORY',
      href: '/orders',
      isCurrent: true,
      isDisabled: false
   },
]
