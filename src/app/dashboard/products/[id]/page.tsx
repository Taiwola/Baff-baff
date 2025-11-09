import React from 'react'
import { notFound } from 'next/navigation'

import { getProduct } from '@actions/products.action'
import { getMaterials } from '@actions/materials.action'

import EditProduct from '../_components/EditProduct'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id
 const product = await getProduct(id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    }
  }
 
  return {
    title: "Marketplace - " + product?.name,
    description: product?.description,
  }
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
