import Link from "next/link"
import Image from "next/image"
import { MoveUpRight } from "lucide-react"

interface Props {
  image: string
  text: string
  href: string
}

export default function ExploreCard({ image, text, href }: Props) {
  return (
    <Link
      href={href}
      className="group relative w-full h-[426px] md:h-screen rounded-3xl overflow-hidden transition-transform duration-500 ease-out active:scale-[0.98]"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={`${text} category background`}
        fill
        className="object-cover rounded-3xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-3xl transition-colors duration-500 group-hover:from-black/60" />

      {/* Content */}
      <div className="absolute bottom-10 left-5 max-w-24 md:max-w-[23.125rem] transition-transform duration-500 group-hover:translate-y-[-2px]">
        <MoveUpRight className="w-12 h-12 md:w-16 md:h-16 font-black text-brand transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        <h1 className="font-montserrat font-black text-3xl md:text-6xl text-brand drop-shadow-md">
          {text}
        </h1>
      </div>
    </Link>
  )
}
