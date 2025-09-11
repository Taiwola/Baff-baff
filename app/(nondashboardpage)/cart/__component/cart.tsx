import RelatedProducts from "../../component/relatedProducts"
import ShoppingBag from "./shoppingBag"

export default function Cart() {
  const cartExist = false
  return (
    <div className="w-full py-10">
      <div className="container mx-auto">
        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="font-montserrat font-bold text-4xl uppercase">
              SHOPPING BAG
            </h2>
            <div>
              <ShoppingBag cartExist={cartExist} />
            </div>
          </div>

          <div>
            <h2 className="font-montserrat font-bold text-[18px] uppercase">
              You also bought
            </h2>

            <div>
              <RelatedProducts
                length={4}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
