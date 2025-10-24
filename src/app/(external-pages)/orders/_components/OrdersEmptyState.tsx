import React from 'react'
import { Button } from '@components/ui'

export default function OrdersEmptyState() {
  return (
    <div className="mx-auto w-full md:max-w-[65%] flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <span className="text-4xl text-gray-400">🛍️</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        You haven’t placed any orders yet
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Start shopping to see your orders here.
      </p>

      <Button
        as={'link'}
        href="/marketplace"
      >
        Go to Marketplace
      </Button>
    </div>
  )
}
