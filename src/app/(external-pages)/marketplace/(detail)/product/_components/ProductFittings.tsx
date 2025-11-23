"use client"

import { Button } from '@components/ui'
import Image from 'next/image'

type ProductFittingsProps = {
     onChangeFitting: (fitting: Fitting) => void
      activeFitting: Fitting
}

export default function ProductFittings({activeFitting, onChangeFitting}: ProductFittingsProps) {
  return (
    <div className="flex justify-start items-center gap-2.5 mb-3.5">
      {fittings.map((fitting) => (
        <Button
          onClick={() => onChangeFitting(fitting.key)}
          size="md"
          key={fitting.key}
          type="button"
          variant="bordered"
          className={`rounded-[2.5rem] font-montserrat gap-1.5 ${activeFitting === fitting.key ? '' : 'border-foreground text-black/70'}`}
        >
          <div className="w-[18px] h-[18px] overflow-hidden relative">
            <Image src={fitting.image} alt={fitting.label} className="object-contain w-auto h-auto" fill sizes="18px" />
          </div>

          <span>{fitting.label}</span>
        </Button>
      ))}
    </div>
  )
}

type FittingItem = {
  key: Fitting
  label: string
  image: string
}

const fittings: Array<FittingItem> = [
  { key: 'fit', label: 'Fit', image: '/images/fits.png' },
  { key: 'straight', label: 'Straight', image: '/images/straight.png' },
  { key: 'baggy', label: 'Baggy', image: '/images/baggy.png' }
]
