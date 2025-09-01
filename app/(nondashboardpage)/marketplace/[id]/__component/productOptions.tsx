"use client"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@heroui/react"
import Link from "next/link"
import { useState } from "react"

export function ProductOptions() {
  const [quantity, setQuantity] = useState(1)

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E0E0E0] flex">
        <Button
          variant="light"
          className="font-montserrat uppercase font-normal text-sm border-b-1 rounded-none"
        >
          Select Size
        </Button>
        <Button
          variant="light"
          className="font-montserrat uppercase font-normal text-sm"
        >
          Bespoke
        </Button>
      </div>
      <div className="flex gap-3">
        <Button
          variant="light"
          className="rounded-[30px] border font-montserrat font-normal text-base"
        >
          Fit
        </Button>
        <Button
          variant="light"
          className="rounded-[30px] border  border-[#E0E0E0] font-montserrat font-normal text-base"
        >
          <span className="text-[#000000B2]">Straight</span>
        </Button>
        <Button
          variant="light"
          className="rounded-[30px] border border-[#E0E0E0] font-montserrat font-normal text-base"
        >
          <span className="text-[#000000B2]">Baggy</span>
        </Button>
      </div>
      <div className="space-y-3">
        <h2>Size</h2>
        <div className="flex gap-4">
          <Button variant="light" className="border  rounded-none w-12 h-12">
            XXL
          </Button>
          <Button
            variant="light"
            className="border text-[#000000B2] border-[#E0E0E0] rounded-none w-12 h-12"
          >
            XL
          </Button>
          <Button
            variant="light"
            className="border text-[#000000B2] border-[#E0E0E0] rounded-none w-12 h-12"
          >
            L
          </Button>
          <Button
            variant="light"
            className="border text-[#000000B2] border-[#E0E0E0] rounded-none w-12 h-12"
          >
            M
          </Button>
          <Button
            variant="light"
            className="border text-[#000000B2] border-[#E0E0E0] rounded-none w-12 h-12"
          >
            S
          </Button>
        </div>
        <div className="md:w-[80%] text-right">
          <Link
            href="guide"
            className="font-montserrat font-normal text-xs underline"
          >
            View Size Guide
          </Link>
        </div>
        <div className="bg-[#F7F7F7] px-10 py-2 w-[25%] rounded-[60px] text-center">
          <p className="font-montserrat font-medium text-xs uppercase">
            In stock
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="font-montserrat font-normal text-sm uppercase">
            PRICE
          </h2>
          <h1 className="font-montserrat font-medium text-base">₦124,400.00</h1>
        </div>
        <div className="space-y-2">
          <h2 className="font-montserrat font-normal text-sm uppercase">
            QUANTITY
          </h2>
          <div className="flex w-[150px]">
            <div
              className="cursor-pointer border border-[#20202080] p-3 w-full inline-flex justify-center items-center"
              onClick={handleDecrease}
            >
              <MinusIcon className="w-4 h-4 " />
            </div>
            <div className="border w-full border-[#20202080] inline-flex justify-center items-center">
              {quantity}
            </div>
            <div
              className="cursor-pointer border w-full border-[#20202080] inline-flex justify-center items-center"
              onClick={handleIncrease}
            >
              <PlusIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Button className="w-full bg-[#202020] py-4 font-montserrat font-bold uppercase text-base rounded-lg text-white">
          Add To Cart
        </Button>
      </div>
    </div>
  )
}
