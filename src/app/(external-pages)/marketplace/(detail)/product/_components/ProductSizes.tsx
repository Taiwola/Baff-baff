'use client'

import React from 'react'
import Image from 'next/image'
import { Tab, Tabs } from '@heroui/react'

import { formatCurrency } from '@utils'
import { Button } from '@components/ui'

type Props = {
   sizes: IProductSizes
   activeFitting: Fitting
   onChangeFitting: (fitting: Fitting) => void
   onChangeSize: (size: Size) => void
}

export default function ProductSizes({ activeFitting, sizes, onChangeFitting, onChangeSize }: Props) {

   return (
      <>
         <div className='flex justify-start items-center gap-2.5 mb-3.5'>
            {fittings.map((fitting) => (
               <Button
                  onClick={() => onChangeFitting(fitting.key)}
                  size='md'
                  key={fitting.key}
                  type='button'
                  variant='bordered'
                  className={`rounded-[2.5rem] font-montserrat gap-1.5 ${activeFitting === fitting.key ? '' : 'border-foreground text-black/70'}`}
               >
                  <div className='w-[18px] h-[18px] overflow-hidden'>
                     <Image src={fitting.image} alt={fitting.label} width={18} height={18} objectFit='contain' />
                  </div>

                  <span>{fitting.label}</span>
               </Button>
            ))}
         </div>

         <p className="text-sm">SIZE</p>

         <div className='w-max'>

            <Tabs
               aria-label="Product Sizes"
               classNames={{
                  panel: 'p-0',
                  base: 'flex flex-row gap-3',
                  tabList: 'flex flex-row gap-3 p-0',
                  tab: 'w-[3.125rem] h-[2.5rem] text-black border border-foreground cursor-pointer hover:bg-gray-100 data-[selected=true]:border-brand-dark'
               }}
               onSelectionChange={(key) => onChangeSize(key as Size)}
            >

               {Object.entries(sizes).map(([key, details]) => (
                  <Tab key={key} title={key.toUpperCase()}>
                     <div className='w-full flex justify-end items-center'>
                        <button className="text-black mt-2.5 underline text-xs transition-transform active:scale-95 text-end">
                           View size guide
                        </button>
                     </div>

                     <div className='py-1.5 px-2.5 w-max text-[10px] bg-foreground rounded-[3.75rem] text-brand-dark'>
                        <span>{details.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                     </div>

                     <p className='mt-5 text-sm'>PRICE</p>
                     <p className='mt-1.5 font-medium'>{formatCurrency(details.discountPrice || details.price)}</p>
                  </Tab>
               ))}
            </Tabs>
         </div>
      </>
   )
}

type FittingItem = {
   key: Fitting
   label: string
   image: string
}

const fittings: Array<FittingItem> = [
   { key: 'fit', label: 'Fit', image: '/images/fits.png' },
   { key: 'straight', label: 'Straight', image: '/images/straight.png' },
   { key: 'baggy', label: 'Baggy', image: '/images/baggy.png' },
]