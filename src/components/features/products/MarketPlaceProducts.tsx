import { ProductList } from '@components/ui'
import { products } from '@models/product.model'
import React from 'react'


export default function MarketPlaceProducts() {
   return (
      <div className='w-full'>
         <ProductList products={products} variant='marketplace' />
      </div>
   )
}