import React, { startTransition, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import Images from './Images'
import { Button, Input } from '@components/ui'
import { CreateProductErrors, CreateProductFormValues, UpdateProductErrors, UpdateProductFormValues } from '@validations/product'


interface Props {
   type?: 'create' | 'edit'
   pending: boolean
   initialState: CreateProductFormValues | UpdateProductFormValues
   errors: CreateProductErrors | UpdateProductErrors
   materials: Material[]
   action: (payload: FormData) => void
}

export default function ProductForm({ type = 'create', pending, initialState, errors, materials, action }: Props) {
   const [images, setImages] = useState<(File | string)[]>(initialState.images || [])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      // preserve image positions explicitly
      images.forEach((image, index) => {
         formData.append(`images[${index}]`, image)
      })

      startTransition(async () => {
         action(formData)
      })
   }

   return (
      <form className='w-full h-auto' onSubmit={handleSubmit}>
         <div className='w-full flex justify-between items-start'>
            <Button as={'link'} href={'/dashboard/products'} className='bg-transparent text-brand-dark p-0 hover:p-2 hover:text-white gap-5 font-bold'>
               <ArrowLeftIcon className='w-5 h-5' />
               <span className='font-bold'>{type === 'create' ? 'Add Product' : 'Edit Product'}</span>
            </Button>

            <div className='flex justify-end items-center gap-2.5'>
               {type === 'edit' ? (
                  <Button
                     type='button'
                     variant='bordered'
                     rounded='sm'
                     className='m-w-[8.0625rem] text-sm'
                  >
                     Delete
                  </Button>
               ) : null}

               <Button
                  type='submit'
                  disabled={pending}
                  rounded='sm'
                  className='w-[8.0625rem] text-sm'
               >
                  {pending ? 'Saving...' : 'Save Product'}
               </Button>
            </div>

         </div>

         <hr className='border border-brand-dark/40 my-5' />

         <section className='w-full rounded-xl px-5 py-2.5 bg-white'>

            {/* PRODUCT IAMGES */}
            <div className='w-full'>
               <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT IMAGE</h6>
               <hr className='border border-brand-dark/40 mb-5' />
               <Images images={images} onChange={setImages} />
               {errors.images && <span className="text-xs text-red-500">{errors.images}</span>}
            </div>

            {/* PRODUCT DETAILS */}
            <div className='w-full mt-7.5'>
               <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT DETAILS</h6>
               <hr className='border border-brand-dark/40 mb-5' />

               <div className='grid grid-cols-3 gap-5 w-full'>
                  <Input
                     label='PRODUCT NAME'
                     name='name'
                     value={initialState.name}
                     error={errors.name}
                  />

                  <Input
                     label='CATEGORY'
                     name='category'
                     type='select'
                     options={categories}
                     value={initialState.category}
                     error={errors.category}
                  />
                  <Input
                     label='Product Type'
                     name='type'
                     type='select'
                     options={types}
                     value={initialState.type}
                     error={errors.type}
                  />
                  <Input
                     label='MATERIAL'
                     name='materialId'
                     type='select'
                     options={materials.map(m => ({ key: m.id, label: m.name }))}
                     value={initialState.materialId}
                     error={errors.materialId}
                  />

                  <Input
                     label='YARD ALLOCATION'
                     name='yard'
                     type='number'
                     value={initialState.yard}
                     error={errors.yard}
                  />
               </div>
            </div>

            {/* SIZE */}
            <div className='w-full mt-7.5'>
               <h6 className='text-sm text-brand-dark/40 mb-2.5'>SIZE</h6>
               <hr className='border border-brand-dark/40 mb-5' />

               <div className='grid grid-cols-3 gap-5 mb-5'>
                  <Input
                     name='s[quantity]'
                     label='QUANTITY (SIZE : SMALL)'
                     placeholder='Enter Quantity'
                     type='number'
                     value={initialState.s?.quantity}
                     error={errors.s?.quantity}
                  />

                  <Input
                     name='s[price]'
                     label='Price'
                     placeholder='NGN'
                     type='number'
                     value={initialState.s?.price}
                     error={errors.s?.price}
                  />

                  <Input
                     name='s[discountPrice]'
                     label='Discount Price'
                     type='number'
                     placeholder='NGN'
                     value={initialState.s?.discountPrice}
                     error={errors.s?.discountPrice}
                  />
               </div>

               <div className='grid grid-cols-3 gap-5 mb-5'>
                  <Input
                     name='m[quantity]'
                     label='QUANTITY (SIZE : MEDIUM)'
                     type='number'
                     placeholder='Enter Quantity'
                     value={initialState.m?.quantity}
                     error={errors.m?.quantity}
                  />

                  <Input
                     name='m[price]'
                     label='Price'
                     placeholder='NGN'
                     type='number'
                     value={initialState.m?.price}
                     error={errors.m?.price}
                  />

                  <Input
                     name='m[discountPrice]'
                     label='Discount Price'
                     type='number'
                     placeholder='NGN'
                     value={initialState.m?.discountPrice}
                     error={errors.m?.discountPrice}
                  />
               </div>

               <div className='grid grid-cols-3 gap-5 mb-5'>
                  <Input
                     name='l[quantity]'
                     label='QUANTITY (SIZE : Large)'
                     type='number'
                     placeholder='Enter Quantity'
                     value={initialState.l?.quantity}
                     error={errors.l?.quantity}
                  />

                  <Input
                     name='l[price]'
                     label='Price'
                     placeholder='NGN'
                     type='number'
                     value={initialState.l?.price}
                     error={errors.l?.price}
                  />

                  <Input
                     name='l[discountPrice]'
                     label='Discount Price'
                     type='number'
                     placeholder='NGN'
                     value={initialState.l?.discountPrice}
                     error={errors.l?.discountPrice}
                  />
               </div>

               <div className='grid grid-cols-3 gap-5 mb-5'>
                  <Input
                     name='xl[quantity]'
                     label='QUANTITY (SIZE : Extra Large)'
                     type='number'
                     placeholder='Enter Quantity'
                     value={initialState.xl?.quantity}
                     error={errors.xl?.quantity}
                  />

                  <Input
                     name='xl[price]'
                     label='Price'
                     placeholder='NGN'
                     type='number'
                     value={initialState.xl?.price}
                     error={errors.xl?.price}
                  />

                  <Input
                     name='xl[discountPrice]'
                     label='Discount Price'
                     type='number'
                     placeholder='NGN'
                     value={initialState.xl?.discountPrice}
                     error={errors.xl?.discountPrice}
                  />
               </div>

               <div className='grid grid-cols-3 gap-5 mb-5'>
                  <Input
                     name='xxl[quantity]'
                     label='QUANTITY (SIZE : XX Large)'
                     type='number'
                     placeholder='Enter Quantity'
                     value={initialState.xxl?.quantity}
                     error={errors.xxl?.quantity}
                  />

                  <Input
                     name='xxl[price]'
                     label='Price'
                     placeholder='NGN'
                     type='number'
                     value={initialState.xxl?.price}
                     error={errors.xxl?.price}
                  />

                  <Input
                     name='xxl[discountPrice]'
                     label='Discount Price'
                     type='number'
                     placeholder='NGN'
                     value={initialState.xxl?.discountPrice}
                     error={errors.xxl?.discountPrice}
                  />
               </div>

               <div className='grid grid-cols-3 gap-5 mb-5'>
                  <Input
                     name='xxxl[quantity]'
                     label='QUANTITY (SIZE : XXX Large)'
                     type='number'
                     placeholder='Enter Quantity'
                     value={initialState.xxxl?.quantity}
                     error={errors.xxxl?.quantity}
                  />

                  <Input
                     name='xxxl[price]'
                     label='Price'
                     placeholder='NGN'
                     type='number'
                     value={initialState.xxxl?.price}
                     error={errors.xxxl?.price}
                  />

                  <Input
                     name='xxxl[discountPrice]'
                     label='Discount Price'
                     type='number'
                     placeholder='NGN'
                     value={initialState.xxxl?.discountPrice}
                     error={errors.xxxl?.discountPrice}
                  />
               </div>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className='w-full mt-7.5'>
               <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT DESCRIPTION</h6>
               <hr className='border border-brand-dark/40 mb-5' />

               <Input
                  type='textarea'
                  name='description'
                  value={initialState.description}
                  error={errors.description}
               />
            </div>
         </section>
      </form>
   )
}

const categories: Array<{ key: ProductCategory, label: string }> = [
   { key: 'corporates', label: 'Corporates' },
   { key: 'casuals', label: 'Casuals' },
]

const types: Array<{ key: ProductType, label: string }> = [
   { key: 'shirt', label: 'Shirt' },
   { key: 'trouser', label: 'Trouser' }
]
