import Link from 'next/link'
import { BaffFooterIconSvg } from '@assets/svg/baffFooterIconSvg'
import { FacebookSvg } from '@assets/svg/facebookSvg'
import { InstagramSvg } from '@assets/svg/instagramSvg'
import { LinkdlnSvg } from '@assets/svg/linkdlnSvg'
import { TwitterSvg } from '@assets/svg/twitterSvg'
import { WhatappIconSvg } from '@assets/svg/whatsappIconSvg'

export default function Footer() {
  return (
    <div className="bg-brand-dark py-14 md:py-20 w-full">
      <div className="px-10 w-full md:hidden inline-flex justify-center items-center">
        <BaffFooterIconSvg />
      </div>

      <div className="px-10 w-full flex mt-14 justify-center items-center flex-col md:hidden">
        <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">+2348162695360+2348090444452</p>
        <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">contactbafabafa@gmail.com</p>
      </div>

      <div className="md:hidden flex flex-col justify-center items-center mt-10 gap-3">
        <p className="text-[#FEFEFE] font-montserrat font-semibold">Follow us</p>
        <div className="flex justify-center items-center gap-6">
          <TwitterSvg />
          <FacebookSvg />
          <InstagramSvg />
          <LinkdlnSvg />
        </div>
      </div>

      <div className="md:hidden flex flex-col items-center gap-6 mt-20">
        <Link href={'/terms'} className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
          Terms And Conditions
        </Link>
        <Link href={'/privacy'} className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
          Privacy Policy
        </Link>
      </div>

      <div className="md:hidden mt-20 text-center">
        <p className="text-[#FEFEFE] font-semibold font-montserrat text-xs">@copyright 2025 Baffa Baff. All rights reserved</p>
      </div>

      <div>
        <div className="hidden md:flex md:px-20 md:justify-between items-center">
          <div className="flex gap-6 items-center">
            <p className="text-[#FEFEFE] font-montserrat font-semibold">Follow us</p>

            <div className="flex justify-center items-center gap-6">
              <Link href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer">
                <TwitterSvg />
              </Link>
              <Link href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                <FacebookSvg />
              </Link>
              <Link href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                <InstagramSvg />
              </Link>
              <Link href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
                <LinkdlnSvg />
              </Link>
              <Link href="https://wa.me/2348077775745" target="_blank" rel="noopener noreferrer">
                <WhatappIconSvg />
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center gap-6">
            <Link href={'/terms'} className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
              Terms And Conditions
            </Link>
            <Link href={'/privacy'} className="font-montserrat font-semibold text-sm text-[#FEFEFE]">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="md:block md:border-1 md:border-[#FEFEFE80] md:my-10 hidden" />

        <div className="md:flex md:justify-between md:items-center md:w-full md:px-20 hidden">
          <div>
            <BaffFooterIconSvg />
          </div>
          <div>
            <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">+2348162695360+2348077775745</p>
            <p className="font-montserrat font-semibold text-sm text-[#FEFEFE]">contactbafabafa@gmail.com</p>
          </div>
          <div>
            <p className="text-[#FEFEFE] font-semibold font-montserrat text-xs">@copyright 2025 Baffa Baff. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  )
}
