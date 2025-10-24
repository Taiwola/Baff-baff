import Image from 'next/image'
import { Pencil } from 'lucide-react'
import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { FaInstagram, FaFacebook, FaTiktok, FaXTwitter } from 'react-icons/fa6'

import { getProducts } from '@actions/products.action'
import { getCollaborator } from '@actions/collaborators.action'
import ProductsList from '@app/dashboard/products/_components/ProductsList'
import { BreadCrumbItemType, BreadCrumbs, Button, DashboardProductsSkeleton } from '@components/ui'

type Props = {
   params: Promise<{ id: string }>
}

export default async function CollaboratorPage({ params }: Props) {
   const { id } = await params

   const collaborator = await getCollaborator(id)
   if (!collaborator) return notFound()

   const collaboratorProductsPromise = getProducts({ collaboratorId: id })

   const breadcrumbsItems: BreadCrumbItemType[] = [
      {
         label: 'Collaborators',
         href: '/dashboard/collaborators',
         isDisabled: false,
         isCurrent: false,
      },
      {
         label: collaborator.name,
         href: '/dashboard/collaborators/' + id,
         isDisabled: false,
         isCurrent: true,
      },
   ]

   return (
      <div className="w-full h-auto">
         <div className="w-full py-10 border-b border-brand-dark/40">
            <BreadCrumbs separator="/" items={breadcrumbsItems} />
         </div>

         {/* Collaborator details */}
         <section className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6 py-10 px-6 border-b border-brand-dark/20">
            {/* Profile Image */}
            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden shadow-md flex-shrink-0">
               <Image
                  src={collaborator.image}
                  alt={collaborator.name}
                  fill
                  className="object-cover"
                  sizes="160px"
               />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 text-center md:text-left">
               <h1 className="text-2xl font-semibold text-brand-dark">{collaborator.name}</h1>

               {/* Social links */}
               <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                  {collaborator.instagram && (
                     <a
                        href={collaborator.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#E1306C] transition-colors"
                        title="Instagram"
                     >
                        <FaInstagram size={20} />
                     </a>
                  )}
                  {collaborator.x && (
                     <a
                        href={collaborator.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                        title="X (Twitter)"
                     >
                        <FaXTwitter size={20} />
                     </a>
                  )}
                  {collaborator.facebook && (
                     <a
                        href={collaborator.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#1877F2] transition-colors"
                        title="Facebook"
                     >
                        <FaFacebook size={20} />
                     </a>
                  )}
                  {collaborator.tikTok && (
                     <a
                        href={collaborator.tikTok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                        title="TikTok"
                     >
                        <FaTiktok size={20} />
                     </a>
                  )}
               </div>

               {/* Metadata */}
               <p className="text-sm text-gray-500">
                  Joined on {new Date(collaborator.createdAt).toLocaleDateString('en-GB', {
                     day: 'numeric',
                     month: 'short',
                     year: 'numeric',
                  })}
               </p>
            </div>

            <Button
               as={'link'}
               href={`/dashboard/collaborators/${collaborator.id}/edit`}
               className="ml-auto flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand-dark/90 transition"
            >
               <Pencil size={16} />
               Edit Collaborator
            </Button>
         </section >

         {/* Collaborator Products */}
         < div className="w-full mt-10" >
            <Suspense fallback={<DashboardProductsSkeleton />}>
               <ProductsList promise={collaboratorProductsPromise} />
            </Suspense>
         </div >
      </div >
   )
}
