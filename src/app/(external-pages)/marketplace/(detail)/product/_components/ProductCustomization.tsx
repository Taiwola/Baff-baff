'use client'

import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Tab, Tabs } from '@heroui/react'
import { useRouter } from 'next/navigation'

import { Button } from '@components/ui'
import ProductSizes from './ProductSizes'
import ProductBespoke from './ProductBespoke'
import { QuantityButton } from '@components/features/cart'

import { formatCurrency, getBespokePrice, getPriceForProudct, getPriceRange, getSize } from '@utils'
import { useCart } from '@contexts/carts.context'
import { useProductCustomization } from '@hooks/useProductCustomization'

type Props = {
  product: Product
  shirtMeasurement: ShirtMeasurement
  trouserMeasurement: TrouserMeasurement
}

export default function ProductCustomization({ product, shirtMeasurement, trouserMeasurement }: Props) {
  const router = useRouter()
  const { addItem } = useCart()
  const { state, setFitting, setSize, setQuantity, setShirtMeasurements, setTrouserMeasurements, toggleSaveMeasurements } = useProductCustomization({
    productId: product.id,
    fitting: 'fit',
    size: 'l',
    quantity: 1,
    shirtMeasurement,
    trouserMeasurement,
    saveMeasurements: false
  })

  const measurements = product.type === 'trouser' || product.type === 'short' ? state.trouserMeasurement : state.shirtMeasurement
  const price =
    state.size !== 'Bespoke'
      ? getPriceForProudct(product.sizes[state.size].price, state.fitting)
      : getBespokePrice(product.sizes[getSize(measurements)].price, state.fitting, Number(state?.trouserMeasurement?.waist || 0))
  const discountPrice =
    state.size !== 'Bespoke' && product.sizes[state.size].discountPrice
      ? getPriceForProudct(Number(product.sizes[state.size].discountPrice), state.fitting)
      : getBespokePrice(Number(product.sizes[getSize(measurements)].discountPrice), state.fitting, Number(state?.trouserMeasurement?.waist || 0))
  const { min, max } = getPriceRange(product)

  function handleAddToCart() {
    const finalPrice = typeof discountPrice === 'number' && !isNaN(discountPrice) ? discountPrice : price

    addItem({
      id: uuidv4(),
      product,
      price: finalPrice,
      name: product.name,
      fitting: state.fitting,
      size: state.size,
      saveMeasurements: state.saveMeasurements,
      measurements: {
        ...state.shirtMeasurement,
        ...state.trouserMeasurement,
        length: state.shirtMeasurement.length,
        trouserLength: state.trouserMeasurement.length
      },
      quantity: state.quantity
    })

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'AddToCart', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: finalPrice * state.quantity,
        currency: 'NGN',
        num_items: state.quantity
      })
    }

    router.push('/cart')
  }

  return (
    <>
      <div className="flex justify-start items-center gap-1">
        <h6 className="text-[1.25rem]">
          {formatCurrency(min)} - {formatCurrency(max)}
        </h6>
      </div>

      <p className="text-[0.6875rem]">Top quality materials used for every piece</p>

      <div className="w-full mt-5">
        <Tabs
          aria-label="Options"
          classNames={{
            base: 'w-full',
            tab: 'px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 w-auto data-[selected=true]:text-black data-[selected=true]:border-b data-[selected=true]:border-black',
            tabList: 'flex gap-4'
          }}
          onSelectionChange={(key) => setSize(key as Size)}
        >
          <Tab key="s" title="SELECT SIZE">
            <ProductSizes
              sizes={product.sizes}
              activeFitting={state.fitting}
              type={product.type}
              price={price}
              discountPrice={discountPrice}
              onChangeFitting={setFitting}
              onChangeSize={setSize}
            />
          </Tab>

          <Tab key="Bespoke" title="BESPOKE">
            <ProductBespoke
              sizes={product.sizes}
              type={product.type}
              price={price}
              discountPrice={discountPrice}
              activeFitting={state.fitting}
              onChangeFitting={setFitting}
              saveMeasurements={state.saveMeasurements}
              shirtMeasurement={state.shirtMeasurement}
              trouserMeasurement={state.trouserMeasurement}
              onChangeShirtMeasurement={setShirtMeasurements}
              onChangeTrouserMeasurement={setTrouserMeasurements}
              toggleSaveMeasurements={toggleSaveMeasurements}
            />
          </Tab>
        </Tabs>
      </div>

      <div className="mt-5">
        <p className="text-sm">QUANTITY</p>

        <QuantityButton quantity={state.quantity} setQuantity={setQuantity} />
      </div>

      <Button fullWidth={true} className="bg-black mt-5 mb-7.5 font-montserrat text-base font-bold" size="md" rounded="md" onClick={handleAddToCart}>
        ADD TO CART
      </Button>
    </>
  )
}
