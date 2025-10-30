import React from 'react'

import { ProductList } from '@components/ui'
import { getProducts } from '@actions/products.action'

type Props = {
   filter: MaketplaceFilter & { search?: string }
}

export default async function MarketPlaceProducts({ filter }: Props) {
   const products = await getProducts({ ...filter })

   return (
      <div className='w-full'>
         <ProductList products={products.items} variant='marketplace' />
      </div>
   )
}