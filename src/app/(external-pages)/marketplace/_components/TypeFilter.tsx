'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@components/ui'

type IProductType = {
   key: ProductType
   label: string
}

type Props = {
   defaultType: ProductType
}

export default function TypeFilter({ defaultType }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   function handleChange(key: ProductType) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('type', key)
      router.replace(`${pathname}?${params.toString()}`)
   }

   return (
      <div className='flex justify-start items-center gap-2 mb-5'>
         {productTypes.map((type) => (
            <Button
               key={type.key}
               size='md'
               variant='bordered'
               className={`rounded-[2.5rem] font-montserrat ${type.key === defaultType ? '' : 'border-none bg-foreground'}`}
               onClick={() => handleChange(type.key)}
            >
               <span>{type.label}</span>
            </Button>
         ))}
      </div>
   )
}

const productTypes: IProductType[] = [
   { key: 'shirt', label: 'Shirts' },
   { key: 'trouser', label: 'Trousers' },
   { key: 'jacket', label: 'Jackets' },
   { key: 'short', label: 'Shorts' },
]
