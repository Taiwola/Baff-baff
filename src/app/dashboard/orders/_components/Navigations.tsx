'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigations() {
   const pathname = usePathname()

   return (
      <nav className="flex gap-4 mb-6">
         {pages.map((page) => (
            <Link
               key={page.path}
               href={page.path}
               className={`
                  w-[157px] h-[34px] flex items-center justify-center
                  text-sm font-medium
                  ${pathname === page.path ? 'border-b-2 border-brand-dark' : 'border-b-2 border-transparent'}
                  hover:border-b-2 hover:border-brand-dark
                  transition-all duration-200
                `}
            >
               {page.label}
            </Link>
         ))}
      </nav>
   )
}

const pages = [
   { label: 'All Orders', path: '/dashboard/orders' },
   { label: 'Not Start', path: '/dashboard/orders/not-start' },
   { label: 'Processing', path: '/dashboard/orders/processing' },
   { label: 'Delivered', path: '/dashboard/orders/delivered' },
]
