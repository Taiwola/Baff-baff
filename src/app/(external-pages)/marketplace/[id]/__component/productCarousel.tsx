"use client"

import Image from "next/image"

export default function ProductImage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full max-w-lg mx-auto">
        <Image
          src="/images/product-image.png"
          alt="Product image"
          width={550}
          height={550}
          className="w-full h-auto object-contain rounded-lg shadow-md"
          priority
        />
      </div>
    </div>
  )
}
