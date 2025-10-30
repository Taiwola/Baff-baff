'use server'

import { redirect } from 'next/navigation'

import { auth, signIn, signOut } from '@auth'
import { catchError } from '@utils/result'
import { formatError } from '@utils/formatting'
import { ServerApiClient } from '@utils/api-server'
import {
  ChangePasswordFormErrors,
  ChangePasswordFormState,
  ChangePasswordFormValues,
  changePasswordSchema,
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
import { revalidatePath } from 'next/cache'

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

  const response = await ServerApiClient.post<void>('/auth/register', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message }
  }

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
    return { ...state, error: '', errors, values: parsedValues }
  }

  const [error, response] = await catchError(signIn('credentials', { ...result.data, redirect: false }))

  if (error) {
    switch (error.name) {
      case 'CallbackRouteError':
      case 'CredentialsSignin':
        return { ...state, error: 'Invalid Credentials' }

      default:
        return { ...state, error: error.name }
    }
  }

  if (!response) {
    return { ...state, error: 'Internal Server Error' }
  }

  if (response.status >= 400) {
    return { ...state, error: response.error || 'Please check your credentials.' }
  }

  redirect('/dashboard')
}

export async function googleLogin() {
  await signIn('google', { redirectTo: '/dashboard' })
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

  const response = await ServerApiClient.post<void>('/auth/forgot-password', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message }
  }

  return { values: { email: '' }, errors: {}, error: '', success: true }
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

  const response = await ServerApiClient.patch<void>('/auth/reset-password', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message }
  }

  redirect('/login')
}

export async function changePassword(state: ChangePasswordFormState, formData: FormData): Promise<ChangePasswordFormState> {
  const parsedValues = {
    oldPassword: String(formData.get('oldPassword') || ''),
    password: String(formData.get('password') || ''),
    confirmPassword: String(formData.get('confirmPassword') || '')
  }

  const result = changePasswordSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<ChangePasswordFormErrors, ChangePasswordFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.post<void>('/auth/change-password', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message }
  }

  const session = await auth()

  if (session?.user.role === 'admin') redirect('/dashboard/settings')
  else redirect('/profile')
}

export async function logout() {
  await signOut({ redirectTo: '/login' })
  revalidatePath('/login')
}
