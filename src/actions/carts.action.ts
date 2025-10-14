import { ApiClient } from '@utils/api'
import { CartDto } from '@validations/cart'
import { UpdateCartDto } from '@validations/cart/update-cart.validation'

export async function getCart(): Promise<Cart | null> {
  const response = await ApiClient.get<Cart>('/carts')

  if (response.code >= 400) {
    console.log('Errror Fetching user cart: ', response.message)
    return null
  }

  return response.data
}

export async function updateCart(id: string, payload: UpdateCartDto) { 
  const response = await ApiClient.patch<Cart>(`/carts/${id}`, payload)

  if (response.code >= 400) {
    console.log('Errror adding cart item: ', response.message)
    return null
  }

  return response.data
}

export async function syncCart(data: CartDto) {
  const response = await ApiClient.post<Cart>('/carts', data)

  if (response.code >= 400) {
    console.log('Errror adding cart item: ', response.message)
    return null
  }

  return response.data
}
