"use client"

import { Input } from "@heroui/react"
import { CircleMinus, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function CartItem() {
  const items = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
  }))
  const [value, setValue] = useState<string>("1")
  const handleIncrease = () => {
    const numValue = parseInt(value, 10)
    setValue((numValue + 1).toString())
  }

  const handleDecrease = () => {
    const numValue = parseInt(value, 10)
    if (numValue > 1) {
      setValue((numValue - 1).toString())
    }
  }
  return (
    <div className="flex flex-col gap-4 py-5">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between">
            <div className="flex gap-3.5">
              <div>
                <Image
                  src={"/images/product-image.png"}
                  alt="product image"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="font-poppins font-normal text-2xl ">
                  WAVY BOY SHIRT
                </h2>
                <div className="border w-[50px] h-11 inline-flex justify-center items-center">
                  <h2>L</h2>
                </div>
                <p className="font-montserrat font-medium text-[18px]">
                  ₦397,400.00
                </p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="flex-col flex gap-5">
                <h2>Quantity</h2>
                <div className="flex border-1 border-[#D9D9D9]">
                  <div
                    onClick={handleDecrease}
                    className="border-r border-[#D9D9D9] w-11 h-11 inline-flex justify-center items-center cursor-pointer"
                  >
                    <Minus />
                  </div>
                  <div className="inline-flex justify-center items-center border-none rounded-none">
                    <Input
                      type="text"
                      value={value}
                      variant="flat"
                      onChange={(e) => setValue(e.target.value)}
                      className="rounded-none border-none bg-[#EEF1F0] w-11 h-11"
                    />
                  </div>
                  <div
                    onClick={handleIncrease}
                    className="border-l border-[#D9D9D9] w-11 h-11 inline-flex justify-center items-center cursor-pointer"
                  >
                    <Plus />
                  </div>
                </div>
              </div>
              <div className="cursor-pointer">
                <CircleMinus />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
