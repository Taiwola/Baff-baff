"use client"
import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export default function ProductCard() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Link href={"/marketplace/1"} className="w-full relative h-52 md:h-80">
        <Image
          src="/images/product-image.png"
          alt="product"
          fill
          className="object-fill"
          quality={100}
        />
      </Link>
      <div className="flex flex-col gap-0.5">
        <div>
          <h2 className="font-montserrat font-semibold text-[11px] uppercase">
            wavy boy shirt
          </h2>
        </div>
        <div className="flex gap-2">
          <h3 className="font-montserrat font-normal text-[10px]">N70,000</h3>
          <h3 className="font-montserrat font-normal text-[9px]">(in Stock)</h3>
        </div>
        <div>
          <Button
            variant="bordered"
            className="uppercase max-w-full w-full md:w-auto border-1 border-[#20202099] opacity-60 rounded-none"
          >
            <span className="font-montserrat font-semibold text-xs text-[#202020]">
              add to bag
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
