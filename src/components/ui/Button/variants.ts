import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95', // base
  {
    variants: {
      variant: {
        filled: 'bg-brand-dark text-white hover:bg-brand-dark/80 cursor-pointer flex outline-none focus:outline:none focus:border:none',
        bordered: 'border border-brand-dark text-brand-dark bg-transparent hover:bg-gray-50 cursor-pointer flex outline-none focus:outline-none',
        text: 'cursor-pointer transition-transform duration-300 ease-in-out text-brand-dark hover:scale-110'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-xl'
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[0.625rem]',
        md: 'rounded-md',
        full: 'rounded-full'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      }
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      rounded: 'none',
      fullWidth: false
    }
  }
)
