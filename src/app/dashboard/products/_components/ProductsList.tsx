'use client'

import React, { useState } from 'react'

import ProductItem from './ProductItem'
import { Pagination } from '@components/ui'
import { products } from '@models/product.model'

export default function ProductsList() {
   const [page, setPage] = useState(1);

   const perPage = 9
   const pages = Math.ceil(products.length / perPage);
   const start = (page - 1) * perPage;
   const paginatedProducts = products.slice(start, start + perPage);

   return (
      <div className='w-full h-full'>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-7.5 mb-5 w-full">
            {paginatedProducts.map((product) => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>



         <Pagination total={pages} page={page} onChange={setPage} />
      </div>
   )
}