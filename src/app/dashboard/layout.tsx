import React from 'react'
import { redirect } from 'next/navigation'

import { verifySession } from '@lib/dal'
import { getUser } from '@actions/users.action'
import { Sidebar, Topbar } from '@components/layouts'

type Props = Readonly<{
   children: React.ReactNode
}>

export default async function DashboardLayout({ children }: Props) {
   const session = await verifySession()
   const user = await getUser(session?.userId || '')

   if (!user) redirect('/login')

   return (
      <div className="w-full h-screen flex overflow-hidden">
         {/* Sidebar */}
         <aside className="md:w-[5rem] lg:w-[18%] h-full overflow-y-auto no-scrollbar bg-brand-dark pb-4 sm:pb-6.5">
            <Sidebar />
         </aside>

         {/* Main */}
         <div className="flex-1 flex flex-col">
            <header>
               <Topbar name={user.firstName} />
            </header>

            <main className="px-4 sm:px-6 lg:px-7.5 py-4 sm:py-6.5  h-full overflow-y-auto max-w-7xl mx-auto w-full">
               {children}
            </main>
         </div>
      </div>
   )
}
