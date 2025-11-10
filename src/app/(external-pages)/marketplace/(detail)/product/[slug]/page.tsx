import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { MayLikeProducts } from '@components/features/products'
import { ProductCustomization, Description } from '../_components'
import { BreadCrumbItemType, BreadCrumbs, MayLikeProductsSkeleton, ProductGallery } from '@components/ui'

import { capitalizeFirstLetter } from '@utils'
import { getProductBySlug } from '@actions/products.action'
import { getUserMeasurement } from '@actions/measurements.action'

type Props = {
  params: Promise<{ slug: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    }
  }

  return {
    title: "Marketplace - " + product.name,
    description: product.description,
  }
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params

  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const userMeasurements = await getUserMeasurement()

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
      <section className='flex flex-col md:flex-row justify-between items-start mb-2'>
        <div className='flex md:hidden justify-start items-center gap-0.5 mb-6 w-full'>
          <BreadCrumbs
            separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
            items={breadcrumbs}
          />
        </div>

        <article className='w-full md:w-[51%] h-92.75 md:h-137.5'>
          <ProductGallery images={product.images} />
        </article>

        <article className='w-full md:w-[46%] h-auto min-h-screen'>
          <div className='hidden md:block'>
            <BreadCrumbs
              separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
              items={breadcrumbs}
            />
          </div>

          <h1 className='font-normal mt-7.5 md:mt-5.5 mb-5 text-[36px] w-full'>{product.name}</h1>

          <ProductCustomization
            product={product}
            shirtMeasurement={userMeasurements.shirt}
            trouserMeasurement={userMeasurements.trouser}
          />

          <Description />

          <h6 className='mt-7.5 font-semibold text-black'>Buy more, save more!!!</h6>
          <p className="flex gap-x-1">
            <span>Buy 5 or more and get</span>
            <span className='text-[#AB0808]'>25% off</span>
          </p>
        </article>
      </section>

      <Suspense fallback={<MayLikeProductsSkeleton />}>
        <MayLikeProducts />
      </Suspense>
    </main>
  )
}

