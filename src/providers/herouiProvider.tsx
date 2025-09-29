"use client"
import { HeroUIProvider, ToastProvider } from "@heroui/react"

type Props = {
  children: React.ReactNode
}

export default function HeroUiProvider({ children }: Props) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center"/>
      {children}
    </HeroUIProvider>
  )
}
