import { getProducts } from '@actions/products.action'
import React from 'react'

type Props = {
   filter: MaketplaceFilter & { search?: string }
}

export default async function Count({ filter }: Props) {
   const products = await getProducts({ ...filter })

   return (
      <p className='text-md font-montserrat'>{`Found ${products.metadata.totalItems} matches`}</p>
   )
}
