import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center px-4 py-2 rounded-lg font-medium transition",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-dark",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
