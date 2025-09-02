"use client"

import { Button } from "@heroui/react"
import SortDropDown from "./dropdown"

export default function ActionGroupButton() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2.5">
          <Button variant="light" className="border rounded-4xl">
            Shirts
          </Button>
          <Button variant="flat" className="rounded-4xl">
            Trousers
          </Button>
          <Button variant="flat" className="rounded-4xl">
            Jackets
          </Button>
        </div>

        <div>
          <SortDropDown />
        </div>
      </div>
    </div>
  )
}
