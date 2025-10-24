"use client"

import { HeroUIProvider } from "@heroui/react"

type Props = {
  children: React.ReactNode
}

export default function HeroUiProvider({ children }: Props) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}
