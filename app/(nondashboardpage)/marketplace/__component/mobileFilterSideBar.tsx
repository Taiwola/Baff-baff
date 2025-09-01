import {
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@heroui/react"

export default function MobileFilterSideBar({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: () => void
}) {
  return (
    <div
      className={`absolute h-screen w-full top-[97px] left-0 z-90 md:hidden transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-[rgba(224,224,224,0.5)] z-10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      />

      {/* Content */}
      <div className="relative flex z-20 h-full">
        {/* Sidebar Content with Container */}
        <div className="w-4/5 bg-white">
          <div className="">
            <div className="border-b-1 border-[#20202080]">
              <div className=" container mx-auto py-6">
                <div className="flex gap-2 items-center">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <h2 className="uppercase font-poppins font-medium">
                    Filters
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 border-b border-[#20202033]">
              <h3 className="font-poppins font-normal">Availability</h3>
              <ChevronRightIcon className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex justify-between items-center py-6 border-b border-[#20202033]">
              <h3 className="font-poppins font-normal">Design</h3>
              <ChevronRightIcon className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex justify-between items-center py-6 border-b border-[#20202033]">
              <h3 className="font-poppins font-normal">Price</h3>
              <ChevronRightIcon className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
        {/* Close Button Section */}
        <div className="h-screen w-1/5 inline-flex pt-4 justify-center bg-transparent">
          <Button variant="bordered" onPress={toggle} className="border-none">
            <XMarkIcon className="w-7 h-7 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
