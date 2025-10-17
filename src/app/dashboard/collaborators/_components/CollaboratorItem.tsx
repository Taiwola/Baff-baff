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
      <Link
         href={`/dashboard/collaborators/${collaborator.id}`}
         className="
        group flex flex-col items-center text-center cursor-pointer
        transition-all duration-300
        rounded-xl p-2 relative
        hover:scale-105 hover:shadow-lg hover:bg-gray-50
      "
      >
         <div className="rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
               src={collaborator.image}
               alt={collaborator.name}
               width={174}
               height={174}
               className="object-cover rounded-full"
            />
         </div>

         <span className="mt-3.5 text-base text-black transition-colors duration-300 group-hover:text-red-600 text-nowrap">
            {collaborator.name}
         </span>
      </Link>
   )
}
