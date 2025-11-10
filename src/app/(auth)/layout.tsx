import React from 'react'

import { Header } from '@components/layouts'
import { verifySession } from '@lib/dal'

type Props = Readonly<{
   children: React.ReactNode
}>

export default async function AuthLayout({ children }: Props) {
   const session = await verifySession()

   return (
      <div className='w-full h-screen flex flex-col justify-start items-start overflow-auto'>
         <Header session={session} />

         <main className="w-full flex-1 py-6 flex justify-center items-start px-4 sm:px-6 lg:px-8">
            <section className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-xl p-6 sm:p-8">
               {children}
            </section>
         </main>
      </div>
   )
}
