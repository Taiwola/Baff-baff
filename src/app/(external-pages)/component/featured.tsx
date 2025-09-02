import ProductCard from "./productCard"

export default function Featured() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <h2 className="font-montserrat font-black text-black text-base">
            FEATURED PRODUCTS
          </h2>

          <div className="flex gap-1.5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  )
}
