'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Button from '../Button'
import { formatCurrency } from '@utils'

type Props = {
  product: Product
}

export default function ProductItem({ product }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className="group relative flex w-full flex-col gap-3 overflow-hidden border border-transparent hover:border-gray-200 transition-all duration-300"
    >
      <Link href={`/marketplace/product/${product.slug}`} className="block w-full">
        {/* Image container */}
        <div className="relative w-full h-52 md:h-80 overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              quality={100}
              loading="lazy"
            />
          </motion.div>

          {/* Overlay fade */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Details */}
        <div className="pt-3">
          <small className="block font-montserrat uppercase mb-1 text-sm text-gray-800 tracking-wide">
            {product.name}
          </small>

          <small className="font-montserrat flex gap-2 text-[#121212] mb-3">
            <span>{formatCurrency(product.sizes.l.price)}</span>
            <span className="text-gray-500">({product.status})</span>
          </small>

          <Button
            as={'link'}
            href={`/marketplace/product/${product.slug}`}
            size="sm"
            variant="bordered"
            className="uppercase w-28 border-brand-dark text-brand-dark group-hover:bg-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 group"
          >
            <small className="font-montserrat font-semibold group-hover:text-white">
              add to bag
            </small>
          </Button>
        </div>
      </Link>
    </motion.div>
  )
}
