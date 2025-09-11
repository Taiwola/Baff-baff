import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs))
}

// src/utils/formatting.ts

/**
 * Formats a number into currency format.
 * @param amount The number to format
 * @param currency Optional ISO currency code, defaults to NGN
 * @param locale Optional locale, defaults to 'en-NG'
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'NGN', locale: string = 'en-NG'): string {
  if (isNaN(amount)) return '0'

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2, // no decimals for whole numbers
    maximumFractionDigits: 2
  }

  return new Intl.NumberFormat(locale, options).format(amount)
}
