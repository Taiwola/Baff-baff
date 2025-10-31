'use client'

import React, { ReactNode } from 'react'

type Props = {
   title: string
   children?: ReactNode
}

export default function Header({ title, children }: Props) {
   return (
      <>
         <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 md:mb-6">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-extrabold">{title}</h1>

            {/* Actions */}
            <div className="flex flex-wrap gap-2.5 justify-start sm:justify-end">
               {children}
            </div>
         </div>

         <hr className="w-full bg-foreground mb-5" />
      </>
   )
}
