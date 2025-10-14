import { z } from 'zod'
import { createCollaboratorSchema } from "./create-collaborator.validation";

export const updateCollaboratorSchema = createCollaboratorSchema.partial();

export type UpdateCollaboratorDto = z.infer<typeof updateCollaboratorSchema>

export type UpdateCollaboratorFormState = FormState<UpdateCollaboratorDto>
export type UpdateCollaboratorErrors = UpdateCollaboratorFormState['errors']
export type UpdateCollaboratorValues = UpdateCollaboratorFormState['values']