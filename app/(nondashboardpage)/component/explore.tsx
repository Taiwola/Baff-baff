import ExploreCategoryCard from "./exploreCategoryCard"

export default function Explore() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          {/* explore text */}
          <div className="text-center">
            <h2 className="font-montserrat font-black text-black text-base">
              EXPLORE OUR CATEGORIES
            </h2>
          </div>
          {/* explore card */}
          <div className="flex flex-col md:flex-row gap-6 justify-center ">
            <div className="rounded-md w-full">
              <ExploreCategoryCard
                imageUrl="/images/corporate.jpg"
                text="CORPORATE"
              />
            </div>
            <div className="rounded-md w-full">
              <ExploreCategoryCard
                imageUrl="/images/casual.jpg"
                text="CASUAL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
