import RelatedProducts from "@/app/(nondashboardpage)/component/relatedProducts"
import ProductBreadCrumb from "./breadcrumb"
import ProductCarousel from "./productCarousel"
import ProductDetails from "./productDetails"

export function Product() {
  return (
    <div>
      <div className="w-full py-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:hidden">
              <ProductBreadCrumb />
            </div>
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-[45.83%]">
                <ProductCarousel />
              </div>
              <div className="flex flex-col">
                <div className="hidden md:block">
                  <ProductBreadCrumb />
                </div>
                <div>
                  <ProductDetails />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="font-montserrat font-bold text-xl uppercase">
              you may also like
            </h2>

            <div>
              <RelatedProducts length={3} className="grid grid-cols-3 gap-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
