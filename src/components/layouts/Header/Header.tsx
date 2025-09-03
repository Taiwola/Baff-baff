"use client"

import Link from "next/link";
import { useState } from "react"
import { Menu, X } from "lucide-react";
import { UserIcon, ShoppingBagIcon, MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

import LargeLogoSvg from "@assets/svg/largeLogoSvg"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Market Place", href: "/marketplace" },
    { label: "Corporates", href: "/corporates" },
    { label: "Casuals", href: "/casuals" },
  ];

  return (
    <header className="pt-8 pb-0 md:pb-8 w-full sticky backdrop-blur-sm top-0 z-50 border-b border-foreground">
      <nav className="app-container flex items-center justify-between pb-8 md:pb-0">

        {/* Left side (desktop nav / mobile menu button) */}
        <div className="flex items-center gap-7 flex-1">
          {/* Mobile menu button */}
          <button
            className="md:hidden icon-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Search icon (mobile) */}
          <button className="md:hidden" aria-label="Search">
            <MagnifyingGlassIcon className="icon-button" />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-xl font-bold">
            <LargeLogoSvg className="w-full h-auto" />
          </Link>
        </div>

        {/* Right side (icons) */}
        <div className="flex items-center justify-end gap-12 flex-1">
          {/* Desktop search */}
          <button className="hidden md:inline" aria-label="Search">
            <MagnifyingGlassIcon className="icon-button" />
          </button>

          <button aria-label="User Account">
            <UserIcon className="icon-button" />
          </button>
          <button aria-label="Cart">
            <ShoppingBagIcon className="icon-button" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="md:hidden mobile-dropdown">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="p-4 flex justify-between items-center border-t border-foreground"
              >
                <Link
                  href={link.href}
                  className="block w-full nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>

                <ChevronRightIcon className="icon-button" />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
