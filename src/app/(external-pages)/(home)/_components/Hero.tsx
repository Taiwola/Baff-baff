import { ArrowRightIcon } from "@heroicons/react/24/outline"

import LargeHeroSvg from "@assets/svg/largeheroSvg"
import { HeroShopSvg } from "@assets/svg/heroShopSvg"
import { HeroBannerSvg } from "@assets/svg/herobannerSvg"

import { Button } from "@components/ui"

export default function HomeHero() {
   return (
      <section className="container mx-auto">
         <div className="flex flex-col justify-center">
            <div className="border-b-3 pb-5 md:pb-7 border-[#202020]">
               <div className="inline-block">
                  <LargeHeroSvg className="max-w-full w-full h-auto" />
               </div>
            </div>
            <div className="mt-4">
               <h6 className="font-montserrat">
                  Quality made accessible
               </h6>
            </div>
         </div>

         {/* banner */}
         <div className="relative w-full mt-9 md:mt-18">
            <div>
               <HeroBannerSvg className="max-w-full w-full h-auto" />
            </div>

            <div className="absolute top-0 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
               <HeroShopSvg className="max-w-full w-24 h-auto md:w-48" />
            </div>
         </div>

         {/* hero text */}
         <div className="mt-2 py-10 md:py-40 md:px-28 flex flex-col gap-10 md:gap-8">
            <h6 className="font-black font-roboto uppercase text-center">
               We are fashion loving people who think good quality clothing and top notch customer service should be available to everyone. <br/> You sef dey try... You deserve to look good.
            </h6>

            <div className="flex justify-center items-center">
               <Button variant="bordered" as={'link'} href={'/marketplace'} className="gap-0.5">
                  <p className="font-montserrat font-bold">
                     SHOP NOW
                  </p>

                  <ArrowRightIcon className="w-6 h-6 text-brand-dark" />
               </Button>
            </div>
         </div>
      </section>
   )
}
