import { redirect } from 'next/navigation'

import { ApiClient } from '@utils/api'
import { toast } from '@hooks/useToast'
import { CartDto } from '@validations/cart'
import { CheckoutDto } from '@validations/checkout'
import { UpdateCartDto } from '@validations/cart/update-cart.validation'

export async function getCart(): Promise<Cart | null> {
  const response = await ApiClient.get<Cart>('/carts')

  if (response.code >= 400) {
    return null
  }

  return response.data
}

export async function updateCart(id: string, payload: UpdateCartDto) {
  const response = await ApiClient.patch<Cart>(`/carts/${id}`, payload)

  if (response.code >= 400) {
    return null
  }

  return response.data
}

export async function syncCart(data: CartDto) {
  const response = await ApiClient.post<Cart>('/carts', data)

  if (response.code >= 400) {
    return null
  }

  return response.data
}

export async function checkout(data: CheckoutDto) {
  const response = await ApiClient.post<CheckoutResponse>('/carts/checkout', data)

  if (response.code >= 400) {
    toast.error({ title: 'Error Occurred', description: response.message })
    return null
  }

  redirect(response.data.checkoutUrl)
}
