import MarketplaceAccordion from "./accordion"
import ActionGroupButton from "./actionButtonGroup"
import MobileFilterCard from "./mobileFilterSort"
import Products from "./product"

export default function Marketplace() {
  return (
    <div className="py-6 w-full">
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="border-t-1 border-b-1 h-[47.78%] w-[25%] border-[#20202066] hidden md:block">
            <MarketplaceAccordion />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <h2 className="font-roboto font-extrabold text-base md:text-3xl uppercase">
              Corporate
            </h2>
            <div className="my-3 hidden md:block">
              <ActionGroupButton />
            </div>
            <p className="font-montserrat font-normal uppercase text-xs">
              Stand out and look goods rocking top quality work shirts.
            </p>

            <div>
              <MobileFilterCard />
            </div>
            <div>
              <Products />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
