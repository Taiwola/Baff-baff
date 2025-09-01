import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react"

export default function SortDropDown() {
  return (
    <Dropdown className="border-[#1C1F240F] border">
      <DropdownTrigger>
        <Button variant="light" className="flex items-center">
          <Bars3BottomLeftIcon className="w-24 h24" />
          <span className="font-poppins uppercase font-medium">Sort By</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="p-0 m-0">
        <DropdownItem
          key="new"
          className="border-b rounded-none py-4 border-[#BCBCBC] font-normal"
        >
          Featured
        </DropdownItem>
        <DropdownItem
          key="copy"
          className="border-b rounded-none py-4 border-[#BCBCBC] font-normal"
        >
          Best Selling
        </DropdownItem>
        <DropdownItem
          key="edit"
          className="border-b rounded-none py-4 border-[#BCBCBC] font-normal"
        >
          Alphabetically, A-Z
        </DropdownItem>
        <DropdownItem
          key="edit"
          className="border-b rounded-none py-4 border-[#BCBCBC] font-normal"
        >
          Date, Old to New
        </DropdownItem>
        <DropdownItem key="edit" className="rounded-none py-4 font-normal">
          Date, New to Old
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
