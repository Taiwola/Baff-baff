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

   if (!user) {
      redirect('/login')
   }

   return (
      <div className="w-full h-screen flex overflow-hidden">
         <aside className="w-[18%] h-screen overflow-y-auto no-scrollbar">
            <Sidebar />
         </aside>

         <div className="w-[82%] flex flex-col">
            <header>
               <Topbar name={user.firstName} />
            </header>

            <main className='px-7.5 py-6.5 h-full overflow-y-auto'>
               {children}
            </main>
         </div>
      </div>

   )
}
