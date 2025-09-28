'use client'

import React, { ReactNode } from 'react'

type Props = {
   title: string
   children?: ReactNode
}

export default function Header({ title, children }: Props) {

   return (
      <>
         <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-2xl font-extrabold">{title}</h1>

            <div className="flex items-center justify-end gap-2.5 flex-1">
               {children}
            </div>
         </div>

         <hr className='w-full bg-foreground mb-5' />
      </>
   )
}

/**
 * Utility to append ordinal suffix to day numbers
 */
// function getDaySuffix(day: number) {
//    if (day > 3 && day < 21) return 'th'
//    switch (day % 10) {
//       case 1: return 'st'
//       case 2: return 'nd'
//       case 3: return 'rd'
//       default: return 'th'
//    }
// }