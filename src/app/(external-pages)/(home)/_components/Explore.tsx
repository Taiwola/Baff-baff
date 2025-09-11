import React from 'react'
import { ExploreCard } from '@components/ui'

export default function Explore() {
   return (
      <section className="container mx-auto">
         {/* explore text */}
         <h4 className="home-label text-center mb-5 md:mb-12">
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
