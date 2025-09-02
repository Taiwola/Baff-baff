import Link from "next/link"
import { BaffFooterIconSvg } from "../../asset/svg/baffFooterIconSvg"
import { FacebookSvg } from "../../asset/svg/facebookSvg"
import { InstagramSvg } from "../../asset/svg/instagramSvg"
import { LinkdlnSvg } from "../../asset/svg/linkdlnSvg"
import { TwitterSvg } from "../../asset/svg/twitterSvg"

export default function Footer() {
  return (
    <div className="bg-[#202020] py-14 md:py-20 w-full">
      <div className="px-10 w-full md:hidden inline-flex justify-center items-center">
        <BaffFooterIconSvg />
      </div>
      <div className="px-10 w-full flex mt-14 justify-center items-center flex-col md:hidden">
        <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
          +2348162695360+2348090444452
        </p>
        <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
          contactbafabafa@gmail.com
        </p>
      </div>

      <div className="md:hidden flex flex-col justify-center items-center mt-10 gap-3">
        <p className="text-[#FEFEFE] font-montserrat font-semibold">
          Follow us
        </p>
        <div className="flex justify-center items-center gap-6">
          <TwitterSvg />
          <FacebookSvg />
          <InstagramSvg />
          <LinkdlnSvg />
        </div>
      </div>

      <div className="md:hidden mt-20 text-center">
        <p className="text-[#FEFEFE] font-semibold font-montserrat text-xs">
          @copyright 2025 Baffa Baff. All rights reserved
        </p>
      </div>

      <div>
        <div className="hidden md:flex md:px-20 md:gap-6 items-center">
          <p className="text-[#FEFEFE] font-montserrat font-semibold">
            Follow us
          </p>
          <div className="flex justify-center items-center gap-6">
            <Link href={"/x.com"}>
              <TwitterSvg />
            </Link>
            <Link href="/facebook.com">
              <FacebookSvg />
            </Link>
            <Link href={"/instagram.com"}>
              <InstagramSvg />
            </Link>
            <Link href="/linkdln.com">
              <LinkdlnSvg />
            </Link>
          </div>
        </div>
        <div className="md:block md:border-1 md:border-[#FEFEFE80] md:my-10 hidden" />

        <div className="md:flex md:justify-between md:items-center md:w-full md:px-20 hidden">
          <div>
            <BaffFooterIconSvg />
          </div>
          <div>
            <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
              +2348162695360+2348090444452
            </p>
            <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
              contactbafabafa@gmail.com
            </p>
          </div>
          <div>
            <p className="text-[#FEFEFE] font-semibold font-montserrat text-xs">
              @copyright 2025 Baffa Baff. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
