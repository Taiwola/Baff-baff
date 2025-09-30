import { CreateMaterialFormState, createMaterialSchema } from '@validations/material'

export async function material(state: CreateMaterialFormState, formData: FormData): Promise<CreateMaterialFormState> {
  const validatedFields = createMaterialSchema.safeParse({
    name: formData.get('name'),
    stock: Number(formData.get('stock')),
    image: formData.get('image')
  })

  if (!validatedFields.success) {
    return {
      ...state,
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  return state
}
