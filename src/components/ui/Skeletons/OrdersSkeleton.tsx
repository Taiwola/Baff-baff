import React from 'react'

export default function OrderListSkeleton() {
  return (
    <div className="mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start mt-5">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="w-full border border-gray-200 md:rounded-lg overflow-hidden animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-start items-center p-4 md:px-7.5 md:py-5 border-b border-gray-200 gap-5 md:gap-5">
            <div className="flex flex-col gap-1">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-14 bg-gray-100 rounded" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Order items */}
          {[1, 2].map((j) => (
            <div
              key={j}
              className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 h-full border-t border-gray-100"
            >
              <div className="flex justify-start items-start gap-4 md:gap-7.5">
                <div className="w-[7.5rem] h-[7.5rem] md:w-[9.375rem] md:h-[9.375rem] bg-gray-200 rounded-[20px] flex-shrink-0" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-center md:gap-4 h-full mt-auto w-full md:w-auto">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
