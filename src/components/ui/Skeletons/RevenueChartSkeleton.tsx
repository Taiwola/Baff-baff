'use client'

import React from "react"
import { Skeleton } from "@heroui/react"

export default function RevenueChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      {/* Header skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-3 w-48 rounded-md" />
        </div>

        <div className="flex space-x-3">
          <Skeleton className="h-4 w-8 rounded-full" />
          <Skeleton className="h-4 w-8 rounded-full" />
          <Skeleton className="h-4 w-8 rounded-full" />
          <Skeleton className="h-4 w-8 rounded-full" />
        </div>
      </div>

      {/* Chart area skeleton */}
      <div className="relative w-full h-[300px] mt-4 flex items-center justify-center">
        <div className="w-full h-full bg-gray-100 dark:bg-dark-3 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-3 dark:via-dark-2 dark:to-dark-3" />
        </div>
      </div>
    </div>
  )
}
