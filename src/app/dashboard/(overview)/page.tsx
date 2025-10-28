import React, { Suspense } from 'react'

import { Header } from '@components/features/dashboard'
import { NewOrders, RevenueChart, StatCards } from './_components'
import { getStats } from '@actions/analytics.action'
import { StatCardsSkeleton } from '@components/ui'
import { getOrders } from '@actions/orders.action'

export default async function OverviewPage() {
  const statsPromise = getStats()
  const ordersPromise = getOrders({ limit: 3 })

  return (
    <div className="w-full h-auto">
      <Header title='Overview' />

      <section className='w-full min-h-screen flex flex-col justify-start items-start gap-5'>
        <Suspense fallback={<StatCardsSkeleton />}>
          <StatCards promise={statsPromise} />
        </Suspense>

        <Suspense fallback={<div>loading ....</div>}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<div>loading ....</div>}>
          <NewOrders promise={ordersPromise} />
        </Suspense>
      </section>
    </div>
  )
}





