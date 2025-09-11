import React from 'react'

import { Button } from '@components/ui'
import { SortButton, Title } from '../../_components'
import { MarketPlaceProducts } from '@components/features/products'

export default function Corporates() {
  return (
    <div className='w-full h-full flex flex-col justify-start items-start gap-5'>
      <div className='w-full'>
        <Title text='Corporates' />

        <div className='flex justify-between items-center'>
          <div>
            <div className='flex justify-start items-center gap-2 mb-5'>
              <Button size='md' variant='bordered' className='rounded-[2.5rem] font-montserrat'>
                <span>Shirts</span>
              </Button>

              <Button size='md' variant='filled' className='rounded-[2.5rem] font-montserrat bg-light text-brand-dark hover:bg-brand-light'>
                <span>Trousers</span>
              </Button>

              <Button size='md' variant='filled' className='rounded-[2.5rem] font-montserrat bg-light text-brand-dark hover:bg-brand-light'>
                <span>Jackets</span>
              </Button>
            </div>

            <p className='uppercase text-sm'>Stand out and look goods rocking top quality work shirts.</p>
          </div>

          <SortButton />
        </div>
      </div>

      <MarketPlaceProducts />
    </div>
  )
}
