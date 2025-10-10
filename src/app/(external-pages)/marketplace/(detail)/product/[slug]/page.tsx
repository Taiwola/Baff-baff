import React from 'react'
import { notFound } from 'next/navigation'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { ProductCustomization, Description } from '../_components'
import { BreadCrumbItemType, BreadCrumbs, ProductGallery } from '@components/ui'

import { getProductBySlug } from '@actions/products.action'
import { capitalizeFirstLetter, formatCurrency } from '@utils'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params

  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const breadcrumbs: BreadCrumbItemType[] = [
    {
      label: 'Home',
      href: '/',
      isCurrent: false,
      isDisabled: false
    },
    {
      label: `${capitalizeFirstLetter(product.category)} ${capitalizeFirstLetter(product.type)}s`,
      href: `/marketplace/${product.category}?${product.type}s`,
      isCurrent: false,
      isDisabled: false
    },
    {
      label: `${product.name}`,
      href: `/marketplace/product/${product.slug}`,
      isCurrent: true,
      isDisabled: false
    },
  ]

  return (
    <main className='app-container py-5 md:py-12'>
      <section className='flex flex-col md:flex-row justify-between items-start'>
        <div className='flex md:hidden justify-start items-center gap-0.5 mb-6 w-full'>
          <BreadCrumbs
            separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
            items={breadcrumbs}
          />
        </div>

        <article className='w-full md:w-[51%] h-[23.1875rem] md:h-[34.375rem]'>
          <ProductGallery images={product.images} />
        </article>

        <article className='w-full md:w-[46%] h-auto min-h-screen'>
          <BreadCrumbs
            separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
            items={breadcrumbs}
          />

          <h1 className='font-normal mt-7.5 md:mt-5.5 mb-5 text-[36px] w-full'>{product.name}</h1>

          <div className='flex justify-start items-center gap-1'>
            <h6 className='text-[1.25rem]'>{formatCurrency(product.sizes.l.price)}</h6>
            {product.sizes.l.discountPrice ? <h6 className='text-[1.25rem]'>{`-${formatCurrency(product.sizes.l.discountPrice)}`}</h6> : null}
          </div>

          <p className='text-[0.6875rem]'>Bulk pricing available for quantities of 5 units or more</p>

          <ProductCustomization product={product} />

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

        {/* <ProductList products={products.slice(0, 3)} variant='maylike' /> */}
      </section>
    </main>
  )
}

