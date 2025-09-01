"use client"
import { useState, useCallback } from "react"
import {
  UserIcon,
  ShoppingBagIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import NavLink from "./navlink"
import { menuItems } from "../../data/menuItems"
import Link from "next/link"
import LargeLogoSvg from "@/app/asset/svg/largeLogoSvg"
import NavSidebar from "./navSideBar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  return (
    <header className="w-full sticky backdrop-blur-sm top-0 z-50 border-b border-[#2020201A] shadow">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-5">
          {/* Menu bar and links */}
          <div className="flex justify-between items-center">
            <div className="flex gap-6 items-center">
              <div
                className="w-6 h-6 md:hidden"
                onClick={toggleMenu}
                role="button"
                aria-label="Toggle menu"
                tabIndex={0}
              >
                <Bars3Icon className="w-6 h-6 cursor-pointer" />
              </div>
              <div className="w-6 h-6 md:hidden">
                <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer" />
              </div>
            </div>
            <div className="hidden md:flex md:gap-6">
              {menuItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className={item.className}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="inline-block">
              <Link href={"/"}>
                <LargeLogoSvg className="w-full h-auto" />
              </Link>
            </div>
          </div>

          {/* User and cart */}
          <div className="flex justify-end items-center gap-6 md:gap-8">
            <div
              className="w-6 h-6"
              role="button"
              aria-label="User profile"
              tabIndex={0}
            >
              <UserIcon className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="w-6 h-6 hidden md:block">
              <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer" />
            </div>
            <div
              className="w-6 h-6"
              role="button"
              aria-label="Shopping cart"
              tabIndex={0}
            >
              <ShoppingBagIcon className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <NavSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  )
}
