import { ExploreCard } from '@components/ui'
import React from 'react'

export default function Explore() {
   return (
      <section className="flex flex-col gap-8 container mx-auto">
         {/* explore text */}
         <h4 className="font-montserrat font-black text-center">
            EXPLORE OUR CATEGORIES
         </h4>

         {/* explore card */}
         <div className="flex flex-col md:flex-row gap-6 justify-center">
            <ExploreCard
               image="/images/corporate.jpg"
               text="CORPORATE SHIRTS"
               href='/corporate'
            />

            <ExploreCard
               image="/images/casual.jpg"
               text="CASUAL SHIRTS"
               href='/casuals'
            />
         </div>
      </section>
   )
}
