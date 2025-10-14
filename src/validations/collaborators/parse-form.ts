export function parseCollaboratorFormData(formData: FormData) {
  return {
    name: String(formData.get('name') || ''),
    image: formData.get('image') as File | string,
    description: String(formData.get('description') || ''),
    instagram: String(formData.get('instagram') || ''),
    x: String(formData.get('x') || ''),
    facebook: String(formData.get('facebook') || ''),
    tikTok: String(formData.get('tikTok') || ''),
  }
}