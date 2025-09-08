import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { MeasurementList, EmptyMeasurement } from './_components'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

import { measurements } from '@models/measurement.model'

export default function Measurements() {
   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block mb-12'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={breadcrumbs}
            />
         </div>

         {measurements.length <= 0 ? <EmptyMeasurement /> : <MeasurementList measurements={measurements} />}
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