import { OurStorySvg } from "@assets/svg/ourStorysvg"

export default function Story() {
  return (
    <section className="py-12 w-full container mx-auto flex flex-col md:flex-row gap-6 md:gap-4">
      <article className="flex flex-col gap-6 md:gap-4 w-full md:w-fit md:text-left  md:justify-center">
        <h2 className="font-roboto">
          Our Story
        </h2>

        <p className="font-montserrat font-normal text-xs md:text-base leading-tight">
          We started as a couple Nigerians discontented with the present
          quality and price of clothing. How there isn&apos;t any home grown
          brand we can trust to deliver good quality clothing at a pocket
          friendly price. Instead of doing nothing....
          <span className="font-bold">WE ARE THE CHANGE.</span> We are the
          proper fashion brand on a mission to deliver good quality, pocket
          friendly clothing to Nigeria, Africa and the world. Pushing to
          develop our value chain and revolutionize how the globe sees the
          African fashion industry.
        </p>
      </article>

      <article className="rounded-md w-full">
        <OurStorySvg className="w-full h-auto" />
      </article>
    </section>
  )
}
