import React, { Suspense } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { MeasurementLayout } from './_components'
import { BreadCrumbItemType, BreadCrumbs, MeasurementsSkeleton } from '@components/ui'

import { getUserMeasurement } from '@actions/measurements.action'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Measurements',
   description: 'View and manage your body measurements for personalized fitting.',
}

export default function Measurements() {
   const promise = getUserMeasurement()

   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block mb-12'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={breadcrumbs}
            />
         </div>

         <Suspense fallback={<MeasurementsSkeleton />}>
            <MeasurementLayout promise={promise} />
         </Suspense>
      </main>
   )
}


const breadcrumbs: BreadCrumbItemType[] = [
   {
      label: 'HOME',
      href: '/',
      isCurrent: false,
      isDisabled: false
   },
   {
      label: 'Measurements',
      href: '/measurements',
      isCurrent: true,
      isDisabled: false
   },
]