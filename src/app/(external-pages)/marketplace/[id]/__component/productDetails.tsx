"use client"
import { PlusIcon } from "@heroicons/react/24/outline"
import { ProductOptions } from "./productOptions"

export default function ProductDetails() {
  return (
    <div className="py-5">
      <div className=" space-y-3">
        <h1 className="font-poppins font-black text-6xl uppercase">
          WAVY BOY Trouser
        </h1>
        <p className="font-montserrat font-medium text-2xl">
          ₦97,400.00 -₦124,400.00
        </p>
        <p className="font-montserrat font-normal text-base">
          Bulk pricing available for quantities of 5 units or more
        </p>
        <div>
          <ProductOptions />
        </div>
        <div className="border-b mt-7 border-t border-[#20202066] py-5 flex justify-between items-center">
          <h3 className="font-montserrat font-normal text-sm uppercase">
            Description
          </h3>
          <div className="cursor-pointer text-black ">
            <PlusIcon className="w-6 h-6 " />
          </div>
        </div>
        <div>
          <h1 className="font-montserrat font-semibold text-2xl ">
            Buy more, save more!!!
          </h1>
          <h1 className="font-montserrat font-normal text-base">
            Buy 5 or more and get <span className="text-red-600"> 25% off</span>
          </h1>
        </div>
      </div>
    </div>
  )
}
