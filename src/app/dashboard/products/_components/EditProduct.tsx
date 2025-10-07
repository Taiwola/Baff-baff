'use client'

import React, { useActionState, useEffect } from 'react'

import { useToast } from '@hooks/useToast'
import { updateProduct } from '@actions/products.action'
import { UpdateProductFormState } from '@validations/product'

import ProductForm from './ProductForm'

type Props = {
   product: Product
   materials: Material[]
}

export default function EditProduct({ materials, product }: Props) {
   const updateProductWithId = updateProduct.bind(null, product)

   const initialState: UpdateProductFormState = {
      errors: {},
      error: '',
      values: {
         name: product.name,
         images: product.images,
         description: product.description,
         category: product.category,
         type: product.type,
         materialId: product.material,
         yard: product.yard,
         s: product.sizes.s,
         l: product.sizes.l,
         xl: product.sizes.xl,
         xxl: product.sizes.xxl,
         xxxl: product.sizes.xxxl,
      }
   }

   const toast = useToast()
   const [{ values, errors, error }, action, pending] = useActionState(updateProductWithId, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [error, toast])

   return (
      <ProductForm
         type='edit'
         errors={errors}
         initialState={values}
         pending={pending}
         materials={materials}
         action={action}
      />
   )
}
