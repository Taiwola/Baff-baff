"use client"

import React, { useState } from 'react'

import { Pagination } from '@components/ui'
import CollaboratorItem from './CollaboratorItem'

const collaborators = Array.from({ length: 20 }).map((_, i) => ({
   id: `${i + 1}`,
   image: `https://picsum.photos/seed/${i + 1}/174/174`,
   name: `Collaborator ${i + 1}`,
}))

export default function CollaboratorsList() {
   const [page, setPage] = useState(1)
   const perPage = 15

   const totalPages = Math.ceil(collaborators.length / perPage)
   const startIndex = (page - 1) * perPage
   const currentCollaborators = collaborators.slice(startIndex, startIndex + perPage)

   return (
      <section className="w-full h-full">
         <div
            className="
          bg-white rounded-[20px] py-7.5 px-14.5 w-full h-full 
          grid gap-7.5 mb-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
         >
            {currentCollaborators.map((collaborator) => (
               <CollaboratorItem key={collaborator.id} collaborator={collaborator} />
            ))}
         </div>

         {/* <Pagination total={totalPages} page={page} onChange={setPage} /> */}
      </section>
   )
}
