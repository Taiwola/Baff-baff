"use client"

import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@heroui/react"

interface MobileSortSideBarProps {
  isOpen: boolean
  toggle: () => void
}

export default function MobileSortSideBar({
  isOpen,
  toggle,
}: MobileSortSideBarProps) {
  return (
    <Drawer isOpen={isOpen} placement="bottom" onOpenChange={toggle}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1"></DrawerHeader>
            <DrawerBody>
              <ul className="space-y-2">
                <li>
                  <div className="border-b rounded-none py-4 border-[#BCBCBC] flex gap-3 justify-center items-center">
                    <Bars3BottomLeftIcon className="w-6 h-6" />
                    <h2 className="font-poppins font-medium uppercase">
                      Sort By
                    </h2>
                  </div>
                </li>
                <li>
                  <Button
                    className="w-full text-left border-b rounded-none py-4 border-[#BCBCBC] font-normal"
                    variant="light"
                    onPress={() => {
                      // Add sort logic here (e.g., Featured)
                      onClose()
                    }}
                  >
                    Featured
                  </Button>
                </li>
                <li>
                  <Button
                    className="w-full text-left border-b rounded-none py-4 border-[#BCBCBC] font-normal"
                    variant="light"
                    onPress={() => {
                      // Add sort logic here (e.g., Best Selling)
                      onClose()
                    }}
                  >
                    Best Selling
                  </Button>
                </li>
                <li>
                  <Button
                    className="w-full text-left border-b rounded-none py-4 border-[#BCBCBC] font-normal"
                    variant="light"
                    onPress={() => {
                      // Add sort logic here (e.g., Alphabetically, A-Z)
                      onClose()
                    }}
                  >
                    Alphabetically, A-Z
                  </Button>
                </li>
                <li>
                  <Button
                    className="w-full text-left border-b rounded-none py-4 border-[#BCBCBC] font-normal"
                    variant="light"
                    onPress={() => {
                      // Add sort logic here (e.g., Date, Old to New)
                      onClose()
                    }}
                  >
                    Date, Old to New
                  </Button>
                </li>
                <li>
                  <Button
                    className="w-full text-left rounded-none py-4 font-normal"
                    variant="light"
                    onPress={() => {
                      // Add sort logic here (e.g., Date, New to Old)
                      onClose()
                    }}
                  >
                    Date, New to Old
                  </Button>
                </li>
              </ul>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
