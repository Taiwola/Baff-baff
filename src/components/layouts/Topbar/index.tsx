import React from 'react'
import User from './User'

type Props = { name: string }

export default function Topbar({ name }: Props) {
   return (
      <div className="h-16 sm:h-20 w-full bg-white border-b border-foreground px-4 sm:px-7.5 flex justify-end md:justify-between items-center">
         <p className="hidden md:block text-brand-dark text-base sm:text-[1.125rem]">
            Welcome back, <span className="font-bold">{name}</span>
         </p>

         <User name={name} />
      </div>
   )
}
