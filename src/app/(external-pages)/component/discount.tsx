import { SweatShirtSvg } from "../../asset/svg/sweatShirtSvg"

export default function Discount() {
  return (
    <div className="py-14 w-full">
      <div className="flex">
        <div className="bg-black flex flex-col justify-center items-start gap-1 px-5 w-[50.95%] md:w-[56.95%] ">
          <h1 className="text-white font-roboto font-black text-[18px] md:text-7xl">
            18%Off
          </h1>
          <p className="font-montserrat text-sm text-[#FFFFFF] md:text-base">
            Major discounts on every shirt.
          </p>
        </div>
        <div className="w-[56.95%]">
          <SweatShirtSvg className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}
