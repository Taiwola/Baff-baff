"use client"

import { EmptyCartIconSvg } from "@/app/asset/svg/emptyCartIconSvg"
import { Button } from "@heroui/react"
import Link from "next/link"

export default function EmptyCartItem() {
  return (
    <div className="flex flex-col justify-center items-center py-8 md:py-[50px] gap-3">
      <div>
        <EmptyCartIconSvg className="w-full" />
      </div>

      <div className="text-center flex flex-col gap-3.5">
        <h2 className="uppercase font-poppins font-medium text-base md:text-2xl">
          Your bag is empty!
        </h2>
        <p className="font-poppins font-normal text-sm md:text-[18px]">
          Browse our categories and discover our best deals!
        </p>
        <Link href={"/marketplace"}>
          <Button className="bg-black text-[#FFFFFF] rounded-none py-3.5 px-7 font-poppins font-normal text-base">
            start shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
