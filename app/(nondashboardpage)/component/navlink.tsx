import Link from "next/link"

export default function NavLink({
  href,
  children,
  className,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={`Visit ${children}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
