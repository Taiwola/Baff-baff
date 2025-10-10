'use client'

import React from 'react'

import { Button } from '@components/ui'
import ProductItemTab from './ProductItemTab'
import { QuantityButton } from '@components/features/cart'

type Props = {
   product: Product
}

export default function ProductCustomization({ product }: Props) {
   return (
      <>
         <div className='w-full mt-5'>
            <ProductItemTab product={product} />
         </div>


         <div className='mt-5'>
            <p className='text-sm'>QUANTITY</p>
            <QuantityButton />
         </div>

         <Button
            fullWidth={true}
            className='bg-black mt-5 mb-7.5 font-montserrat text-base font-bold'
            size='md'
            rounded='md'
         >
            ADD TO CART
         </Button>
      </>
   )
}

// An enum with all the types of actions to use in our reducer
type CustomizationAction = ''

// An interface for our actions
interface CountAction {
  type: CountActionKind;
  payload: number;
}

// An interface for our state
interface CountState {
  count: number;
}

// Our reducer function that uses a switch statement to handle our actions
function counterReducer(state: CountState, action: CountAction) {
  const { type, payload } = action;

  switch (type) {
    case CountActionKind.INCREASE:
      return {
        ...state,
        value: state.count + payload,
      };
    case CountActionKind.DECREASE:
      return {
        ...state,
        value: state.count - payload,
      };
    default:
      return state;
  }
}
