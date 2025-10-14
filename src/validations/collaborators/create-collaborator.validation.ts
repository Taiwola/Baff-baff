import { z } from 'zod'

export const createCollaboratorSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .nonempty('Name is required'),
  instagram: z.url({ message: 'Invalid Instagram URL' }).optional(),
  x: z.url({ message: 'Invalid X URL' }).optional(),
  facebook: z.url({ message: 'Invalid Facebook URL' }).optional(),
  tikTok: z.url({ message: 'Invalid TikTok URL' }).optional(),
  image: z.instanceof(File).or(z.string()).refine((val) => val !== undefined && val !== null && val !== '', {
    message: 'Image is required',
  }),
})

export type CreateCollaboratorDto = z.infer<typeof createCollaboratorSchema>

export type CreateCollaboratorFormState = FormState<CreateCollaboratorDto>
export type CreateCollaboratorErrors = CreateCollaboratorFormState['errors']
export type CreateCollaboratorValues = CreateCollaboratorFormState['values']
