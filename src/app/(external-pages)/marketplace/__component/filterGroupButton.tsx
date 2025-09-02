"use client"

import { Button } from "@heroui/react"
import { ComponentType, SVGProps } from "react"

export default function FilterButtonGroup({
  className,
  Logo,
  text,
  onclick,
}: {
  className: string
  Logo: ComponentType<SVGProps<SVGSVGElement>>
  text: string
  onclick?: () => void
}) {
  return (
    <Button onPress={onclick} variant="bordered" className={className}>
      <Logo className="h-5 w-5" />
      <span className="font-poppins font-normal text-base">{text}</span>
    </Button>
  )
}
