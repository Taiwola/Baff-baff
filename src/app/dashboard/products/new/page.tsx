import { Button, Input } from '@components/ui'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Images from './Images'

export default function CreateProductPage() {
  async function handleSubmit() {
    'use server'
  }

  return (
    <div className="w-full h-auto">
      <form className='w-full h-auto' action={handleSubmit}>
        <div className='w-full flex justify-between items-start'>
          <Button as={'link'} href={'/dashboard/products'} className='bg-transparent text-brand-dark p-0 hover:p-2 hover:text-white gap-5 font-bold'>
            <ArrowLeftIcon className='w-5 h-5' />
            <span className='font-bold'>Add Product</span>
          </Button>

          <div className='flex justify-end items-center gap-2.5'>
            <Button
              type='button'
              variant='bordered'
              rounded='sm'
              className='m-w-[8.0625rem] text-sm'
            >
              Delete
            </Button>

            <Button
              type='submit'
              rounded='sm'
              className='w-[8.0625rem] text-sm'
            >
              Save Product
            </Button>
          </div>

        </div>

        <hr className='border border-brand-dark/40 my-5' />

        <section className='w-full rounded-xl px-5 py-2.5 bg-white'>

          {/* PRODUCT IAMGES */}
          <div className='w-full'>
            <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT IMAGE</h6>
            <hr className='border border-brand-dark/40 mb-5' />
            <Images />
          </div>

          {/* PRODUCT DETAILS */}
          <div className='w-full mt-7.5'>
            <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT DETAILS</h6>
            <hr className='border border-brand-dark/40 mb-5' />

            <div className='grid grid-cols-3 gap-5 w-full'>
              <Input
                label='CATEGORY'
                name='category'
                type='select'
                options={[]}
              />
              <Input
                label='MATERIAL'
                name='material'
                type='select'
                options={[]}
              />
              <Input
                label='PRODUCT NAME'
                name='name'
              />
              <Input
                label='YARD ALLOCATION'
                name='yard'
              />
            </div>
          </div>

          {/* SIZE */}
          <div className='w-full mt-7.5'>
            <h6 className='text-sm text-brand-dark/40 mb-2.5'>SIZE</h6>
            <hr className='border border-brand-dark/40 mb-5' />

            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>

            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>

            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>

            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>

            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>

            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>

            <div className='grid grid-cols-2 gap-5'>
              <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
              <Input name='price' label='Price' placeholder='NGN' />
            </div>
          </div>

          {/* PRODUCT DESCRIPTION */}
          <div className='w-full mt-7.5'>
            <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT DESCRIPTION</h6>
            <hr className='border border-brand-dark/40 mb-5' />

            <Input type='textarea' name='description' />
          </div>
        </section>
      </form>
    </div>
  )
}
