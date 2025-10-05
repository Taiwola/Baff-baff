"use client"

import React from "react"
import Image from "next/image"
import { Pencil } from "lucide-react"

import { formatCurrency } from "@utils"
import { Button } from "@components/ui"
import ActionButton from "./ActionButton"

type Props = {
   product: Product
}

export default function ProductItem({ product }: Props) {

   return (
      <div className="w-full h-[28rem] bg-white flex flex-col shadow">
         {/* Image */}
         <div className="w-full h-[22rem] bg-gray-100 overflow-hidden relative border border-foreground group">
            <Image
               src={product.images[0]}
               alt={product.name}
               fill
               className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            />

            {/* Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <Button
                  as={'link'}
                  href={`/dashboard/products/${product.id}`}
                  variant="bordered"
                  className="flex items-center gap-2 border-white hover:bg-transparent hover:opacity-80"
               >
                  <Pencil className="w-4 h-4 text-white" />
                  <span className="text-white">Edit</span>
               </Button>
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 flex flex-col p-2.5 gap-1.5">
            {/* Name + Menu */}
            <div className="flex items-start justify-between">
               <h3 className="text-base font-bold text-black line-clamp-1 uppercase">
                  {product.name}
               </h3>

               <ActionButton id={product.id} status={product.status} />
            </div>

            {/* Category */}
            <p className="text-base text-black line-clamp-1">
               {"Corporate shirts"}
            </p>

            {/* Price */}
            <p className="text-base text-[#121212]">{formatCurrency(product.sizes.s.price)}</p>

            {/* Status */}
            <p className="text-xs text-[#121212]">
               {`(${statusMap[product.status]})`}
            </p>
         </div>
      </div>
   )
}

const statusMap: Record<ProductStatus, string> = {
   inStock: 'In Stock',
   outOfStock: 'Out of Stock'
}
