import { ProductList } from '@components/ui'
import { Product } from '@models/product.model'
import React from 'react'


export default function MarketPlaceProducts() {
   return (
      <div className='w-full'>
         <ProductList products={products} variant='marketplace' />
      </div>
   )
}

const products: Product[] = [
   {
      id: "1",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "2",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "3",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "4",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "5",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "6",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "7",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "8",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "9",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "10",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "11",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "12",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
   {
      id: "13",
      image: '/images/product-image.png',
      name: 'wavy boy shirt',
      stockCount: 3,
      price: 70000,
      createdAt: '12-03-2025'
   },
]