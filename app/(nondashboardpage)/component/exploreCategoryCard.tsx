import Image from "next/image"
import { MoveUpRight } from "lucide-react"

interface ExploreCategoryCardProps {
  imageUrl: string
  text: string
}

export default function ExploreCategoryCard({
  imageUrl,
  text,
}: ExploreCategoryCardProps) {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={imageUrl}
        alt={`${text} category background`}
        fill
        className="object-cover rounded-3xl"
      />
      <div className="absolute bottom-10 left-5">
        <MoveUpRight className="w-12 h-12 md:w-16 md:h16 font-black text-[#EEEEEE]" />
        <h1 className="font-montserrat font-black text-3xl md:text-6xl text-[#EEEEEE]">
          {text}
        </h1>
      </div>
    </div>
  )
}
