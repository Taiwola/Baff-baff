import React from 'react'

import { Navigations } from '../_components'
import { FilterButton, Header, Search } from '@components/features/dashboard'
import { Metadata } from 'next'

type Props = Readonly<{
   children: React.ReactNode
}>

export const metadata: Metadata = {
  title: 'Orders',
  description: 'View and manage order details effectively.',
}

export default function OrdersLayout({ children }: Props) { 
   return (
      <div className="w-full h-auto">
         <Header title='Orders'>
            <FilterButton />

            <div className='w-[17.5rem]'>
               <Search
                  label="Search Order ID"
                  action='#'
                  placeholder="Search Order ID"
               />
            </div>
         </Header>

         <section>
            <Navigations />

            {children}
         </section>
      </div>
   )
}
