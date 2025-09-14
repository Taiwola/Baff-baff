import React from 'react'

import { Header } from '@components/layouts'

type Props = Readonly<{
   children: React.ReactNode
}>

export default function AuthLayout({ children }: Props) {
   return (
      <div className='w-full h-screen flex flex-col justify-start items-start overflow-auto'>
         <Header />
         <main className='w-full flex-1 py-7.5 justify-center items-start flex'>
            <section className='w-[40%] bg-white rounded-xl p-7.5'>
               {children}
            </section>
         </main>
      </div>
   )
}
