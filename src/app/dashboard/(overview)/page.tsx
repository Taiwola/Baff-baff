import React, { Suspense } from 'react'

import { getOrders } from '@actions/orders.action'
import { getRevenueOverview, getStats } from '@actions/analytics.action'

import { Header } from '@components/features/dashboard'
import { NewOrders, RevenueChart, StatCards } from './_components'
import { RevenueChartSkeleton, StatCardsSkeleton, TableSkeleton } from '@components/ui'

export default async function OverviewPage() {
  const statsPromise = getStats()
  const ordersPromise = getOrders({ limit: 3 })
  const revenueOverviewPromise = getRevenueOverview()

  return (
    <div className="w-full h-auto">
      <Header title='Overview' />

      <section className='w-full min-h-screen flex flex-col justify-start items-start gap-5'>
        <Suspense fallback={<StatCardsSkeleton />}>
          <StatCards promise={statsPromise} />
        </Suspense>

        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart promise={revenueOverviewPromise} />
        </Suspense>

        <Suspense fallback={<TableSkeleton columns={3} rows={5} />}>
          <NewOrders promise={ordersPromise} />
        </Suspense>
      </section>
    </div>
  )
}





