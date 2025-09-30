'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Box, Package, UsersRound, ShoppingCart, Settings, MapIcon, Menu } from 'lucide-react'

import Logo from '@assets/images/Dashboard-logo.png'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-5 left-5 md:hidden z-50 text-brand-dark"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed md:relative top-0 left-0 h-full z-50 md:z-0 bg-brand-dark px-5 transform
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 md:w-full`}
      >
        {/* Logo */}
        <Link href="/" className="h-20 mb-5 flex justify-center items-center">
          <Image src={Logo} alt="dashboard-logo" quality={100} />
        </Link>

        {/* Nav */}
        <nav>
          <ul className="flex flex-col gap-2.5">
            {routes.map(({ name, path, icon: Icon }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`flex items-center gap-3 h-[3.125rem] w-full rounded-[0.625rem] px-2.5 transition-colors capitalize text-sm
                    ${pathname.endsWith(path)
                      ? 'bg-white text-brand-dark font-medium'
                      : 'text-white hover:bg-white/10'}
                  `}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-6 h-6" />
                  <span className="md:hidden lg:inline">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

const routes = [
  { name: 'overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'users', path: '/dashboard/users', icon: Users },
  { name: 'materials', path: '/dashboard/materials', icon: Box },
  { name: 'products', path: '/dashboard/products', icon: Package },
  { name: 'region', path: '/dashboard/region', icon: MapIcon },
  { name: 'collaborators', path: '/dashboard/collaborators', icon: UsersRound },
  { name: 'orders', path: '/dashboard/orders', icon: ShoppingCart },
  { name: 'settings', path: '/dashboard/settings', icon: Settings },
]