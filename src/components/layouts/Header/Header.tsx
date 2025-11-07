"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation";
import { UserIcon, ShoppingBagIcon, MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Modal, ModalContent, ModalBody, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@heroui/react";

import LargeLogoSvg from "@assets/svg/largeLogoSvg";
import SmallLogoSvg from "@assets/svg/smallLogoSvg";
import { Button } from "@components/ui";
import { useCart } from "@contexts/carts.context";

type UserAccount = {
  key: string
  label: string
  href: string
}

export default function Header() {
  const router = useRouter();
  const { reset } = useCart()
  const pathname = usePathname()
  const { data: session, status, update } = useSession()
  // console.log('status', status);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false); // mobile menu

  const { isOpen: searchOpen, onOpen, onClose } = useDisclosure();

  const user = session?.user
  const isAuth = status === 'authenticated'
  const isAdmin = session?.user?.role === 'admin'

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/marketplace/${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  async function handlePressUserItem(item: UserAccount) {
    if (item.key === 'sign-out') {
      reset() // clear cart local state
      signOut({ 'redirectTo': '/login' })
      return;
    }

    else if (item.key === 'profile' && !isAuth) {
      router.push('/login')
    }

    else if (item.key === 'profile' && isAuth && isAdmin) {
      router.push('/dashboard')
    }

    else router.push(item.href)
  }

  useEffect(() => {
    if (status === 'loading') {
      update();
    }
  }, [session, status, update]);

  return (
    <>
      <header className="pt-4 pb-0 md:pb-4 w-full sticky backdrop-blur-sm top-0 z-40 border-b border-foreground bg-white">
        <nav className="flex items-center justify-between pb-8 md:pb-0 app-container">
          {/* Left side */}
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
            <button
              className="md:hidden"
              aria-label="Search"
              onClick={onOpen}
            >
              <MagnifyingGlassIcon className="icon-button" />
            </button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`nav-link ${link.href.endsWith(pathname) ? 'border-b border-brand-dark' : ''}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}      // Slightly enlarge on hover
              whileTap={{ scale: 0.92 }}         // Slightly shrink when pressed
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Link href="/" className="text-xl font-bold block">
                <LargeLogoSvg className="w-full h-auto hidden md:block" />
                <SmallLogoSvg className="w-full h-auto md:hidden" />
              </Link>
            </motion.div>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-end gap-12 flex-1">
            {/* Desktop search */}
            <button
              className="hidden md:inline focus:outline:none"
              aria-label="Search"
              onClick={onOpen}
            >
              <MagnifyingGlassIcon className="icon-button" />
            </button>

            {isAuth ? (
              <Dropdown>
                <DropdownTrigger>
                  <button aria-label="User Account">
                    <UserIcon className="icon-button" />
                  </button>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="User Account Actions"
                  className="h-auto w-51 rounded-[20px] border border-grey bg-background font-lexend p-0 gap-0 overflow-hidden m-0"
                >


                  {userAccountItems.map((item, idx) => (
                    <>
                      {item.key === 'profile' ? (
                        <DropdownItem
                          key={item.key}
                          onClick={() => handlePressUserItem(item)}
                          className={`px-5 py-3.5 border-b border-foreground text-sm text-black hover:bg-brand-purple/10 hover:text-brand-purple`}
                        >
                          <User
                            className="hover:text-brand-purple"
                            avatarProps={{
                              className: 'p-0 text-black text-sm',
                              classNames: { base: 'hidden w-full' }
                            }}
                            classNames={{
                              wrapper: 'hover:text-brand-purple!',
                              base: "p-0 text-black text-sm font-lexend",
                              name: "text-black text-sm font-lexend",
                              description: "text-[11px] font-light text-black font-lexend",
                            }}
                            description={user?.email}
                            name={user?.name}
                          />
                        </DropdownItem>

                      ) : (
                        <DropdownItem
                          onClick={() => handlePressUserItem(item)}
                          key={item.key}
                          className={`px-5 py-3.5 m-0 border-b border-foreground text-sm hover:bg-brand-purple/10 hover:text-brand-purple ${item.key === "sign-out" ? "text-danger" : "text-black"} ${idx === userAccountItems.length - 1 ? 'border-none' : ''}`}
                        >
                          {item.label}
                        </DropdownItem>

                      )}
                    </>
                  ))}
                </DropdownMenu>
              </Dropdown>

            ) : (
              <Button size="sm" as={'link'} href={'/login'}>Login</Button>
            )}

            <Link href="/cart">
              <ShoppingBagIcon className="icon-button" />
            </Link>
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

      {/* Search Modal */}
      {/* Search Modal */}
      <Modal
        isOpen={searchOpen}
        onOpenChange={(open) => !open && onClose()}
        placement="top"
        hideCloseButton
        backdrop="transparent"
        classNames={{
          base: "w-full max-w-none m-0 p-0 top-[var(--header-height,84px)]", // match header height dynamically
          body: "p-0",
        }}
        motionProps={{
          variants: {
            enter: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
          },
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
      >
        <ModalContent className="fixed left-0 right-0 z-40 bg-background border-b border-foreground rounded-none shadow-sm">
          <ModalBody>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center justify-between w-full px-5 h-12.5 md:h-18.5"
            >
              <MagnifyingGlassIcon className="h-8.5 w-8.5 text-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 mx-4 bg-transparent outline-none text-sm md:text-base font-montserrat text-black placeholder:text-foreground"
              />
              <button type="button" onClick={onClose} aria-label="Close search">
                <X className="icon-button h-8.5 w-8.5 text-black" />
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
}

const navLinks = [
  { label: "Market Place", href: "/marketplace" },
  { label: "Corporates", href: "/marketplace/corporates" },
  { label: "Casuals", href: "/marketplace/casuals" },
];

const userAccountItems: UserAccount[] = [
  {
    key: "profile",
    label: "Profile",
    href: '/profile'
  },
  {
    key: "order-history",
    label: "Order history",
    href: '/orders'
  },
  {
    key: "address-book",
    label: "Address book",
    href: '/addresses'
  },
  {
    key: "measurement",
    label: "Measurement",
    href: '/measurements'
  },
  {
    key: "sign-out",
    label: "Sign out",
    href: '/'
  },
];