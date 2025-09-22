'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Box, Package, UsersRound, ShoppingCart, Settings } from 'lucide-react'

import Logo from '@assets/images/Dashboard-logo.png'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar bg-brand-dark px-5">

      <Link href="/" className="h-20 mb-5 flex justify-center items-center">
        <Image src={Logo} alt="dashboard-logo" quality={100} />
      </Link>

 
      <nav>
        <ul className="flex flex-col gap-2.5">
          {routes.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <Link
                href={path}
                className={`flex items-center gap-3 h-[3.125rem] w-full rounded-[0.625rem] px-2.5 transition-colors capitalize text-sm
                    ${pathname.startsWith(path) ? 'bg-white text-brand-dark font-medium' : 'text-white hover:bg-white/10'}
                  `}
              >
                <Icon className="w-6 h-6" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

const routes = [
  { name: 'overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'users', path: '/dashboard/users', icon: Users },
  { name: 'materials', path: '/dashboard/materials', icon: Box },
  { name: 'products', path: '/dashboard/products', icon: Package },
  { name: 'collaborators', path: '/dashboard/collaborators', icon: UsersRound },
  { name: 'orders', path: '/dashboard/orders', icon: ShoppingCart },
  { name: 'settings', path: '/dashboard/settings', icon: Settings },
]
