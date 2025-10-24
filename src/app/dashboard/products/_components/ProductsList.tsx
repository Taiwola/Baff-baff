'use client'

import React, { use } from 'react'

import ProductItem from './ProductItem'
import { Pagination } from '@components/ui'
import { usePathname, useRouter } from 'next/navigation'
import { EmptyState } from './EmptyState'

type Props = {
   promise: Promise<Pagination<Product>>
}

export default function ProductsList({ promise }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const { items: products, metadata } = use(promise)

   function handleChangePage(page: number) {
      router.replace(pathname + `?page=${page}`)
   }

   if (products.length === 0) {
      return (
         <div className='w-full h-full'>
            <EmptyState />
         </div>
      )
   }

   return (
      <div className='w-full h-full'>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-7.5 mb-5 w-full">
            {products.map((product) => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>

         {metadata.totalItems > metadata.pageSize ? <Pagination metadata={metadata} onChange={handleChangePage} /> : null}
      </div>
   )
}