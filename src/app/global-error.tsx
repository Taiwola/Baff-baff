'use client'

import React from 'react'
import Link from 'next/link'

type GlobalErrorProps = {
  error?: Error & { digest?: string }
  reset?: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500">Error</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Something went wrong
        </h2>

        {error?.message && (
          <p className="mt-2 text-gray-600">
            {error.message}
          </p>
        )}

        {error?.digest && (
          <p className="mt-1 text-xs text-gray-400">
            Ref: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-md bg-black px-5 py-2 text-white font-medium shadow hover:bg-gray-800 transition"
          >
            Go Home
          </Link>
          <button
            onClick={() => reset?.() ?? window.location.reload()}
            className="rounded-md border border-gray-300 px-5 py-2 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  )
}
