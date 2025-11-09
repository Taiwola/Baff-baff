import React from 'react'
import { FilterAccordion } from '@components/features/marketplace'
import { Metadata } from 'next'

type Props = Readonly<{
  children: React.ReactNode
}>

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Explore our diverse marketplace with a wide range of products to suit your needs.',
}

export default function MarketPlaceLayout({ children }: Props) {

  return (
    <main className='app-container flex justify-between items-start min-h-screen py-12 gap-22.5'>
      <section className='hidden md:block w-52 border-t border-b border-brand-dark mt-16 p-0'>
        <FilterAccordion />
      </section>

      <section className='flex-1 h-full'>
        {children}
      </section>
    </main>
  )
}
