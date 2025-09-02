import SmallHeroSvg from "@/app/asset/svg/smallherosvg"
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import NavLink from "./navlink"
import { menuItems } from "@/app/data/menuItems"

export default function NavSidebar({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean
  toggleMenu: () => void
}) {
  return (
    <div
      className={`bg-[#EEEEEE] w-full h-screen absolute top-0 left-0 transition-transform duration-300 ease-in-out transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-[#2020201A] shadow">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-8">
            <div className="flex gap-6">
              <div
                role="button"
                aria-label="Close menu"
                tabIndex={0}
                onClick={toggleMenu}
              >
                <XMarkIcon className="w-6 h-6 cursor-pointer" />
              </div>
              <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="flex justify-center">
              <SmallHeroSvg className="max-w-full h-auto" />
            </div>
            <div className="flex items-center gap-6">
              <div
                className="w-6 h-6"
                role="button"
                aria-label="User profile"
                tabIndex={0}
              >
                <UserIcon className="w-6 h-6 cursor-pointer" />
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
      </div>
      <div>
        {menuItems.map((item) => (
          <div
            key={item.href}
            className="border-b border-[#20202033] border-opacity-90"
          >
            <div className="container mx-auto py-4">
              <NavLink
                href={item.href}
                className="flex justify-between font-montserrat font-normal text-[#202020E5]"
                onClick={toggleMenu}
              >
                <span>{item.label}</span>
                <ChevronRightIcon className="w-6 h-6" />
              </NavLink>
            </div>
          </div>
        ))}
        <div className="border bg-[#E0E0E0] border-[#20202033] border-opacity-90">
          <div className="container mx-auto py-4">
            <NavLink
              href="/marketplace"
              className="flex justify-between font-montserrat font-normal"
              onClick={toggleMenu}
            >
              <span>ACCOUNT</span>
              <UserCircleIcon className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
