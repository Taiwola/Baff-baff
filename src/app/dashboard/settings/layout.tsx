import React from 'react'

import { Header } from '@components/features/dashboard'

type Props = Readonly<{
   children: React.ReactNode
}>

export default function SettingsLayout({ children }: Props) {
   return (
      <div className="w-full h-auto">
         <Header title='Settings' />

         <section className='w-full min-h-screen border border-black/50 bg-white rounded-[20px] p-5 md:p-10'>
            {children}
         </section>
      </div>
   )
}
