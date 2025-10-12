import { redirect } from 'next/navigation'

import { ApiClient } from '@utils/api'
import { toast } from '@hooks/useToast'
import { formatError } from '@utils/formatting'
import {
  ForgotPasswordFormErrors,
  ForgotPasswordFormState,
  ForgotPasswordFormValues,
  forgotPasswordSchema,
  LoginFormState,
  loginSchema,
  RegisterFormState,
  registerSchema,
  ResetPasswordFormErrors,
  ResetPasswordFormState,
  ResetPasswordFormValues,
  resetPasswordSchema
} from '@validations/auth'

export async function register(state: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const parsedValues = {
    firstName: String(formData.get('firstName') || ''),
    lastName: String(formData.get('lastName') || ''),
    email: String(formData.get('email') || ''),
    role: state.values.role,
    password: String(formData.get('password') || ''),
    confirmPassword: String(formData.get('confirmPassword') || ''),
    termsAndCondition: Boolean(formData.get('termsAndCondition')) || false
  }

  const result = registerSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<RegisterFormState['errors'], RegisterFormState['values']>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ApiClient.post<void>('/auth/register', result.data)

  if (response.code >= 400) {
    toast.error({ title: 'Registration Failed', description: response.message })
    return { ...state, error: response.message }
  }

  toast.success({ title: 'Registration success', description: response.message })
  redirect('/login')
}

export async function login(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const parsedValues = {
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || '')
  }

  const result = loginSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<LoginFormState['errors'], LoginFormState['values']>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ApiClient.post<LoginResponseType>('/auth/login', result.data)

  if (response.code >= 400) {
    toast.error({ title: 'Login Failed', description: response.message })
    return { ...state, error: response.message }
  }

  toast.success({ title: 'Login success', description: response.message })

  const { role } = response.data

  if (role === 'admin') redirect('/dashboard')
  redirect('/')
}

export async function forgotPassword(state: ForgotPasswordFormState, formData: FormData): Promise<ForgotPasswordFormState> {
  const parsedValues = {
    email: String(formData.get('email') || '')
  }

  const result = forgotPasswordSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<ForgotPasswordFormErrors, ForgotPasswordFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ApiClient.post<void>('/auth/forgot-password', result.data)

  if (response.code >= 400) {
    toast.error({ title: 'Forgot Password Failed', description: response.message })
    return { ...state, error: response.message }
  }

  toast.success({ title: 'Email Sent', description: response.message })

  return { values: { email: '' }, errors: {}, error: '' }
}

export async function resetPassword(state: ResetPasswordFormState, formData: FormData): Promise<ResetPasswordFormState> {
  const parsedValues = {
    token: state.values.token,
    password: String(formData.get('password') || ''),
    confirmPassword: String(formData.get('confirmPassword') || '')
  }

  const result = resetPasswordSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<ResetPasswordFormErrors, ResetPasswordFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ApiClient.patch<void>('/auth/reset-password', result.data)

  if (response.code >= 400) {
    toast.error({ title: 'Reset Password Failed', description: response.message })
    return { ...state, error: response.message }
  }

  toast.success({ title: 'Success', description: response.message })

  redirect('/login')
}

export async function logout() {
  const response = await ApiClient.delete<LoginResponseType>('/auth/logout')
  if (response.code >= 400) {
    toast.error({ title: 'Logout Failed', description: response.message })
    return { error: response.message }
  }
}
