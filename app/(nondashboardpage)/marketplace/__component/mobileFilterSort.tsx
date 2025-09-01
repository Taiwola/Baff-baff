"use client"

import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline"
import FilterButtonGroup from "./filterGroupButton"
import MobileFilterSideBar from "./mobileFilterSideBar"
import { useCallback, useState } from "react"
import MobileSortDrawer from "./mobileSortdrawer"

export default function MobileFilterSortCard() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false)

  const toggleFilter = useCallback(() => setIsFilterOpen((prev) => !prev), [])
  const toggleSort = useCallback(() => setIsSortOpen((prev) => !prev), [])

  return (
    <>
      <div className="flex mt-6 md:hidden">
        <div className="w-full">
          <FilterButtonGroup
            Logo={AdjustmentsHorizontalIcon}
            className="w-full text-black py-7 rounded-none border-1 flex gap-2.5"
            text="Filters"
            onclick={toggleFilter}
          />
        </div>
        <div className="w-full">
          <FilterButtonGroup
            Logo={Bars3BottomLeftIcon}
            className="w-full text-black py-7 rounded-none border-1 flex flex-row-reverse gap-2.5"
            text="Sorts"
            onclick={toggleSort}
          />
        </div>
      </div>
      <MobileFilterSideBar isOpen={isFilterOpen} toggle={toggleFilter} />
      <MobileSortDrawer isOpen={isSortOpen} toggle={toggleSort} />
    </>
  )
}
