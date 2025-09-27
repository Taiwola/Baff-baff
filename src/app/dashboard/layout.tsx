import React from 'react'
import { Sidebar, Topbar } from '@components/layouts'

type Props = Readonly<{
   children: React.ReactNode
}>

export default function DashboardLayout({ children }: Props) {
   return (
      <div className="w-full min-h-screen flex">
         <aside className="w-[18%]">
            <Sidebar />
         </aside>

         <div className="w-[82%] flex flex-col">
            <header>
               <Topbar />
            </header>

            <main className='px-7.5 py-6.5 h-screen overflow-scroll no-scrollbar'>
               {children}
            </main>
         </div>
      </div>

   )
}
