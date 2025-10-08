import React from 'react'

import { ProductList } from '@components/ui'
import { getProducts } from '@actions/products.action'

type Props = {
   type: ProductType
}

export default async function MarketPlaceProducts({ type }: Props) {
   const products = await getProducts({ type })

   return (
      <div className='w-full'>
         <ProductList products={products.items} variant='marketplace' />
      </div>
   )
}