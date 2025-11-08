import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs))
}

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

export function capitalizeFirstLetter(val: string) {
    return val.charAt(0).toUpperCase() + String(val).slice(1);
}

export function getSortOption(key: string) {
  switch (key) {
    case 'featured':
      // could depend on a 'featured' boolean or priority field
      return { featured: -1, createdAt: -1 }

    case 'bestSelling':
      // assuming you track product sales count
      return { totalSales: -1 }

    case 'nameAsc':
      return { name: 1 } // A-Z

    case 'nameDesc':
      return { name: -1 } // Z-A

    case 'oldToNew':
      return { createdAt: 1 } // oldest first

    case 'newToOld':
      return { createdAt: -1 } // newest first

    default:
      return { createdAt: -1 }
  }
}

export function getSize(measurements: TrouserMeasurement | ShirtMeasurement | CartMeasurements): Size {
  if ('waist' in measurements) {
    return getTrouserSize(measurements)
  }

  return getShirtSize(measurements)
}

function getShirtSize(measurements: ShirtMeasurement | CartMeasurements): Size {
  if (Number(measurements.chest) <= 40) {
    return 's'
  } else if (Number(measurements.chest) <= 45) {
    return 'm'
  } else if (Number(measurements.chest) <= 50) {
    return 'l'
  } else if (Number(measurements.chest) <= 55) {
    return 'xl'
  } else if (Number(measurements.chest) <= 60) {
    return 'xxl'
  }

  else return 'xxxl'
}

function getTrouserSize(measurements: TrouserMeasurement | CartMeasurements): Size {
  if(Number(measurements.waist) <= 38) {

  }
  return 'l'
}

