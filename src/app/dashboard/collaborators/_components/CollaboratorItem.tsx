import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Collaborator = {
   id: string
   image: string
   name: string
}

type Props = {
   collaborator: Collaborator
}

export default function CollaboratorItem({ collaborator }: Props) {
   return (
      <div className="flex flex-col items-center text-center group cursor-pointer">
         <div className="transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg rounded-full">
            <Image
               src={collaborator.image}
               alt={collaborator.name}
               width={174}
               height={174}
               className="rounded-full object-cover"
               unoptimized
            />
         </div>

         <Link
            href={`/dashboard/products?collaboratorId=${collaborator.id}`}
            className="mt-3.5 text-lg text-black transition-colors duration-300 group-hover:text-blue-600 text-nowrap"
         >
            {collaborator.name}
         </Link>
      </div>
   )
}
