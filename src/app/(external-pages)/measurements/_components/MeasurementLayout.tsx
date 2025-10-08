'use client'

import React, { use } from 'react'

import ShirtMeasurement from './ShirtMeasurement'
import TrouserMeasurement from './TrouserMeasurement'

type Props = {
   promise: Promise<Measurement>
}

export default function MeasurementLayout({ promise }: Props) {
   const measurement = use(promise)

   return (
      <section className="mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start font-montserrat">
         <ShirtMeasurement measurement={measurement} />
         <TrouserMeasurement measurement={measurement} />
      </section>
   )
}
