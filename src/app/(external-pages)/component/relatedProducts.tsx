"use client"
import ProductCard from "./productCard"

// Sample array of 3 products
const products = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
}))

export default function RelatedProducts() {
  return (
    <div className="py-9">
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} />
        ))}
      </div>
    </div>
  )
}
