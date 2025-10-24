import React from 'react'
import AddProduct from '../_components/AddProduct'

import { getMaterials } from '@actions/materials.action'

export default async function CreateProductPage() {
  const materials = await getMaterials()

  return (
    <div className="w-full h-auto">
      <AddProduct materials={materials.items} />
    </div>
  )
}

