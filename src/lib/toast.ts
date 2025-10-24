import { ToastProps } from '@heroui/toast'

export const DEFAULT_SUCCESS: Partial<ToastProps> = {
  title: 'Success',
  color: 'success', 
  timeout: 4000,
  variant: 'solid'
}

export const DEFAULT_ERROR: Partial<ToastProps> = {
  title: 'Error',
  timeout: 4000,
  variant: 'solid'
}
