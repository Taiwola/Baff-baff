"use client"
import LargeHeroSvg from "../../asset/svg/largeheroSvg"
import { HeroBannerSvg } from "../../asset/svg/herobannerSvg"
import { HeroShopSvg } from "../../asset/svg/heroShopSvg"
import { Button } from "@heroui/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export default function Hero() {
  return (
    <div className="w-full mt-6 md:mt-12">
      <div className="container mx-auto">
        <div>
          {/*  */}
          <div className="flex flex-col justify-center">
            <div className="border-b-3 pb-5 md:pb-7 border-[#202020]">
              <div className="inline-block">
                <LargeHeroSvg className="max-w-full w-full h-auto" />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-montserrat font-medium">
                Quality made accessible
              </p>
            </div>
          </div>

          {/* banner */}
          <div className="relative w-full mt-9 md:mt-18">
            <div>
              <HeroBannerSvg className="max-w-full w-full h-auto" />
            </div>
            <div className="absolute top-0 left-1/6 md:left-1/5 transform -translate-x-1/2 -translate-y-1/2">
              <HeroShopSvg className="max-w-full w-24 h-auto md:w-48" />
            </div>
          </div>

          {/* hero text */}
          <div className="mt-2 py-10 md:py-40 flex flex-col gap-10 md:gap-8">
            <div className="text-center px-4">
              <p className="font-black font-roboto text-sm uppercase leading-tight">
                We are fashion loving people who think good quality clothing and{" "}
                <br />
                top notch customer service should be available to everyone.
                <br /> You sef dey try... You deserve to look good.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="bordered"
                className="flex justify-center w-full md:w-auto border-1 border-[#202020] rounded-none items-center"
              >
                <span className="font-montserrat text-black font-bold text-xs">
                  SHOP NOW
                </span>
                <ArrowRightIcon className="w-6 h-6 text-black" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
