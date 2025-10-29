'use client'

import React, { use } from 'react'

import { EmptyState } from './EmptyState'
import { Pagination } from '@components/ui'
import CollaboratorItem from './CollaboratorItem'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
   promise: Promise<Pagination<Collaborator>>
}

export default function CollaboratorsList({ promise }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const { items, metadata } = use(promise)

   function handleChangePage(page: number) {
      router.replace(pathname + `?page=${page}`)
   }

   if (metadata.totalItems < 1) return <EmptyState />

   return (
      <section className="w-full h-full">
         <div
            className="bg-white rounded-[1.25rem] min-h-screen py-7.5 px-14.5 w-full h-full 
                  grid gap-7.5 mb-6
                  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                  overflow-visible"
         >
            {items.map((collaborator) => (
               <div key={collaborator.id} className="relative overflow-visible">
                  <CollaboratorItem collaborator={collaborator} />
               </div>
            ))}
         </div>

         {metadata.totalItems > metadata.pageSize ? <Pagination metadata={metadata} onChange={handleChangePage} /> : null}
      </section>
   )
}
