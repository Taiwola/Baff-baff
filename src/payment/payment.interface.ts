/* eslint-disable @typescript-eslint/no-explicit-any */
export type Currency = 'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES' | 'XOF'
export type PaystackEventType = 'charge.success' | 'invoice.create' | 'transfer.success' | 'transfer.failed' | 'transfer.reversed'
type PaystackWebhookBody<T> = PaystackChargeSuccess<T> | PaystackTransferData

export type PaystackWebhook<T = any> = {
  event: PaystackEventType
  data: PaystackWebhookBody<T>
}

export type PaystackChargeSuccess<T = any> = {
  id: number
  domain: string
  status: string
  reference: string
  amount: number
  message: string | null
  gateway_response: string
  paid_at: string
  created_at: string
  channel: string
  period_start: Date
  period_end: Date
  currency: string
  ip_address: string
  metadata: any
  fees_breakdown: any | null
  log: any | null
  fees: number
  fees_split: any | null
  authorization: {
    authorization_code: string
    bin: string
    last4: string
    exp_month: string
    exp_year: string
    channel: string
    card_type: string
    bank: string
    country_code: string
    brand: string
    reusable: boolean
    signature: string
    account_name: string | null
  }
  customer: {
    id: number
    first_name: string | null
    last_name: string | null
    email: string
    customer_code: string
    phone: string | null
    metadata: T
    risk_action: string
    international_format_phone: string | null
  }
  plan: Record<string, unknown>
  subaccount: Record<string, unknown>
  split: Record<string, unknown>
  order_id: string | null
  paidAt: string
  requested_amount: number
  pos_transaction_data: any | null
  source: {
    type: string
    source: string
    entry_point: string
    identifier: string | null
  }
  transaction: {
    reference: string | null
    status: string | null
    amount: number | null
    currency: string
  }
  subscription: {
    status: string
    subscription_code: string
    email_token: string
    amount: number
    cron_expression: string
    next_payment_date: Date
    open_invoice: null
  }
}

export interface PaystackApiResponse<T> {
  status: boolean
  message: string
  data: T
}

export type PaystackPaymentStatus = 'abandoned' | 'failed' | 'ongoing' | 'pending' | 'processing' | 'queued' | 'reversed' | 'success'

export type PaystackTransactionVerification = PaystackApiResponse<{
  id: number
  domain: string
  status: PaystackPaymentStatus
  reference: string
  receipt_number: string | null
  amount: number
  message: string | null
  gateway_response: string
  paid_at: string
  created_at: string
  channel: string
  currency: string
  ip_address: string
  metadata: any // Could be string or object depending on usage
  log: {
    start_time: number
    time_spent: number
    attempts: number
    errors: number
    success: boolean
    mobile: boolean
    input: any[]
    history: {
      type: string
      message: string
      time: number
    }[]
  } | null
  fees: number
  fees_split: any | null
  authorization: {
    authorization_code: string
    bin: string
    last4: string
    exp_month: string
    exp_year: string
    channel: string
    card_type: string
    bank: string
    country_code: string
    brand: string
    reusable: boolean
    signature: string
    account_name: string | null
  }
  customer: {
    id: number
    first_name: string | null
    last_name: string | null
    email: string
    customer_code: string
    phone: string | null
    metadata: any
    risk_action: string
    international_format_phone: string | null
  }
  plan: any | null
  split: any
  order_id: string | null
  paidAt: string
  createdAt: string
  requested_amount: number
  pos_transaction_data: any | null
  source: any | null
  fees_breakdown: any | null
  connect: any | null
  transaction_date: string
  plan_object: any
  subaccount: any
}>

export interface PaystackPlanResponse<T> {
  status: boolean
  message: string
  data: T
}

export interface PaystackPlanData {
  name: string
  interval: string
  amount: number
  integration: number
  domain: string
  currency: string
  plan_code: string
  invoice_limit: number
  send_invoices: boolean
  send_sms: boolean
  hosted_page: boolean
  migrate: boolean
  id: number
  createdAt: string
  updatedAt: string
}

export interface GetSubscriptionPaystackResponse {
  invoices: any[]
  customer: {
    first_name: string
    last_name: string
    email: string
    phone: string | null
    metadata: {
      photos: {
        type: string
        typeId: string
        typeName: string
        url: string
        isPrimary: boolean
      }[]
    }
    domain: string
    customer_code: string
    id: number
    integration: number
    createdAt: string
    updatedAt: string
  }
  plan: {
    domain: string
    name: string
    plan_code: string
    description: string | null
    amount: number
    interval: string
    send_invoices: boolean
    send_sms: boolean
    hosted_page: boolean
    hosted_page_url: string | null
    hosted_page_summary: string | null
    currency: string
    id: number
    integration: number
    createdAt: string
    updatedAt: string
  }
  integration: number
  authorization: {
    authorization_code: string
    bin: string
    last4: string
    exp_month: string
    exp_year: string
    channel: string
    card_type: string
    bank: string
    country_code: string
    brand: string
    reusable: boolean
    signature: string
    account_name: string
  }
  domain: string
  start: number
  status: string
  quantity: number
  amount: number
  subscription_code: string
  email_token: string
  easy_cron_id: string | null
  cron_expression: string
  next_payment_date: string
  open_invoice: any | null
  id: number
  createdAt: string
  updatedAt: string
}

export type TransferRecipientType = 'ghipss' | 'mobile_money' | 'kepss' | 'nuban' | 'basa' | 'authorization'

export type CreatePaystackTransferRecipient = {
  type: TransferRecipientType
  name: string
  account_number: string
  bank_code: string
  currency: Currency
  description?: string
  metadata?: Record<string, any>
}

export type PaystackTransfer = {
  source: 'balance'
  amount: number
  reference: string
  recipient: string
  reason: string
  currency: Currency
}

export interface PaystackTransferData {
  amount: number
  currency: Currency
  id: number
  reason: string
  reference: string
  source: 'balance'
  status: string
  transfer_code: string
  transferred_at: null
  recipient: {
    active: boolean
    currency: Currency
    description: string
    email: string | null
    id: number
    integration: number
    metadata: Record<string, any> | null
    name: string
    recipient_code: string
    type: TransferRecipientType
    is_deleted: boolean
    details: {
      account_number: string
      account_name: string
      bank_code: string
      bank_name: string
    }
    created_at: string
    updated_at: string
  }
  created_at: string
  updated_at: string
}
