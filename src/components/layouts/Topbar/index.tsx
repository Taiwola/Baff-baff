import React from 'react'
import User from './User'

type Props = {
   name: string
}

export default function Topbar({ name }: Props) {
   return (
      <div className='h-20 w-full bg-white border-b border-foreground p-7.5 flex justify-between items-center'>
         <p className='text-brand-dark text-[1.125rem]'>Welcome back, <span className='font-bold'>{name}</span></p>
         <User name={name} />
      </div>
   )
}
