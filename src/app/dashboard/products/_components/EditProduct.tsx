'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { useDisclosure } from '@heroui/react'

import { useToast } from '@hooks/useToast'
import { updateProduct, deleteProduct } from '@actions/products.action'
import { UpdateProductFormState } from '@validations/product'

import ProductForm from './ProductForm'
import ConfirmDeleteModal from './ConfirmDeleteModal'

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
         design: product.design,
         materialId: product.material,
         collaborator: product.collaborator?.id,
         yard: product.yard,
         s: product.sizes.s,
         m: product.sizes.m,
         l: product.sizes.l,
         xl: product.sizes.xl,
         xxl: product.sizes.xxl,
         xxxl: product.sizes.xxxl,
      }
   }

   const toast = useToast()
   const [{ values, errors, error }, action, pending] = useActionState(updateProductWithId, initialState)
   const [isDeleting, setIsDeleting] = useState(false)
   const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onOpenChange: onDeleteModalOpenChange } = useDisclosure()

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [error, toast])

   const handleDeleteClick = () => {
      onDeleteModalOpen()
   }

   const handleConfirmDelete = async () => {
      setIsDeleting(true)
      const result = await deleteProduct(product.id)
      
      if (result?.error) {
         toast.error({ description: result.error })
         setIsDeleting(false)
         onDeleteModalOpenChange()
      }
      // If no error, the redirect will handle navigation
   }

   return (
      <>
         <ProductForm
            type='edit'
            errors={errors}
            initialState={values}
            pending={pending}
            materials={materials}
            action={action}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
         />
         <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onOpenChange={onDeleteModalOpenChange}
            onConfirm={handleConfirmDelete}
            isLoading={isDeleting}
         />
      </>
   )
}
