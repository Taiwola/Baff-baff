'use client'

import React, { useActionState, useEffect } from 'react'
import ProductForm from './ProductForm'
import { CreateProductFormState } from '@validations/product'
import { createProduct } from '@actions/products.action'
import { useToast } from '@hooks/useToast'

type Props = {
   materials: Material[]
}

const initialState: CreateProductFormState = {
   errors: {},
   error: '',
   values: {
      name: '',
      images: [],
      description: '',
      category: '',
      type: '',
      materialId: '',
      yard: 0
   }
}

export default function AddProduct({ materials }: Props) {
   const toast = useToast()
   const [{ values, errors, error }, action, pending] = useActionState(createProduct, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [error, toast])

   return (
      <ProductForm
         errors={errors}
         initialState={values}
         pending={pending}
         materials={materials}
         action={action}
      />
   )
}
