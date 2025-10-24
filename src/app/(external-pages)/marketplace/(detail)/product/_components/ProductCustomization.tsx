'use client'

import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Tab, Tabs } from '@heroui/react'
import { useRouter } from 'next/navigation'

import { Button } from '@components/ui'
import ProductSizes from './ProductSizes'
import ProductBespoke from './ProductBespoke'
import { QuantityButton } from '@components/features/cart'

import { formatCurrency, getSize } from '@utils'
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

  const measurements = product.type === 'trouser' || product.type === 'short' ? trouserMeasurement : shirtMeasurement
  const price = state.size !== 'Bespoke' ? product.sizes[state.size].price : product.sizes[getSize(measurements)].price
  const discountPrice = state.size !== 'Bespoke' && product.sizes[state.size].discountPrice ? product.sizes[state.size].discountPrice : product.sizes[getSize(measurements)].discountPrice

  function handleAddToCart() {
    addItem({
      id: uuidv4(),
      product,
      price: discountPrice ?? price,
      name: product.name,
      fitting: state.fitting,
      size: state.size,
      saveMeasurements: state.saveMeasurements,
      measurements: { ...state.shirtMeasurement, ...state.trouserMeasurement, length: state.shirtMeasurement.length, trouserLength: state.trouserMeasurement.length },
      quantity: state.quantity
    })

    router.push('/cart')
  }

  return (
    <>
      <div className='flex justify-start items-center gap-1'>
        <h6 className='text-[1.25rem]'>{formatCurrency(price)}</h6>
        {discountPrice ? <h6 className='text-[1.25rem]'>{`-${formatCurrency(discountPrice)}`}</h6> : null}
      </div>

      <p className='text-[0.6875rem]'>Bulk pricing available for quantities of 5 units or more</p>

      <div className='w-full mt-5'>
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
              onChangeFitting={setFitting}
              onChangeSize={setSize}
            />
          </Tab>

          <Tab key="Bespoke" title="BESPOKE">
            <ProductBespoke
              sizes={product.sizes}
              type={product.type}
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


      <div className='mt-5'>
        <p className='text-sm'>QUANTITY</p>

        <QuantityButton
          quantity={state.quantity}
          setQuantity={setQuantity}
        />
      </div>

      <Button
        fullWidth={true}
        className='bg-black mt-5 mb-7.5 font-montserrat text-base font-bold'
        size='md'
        rounded='md'
        onClick={handleAddToCart}
      >
        ADD TO CART
      </Button>
    </>
  )
}



