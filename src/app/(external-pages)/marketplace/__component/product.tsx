"use client"
import ProductCard from "../../component/productCard"

// Sample array of 20 products
const products = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
}))

export default function Products() {
  return (
    <div className="py-2">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} />
        ))}
      </div>
    </div>
  )
}
