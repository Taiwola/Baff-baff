'use client'
import React from 'react'
import { Button } from '@components/ui'

type Props = {
   title: string
   description: string
   btnText: string
   onAdd: () => void
}

export default function EmptyState({ title, description, btnText, onAdd }: Props) {
   return (
      <section className='mx-auto w-full md:max-w-[65%] flex flex-col justify-center items-start border border-foreground md:rounded-lg p-5'>
         <h6 className='font-medium mb-2.5'>{title}</h6>
         <p className='mb-3.5'>{description}</p>
         <Button onClick={onAdd} fullWidth size='lg' className='bg-black rounded-[48px]' rounded='md'>{btnText}</Button>
      </section>
   )
}
