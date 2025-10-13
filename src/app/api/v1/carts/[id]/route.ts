'use server'

import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { adaptCart } from '@adapters/cart.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { getCartById, getOneCartById, getCartItemKey, updateCart } from '@services/cart'
import { updateCartSchema } from '@validations/cart/update-cart.validation'
import { createMeasurement, getMeasurementByFilter, updateMeasurement } from '@services/measurement'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  try {
    const body = await req.json()

    const result = updateCartSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 400)
    }

    const { action, item } = result.data

    const cart = await getCartById(id)
    if (!cart) return errorResponse('Cart not found', null, 404)

    const key = getCartItemKey({ id: item.productId, fitting: item.fitting, size: item.size })
    const map = new Map(cart.items.map((it) => [getCartItemKey({ id: it.product.toString(), fitting: it.fitting, size: it.size }), it]))

    if (action === 'add' && map.has(key)) {
      const duplicateItemQuantity = map.get(key)?.quantity || 0
      map.set(key, { ...item, product: item.productId, quantity: item.quantity + duplicateItemQuantity })
    } else if (action === 'add') {
      map.set(key, { ...item, product: item.productId })
    } else if (action === 'update') {
      if (map.has(key)) map.set(key, { ...item, product: item.productId })
    } else if (action === 'remove') {
      map.delete(key)
    }

    const cartItems = Array.from(map.values())
    const updatedCart = await updateCart(id, { items: cartItems })
    if (!updatedCart) return errorResponse('Error updating cart', null, 404)
    if (item.saveMeasurements && item.size === 'Bespoke' && cart.userId) {
      const userMeasurement = await getMeasurementByFilter({ userId: cart.userId })
      if (userMeasurement) updateMeasurement(userMeasurement.id, { ...item.measurements })
      else createMeasurement({ ...item.measurements, userId: cart.userId.toString() })
    }
    return sendResponse('Cart updated', adaptCart(updatedCart))
  } catch (error) {
    console.error('Error updating Cart', error)
    return sendResponse('Internal server error', null, 500)
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params
  const Cart = await getOneCartById(id)
  if (!Cart) return errorResponse('Cart not found', null, 404)
  return sendResponse('Cart found', adaptCart(Cart), 200)
}
