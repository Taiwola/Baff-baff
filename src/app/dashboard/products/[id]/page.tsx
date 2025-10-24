import React from 'react'
import { notFound } from 'next/navigation'

import { getProduct } from '@actions/products.action'
import { getMaterials } from '@actions/materials.action'

import EditProduct from '../_components/EditProduct'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params

  const product = await getProduct(id)
  if (!product) return notFound()

  const materials = await getMaterials()

  return (
    <div className="w-full h-auto">
      <EditProduct materials={materials.items} product={product} />
    </div>
  )
}
