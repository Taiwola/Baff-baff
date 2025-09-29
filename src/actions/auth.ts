import { redirect } from 'next/navigation'

import { ApiClient } from '@utils/api'
import { formatError } from '@utils/formatting'
import { RegisterFormState, registerSchema } from '@utils/validation/auth'

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
    console.log('an error occured', errors)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ApiClient.post<void>('/auth/register', result.data)

  if (response.code >= 400) {
    console.log("response", response.message);

    return { ...state, error: response.message }
  }

  redirect('/login')
}
