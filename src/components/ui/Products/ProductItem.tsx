import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Button from '../Button'
import { formatCurrency } from '@utils'
import { Product } from '@models/product.model'

type Props = {
  product: Product
}

export default function ProductItem({ product }: Props) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full relative h-52 md:h-80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-fill"
          quality={100}
        />
      </div>

      <div>
        <Link href={`/marketplace/product/${product.slug}`}>
          <small className="font-montserrat uppercase mb-1">
            {product.name}
          </small>
        </Link>

        <small className="font-montserrat flex gap-2 text-[#121212] mb-2">
          <span>{formatCurrency(product.price)}</span>
          {product.stockCount > 0 ? <span>(In stock)</span> : null}
        </small>

        <Button
          size='sm'
          variant="bordered"
          className="uppercase w-28"
        >
          <small className="font-montserrat text-brand-dark font-semibold">
            add to bag
          </small>
        </Button>
      </div>
    </div>
  )
}
