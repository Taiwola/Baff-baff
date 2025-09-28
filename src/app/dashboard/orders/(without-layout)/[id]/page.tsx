import React from 'react'
import Link from 'next/link'
import { Header } from '@components/features/dashboard'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

type Props = {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="w-full h-auto">
      <Header title='Orders' />

      <section className='w-full bg-white rounded-[10px] py-5 px-2 sm:px-5 lg:px-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
          <Link href={'/dashboard/orders'} className='flex justify-start items-center gap-3 sm:gap-5 text-brand-dark'>
            <ArrowLeftIcon className='w-6 h-6 sm:w-6.5 sm:h-6.5' />
            <span className="text-sm sm:text-base">{id}</span>
          </Link>

          <div className='flex justify-end items-center gap-3 sm:gap-5 mt-2 sm:mt-0'>
            <p className='text-sm sm:text-base text-brand-dark'>28 Nov 2023</p>
            <div className='w-[6rem] sm:w-[7.5rem] h-[2.5rem] sm:h-[2.6875rem] rounded-[1.875rem] bg-[#DF8A09] flex justify-center items-center text-white text-sm sm:text-base'>
              Process
            </div>
          </div>
        </div>

        <hr className='mt-5' />

        {/* Product Info */}
        <div className='w-full p-2 sm:p-5 lg:px-0'>
          <h6 className='text-sm text-brand-dark/50 font-semibold mb-3'>PRODUCT INFO</h6>
          <hr />

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] gap-4 py-3 font-medium text-sm text-brand-dark">
            <span>Image</span>
            <span>Product Name</span>
            <span>Category</span>
            <span>Quantity</span>
            <span>Size</span>
            <span>Price</span>
          </div>

          {/* Product Rows */}
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:grid sm:grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] gap-2 sm:gap-4 py-3 items-center border-b border-gray-200 text-sm text-brand-dark font-medium"
              >
                <div className="w-[70px] h-[70px] relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <span>{product.name}</span>
                <span>{product.category}</span>
                <span>{product.quantity}</span>
                <span>{product.size}</span>
                <span>{product.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="w-full px-2 sm:px-5 mt-6 flex flex-col gap-2 max-w-xs ml-auto">
          <div className="flex justify-between text-sm text-gray-600">
            <span>SUBTOTAL</span>
            <span>N60,000</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>DELIVERY FEE</span>
            <span>N3,000</span>
          </div>
          <hr className="my-1 border-gray-300" />
          <div className="flex justify-between text-base font-semibold text-black">
            <span>TOTAL</span>
            <span>N63,000</span>
          </div>
        </div>
      </section>
    </div>
  )
}

const products = Array.from({ length: 2 }).map((_, i) => ({
  id: `${i + 1}`,
  image: `https://picsum.photos/seed/${i + 1}/70/70`,
  name: `Product ${i + 1}`,
  category: ["Clothing", "Shoes", "Accessories"][i % 3],
  quantity: Math.floor(Math.random() * 10) + 1,
  size: ["S", "M", "L", "XL"][i % 4],
  price: `$${(Math.random() * 100).toFixed(2)}`
}))
