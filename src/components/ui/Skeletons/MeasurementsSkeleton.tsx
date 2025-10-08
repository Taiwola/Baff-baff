'use client'

import React from 'react'
import { Skeleton } from '@heroui/react' 

export default function MeasurementListSkeleton() {
  const placeholders = Array(3).fill(null)

  return (
    <section className="mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start font-montserrat">
      {placeholders.map((_, idx) => (
        <div
          key={idx}
          className="w-full h-[11.3125rem] py-7.5 px-5 rounded-[1.25rem] border border-foreground"
        >
          {/* Header skeleton */}
          <div className="flex justify-between items-start mb-3.5">
            <Skeleton className="h-4 w-40 rounded-md" /> {/* measurement type */}
            <div className="flex gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>

          {/* Body fields */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Skeleton className="h-3 w-14 rounded-md" /> {/* key label */}
                  <Skeleton className="h-3 w-20 rounded-md" /> {/* value */}
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Add button skeleton */}
      <Skeleton className="h-[3rem] w-[12rem] rounded-[3rem]" />
    </section>
  )
}
