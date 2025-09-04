import { SweatShirtSvg } from "@assets/svg/sweatShirtSvg"

export default function Discount() {
  return (
    <div className="py-14 w-full flex">
      <div className="bg-black w-[43%] py-10 md:py-36 px-5 md:px-17">
        <h1 className="text-white font-roboto font-black text-[18px] md:text-[82px] uppercase">
          18%Off
        </h1>

        <p className="font-montserrat text-sm text-[#FFFFFF] md:text-base">
          Major discounts on every shirt.
        </p>
      </div>

      <div className="w-[57%]">
        <SweatShirtSvg className="w-full h-auto" />
      </div>
    </div>
  )
}
