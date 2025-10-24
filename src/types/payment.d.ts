
type Currency = 'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES' | 'XOF'

interface InitiatePayment {
  amount: number
  email: string
  currency?: Currency
  reference?: string
  callback_url?: string
  metadata?: Record<string, unknown>
}

interface InitiatePaymentResponse {
  checkoutUrl: string 
  reference: string
  checkoutCode: string 
}