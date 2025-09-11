"use client"
import ProductCard from "./productCard"

export default function RelatedProducts({
  length,
  className,
}: {
  length: number
  className: string
}) {
  const products = Array.from({ length: length }, (_, index) => ({
    id: index + 1,
  }))
  return (
    <div className="py-9">
      <div className={className}>
        {products.map((product) => (
          <ProductCard key={product.id} />
        ))}
      </div>
    </div>
  )
}
