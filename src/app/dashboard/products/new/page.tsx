import React from 'react'
import AddProduct from '../_components/AddProduct'

import { getMaterials } from '@actions/materials.action'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Products',
  description: 'Create a new product by selecting from available materials and specifying details.',
}

export default async function CreateProductPage() {
  const materials = await getMaterials()

  return (
    <div className="w-full h-auto">
      <AddProduct materials={materials.items} />
    </div>
  )
}

