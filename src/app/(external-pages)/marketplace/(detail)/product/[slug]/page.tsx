import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { Button, ProductGallery, ProductList } from '@components/ui'
import { Description, ProductItemTab, QuantityButton } from '../_components'

import { formatCurrency } from '@utils'
import { products } from '@models/product.model'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params
  const product = products.find(p => p.slug == slug)
  if (!product) throw new Error('product not found')

  return (
    <main className='app-container py-5 md:py-12'>
      <section className='flex flex-col md:flex-row justify-between items-start'>
        <div className='flex md:hidden justify-start items-center gap-0.5 mb-6 w-full'>
          <small className='text-brand-dark text-[10px] opacity-60'>Home</small>
          <ChevronRightIcon className='w-4 h-4 text-black' />
          <small className='text-brand-dark text-[10px] opacity-60'>Corporate Shirts</small>
          <ChevronRightIcon className='w-4 h-4 text-black' />
          <small className='font-bold text-[10px]'>{product.name}</small>
        </div>

        <article className='w-full md:w-[51%] h-[23.1875rem] md:h-[34.375rem]'>
          <ProductGallery images={product.images} />
        </article>

        <article className='w-full md:w-[46%] h-auto min-h-screen'>
          <div className='hidden md:flex justify-start items-center mb-6'>
            <small className='text-brand-dark text-[10px] opacity-60'>Home</small>
            <ChevronRightIcon className='w-4 h-4 text-black' />
            <small className='text-brand-dark text-[10px] opacity-60'>Corporate Shirts</small>
            <ChevronRightIcon className='w-4 h-4 text-black' />
            <small className='font-bold text-[10px]'>{product.name}</small>
          </div>

          <h1 className='font-normal mt-7.5 md:mt-0 mb-5 text-[36px] w-full'>{product.name}</h1>

          <div className='flex justify-start items-center gap-1'>
            <h6 className='text-[1.25rem]'>{formatCurrency(product.price)}</h6>
            {product.discountPrice ? <h6 className='text-[1.25rem]'>{`-${formatCurrency(product.discountPrice)}`}</h6> : null}
          </div>

          <p className='text-[0.6875rem]'>Bulk pricing available for quantities of 5 units or more</p>

          <div className='w-full mt-5'>
            <ProductItemTab />
          </div>

          <div className='py-1.5 px-2.5 w-max text-[10px] bg-[#F7F7F7] rounded-[3.75rem] text-brand-dark'>
            <span>In stock</span>
          </div>

          <p className='mt-5 text-sm'>PRICE</p>
          <p className='mt-1.5 font-medium'>{formatCurrency(product?.discountPrice || product.price)}</p>

          <div className='mt-5'>
            <p className='text-sm'>QUANTITY</p>
            <QuantityButton />
          </div>

          <Button
            fullWidth={true}
            className='bg-black mt-5 mb-7.5 font-montserrat text-base font-bold'
            size='md'
            rounded='md'
          >
            ADD TO CART
          </Button>

          <Description />

          <h6 className='mt-7.5 font-semibold text-black'>Buy more, save more!!!</h6>
          <p className="flex gap-x-1">
            <span>Buy 5 or more and get</span>
            <span className='text-[#AB0808]'>25% off</span>
          </p>
        </article>
      </section>

      <section className='w-full'>
        <h6 className='text-[18px] mb-7.5'>YOU MAY ALSO LIKE</h6>

        <ProductList products={products.slice(0, 3)} variant='maylike' />
      </section>
    </main>
  )
}
