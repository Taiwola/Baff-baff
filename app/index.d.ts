interface MenuItem {
  href: string
  label: string
  className: string
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
