import { RegisterDto, RegisterFormState, registerSchema } from '@utils/validation/auth'

export async function register(state: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const validatedFields = registerSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    role: formData.get('role'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    return {
      ...state,
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  return state
}
