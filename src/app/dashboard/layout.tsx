import React from 'react'
import { Sidebar, Topbar } from '@components/layouts'

type Props = Readonly<{
   children: React.ReactNode
}>

export default function DashboardLayout({ children }: Props) {
   return (
      <div className="w-full h-screen flex overflow-hidden">
         <aside className="w-[18%] h-screen overflow-y-auto no-scrollbar">
            <Sidebar />
         </aside>

         <div className="w-[82%] flex flex-col">
            <header>
               <Topbar />
            </header>

            <main className='px-7.5 py-6.5 h-full overflow-y-auto'>
               {children}
            </main>
         </div>
      </div>

   )
}
