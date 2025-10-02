import 'server-only'

import axios, { AxiosError } from 'axios'
import { InitiatePayment, InitiatePaymentResponse } from '@index'

const url: string = 'https://api.paystack.co'
const secret = process.env.PAYSTACK_SECRET as string
const headers = {
  Authorization: `Bearer ${secret}`,
  'Content-Type': 'application/json'
}

export async function InitiatePaystackPayment({ currency = 'NGN', ...payload }: InitiatePayment): Promise<InitiatePaymentResponse> {
  try {
    const response = await axios.post(`${url}/transaction/initialize`, { ...payload, currency, amount: payload.amount * 100 }, { headers })

    const { data } = response.data
    return {
      reference: data.reference,
      checkoutUrl: data.authorization_url,
      checkoutCode: data.access_code
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Paystack payment initiation failed: ${error.response?.data?.message || error.message}`)
    }
    throw new Error('Paystack payment initiation failed: Unknown error')
  }
}

export async function validatePaystackPayment(reference: string): Promise<boolean> {
  try {
    const response = await axios.get(`${url}/transaction/verify/${reference}`, { headers })

    const { data } = response.data
    return data.status === 'success'
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Paystack payment validation failed: ${error.response?.data?.message || error.message}`)
    }
    throw new Error('Paystack payment validation failed: Unknown error')
  }
}
