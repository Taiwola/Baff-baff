import React from 'react'

import { Header } from '@components/features/dashboard'
import { NewOrders, RevenueChart, StatCards } from './_components'

export default function OverviewPage() {
  return (
    <div className="w-full h-auto">
      <Header title='Overview' />

      <section className='w-full min-h-screen flex flex-col justify-start items-start gap-5'>
        <StatCards />
        <RevenueChart />
        <NewOrders />
      </section>
    </div>
  )
}





