export function parseCollaboratorFormData(formData: FormData) {
  const image = formData.get('image')
  // console.log('images >>>', images)
  return {
    name: String(formData.get('name') || ''),
    image: image instanceof File && image.size > 0 ? image : '',
    description: String(formData.get('description') || ''),
    instagram: String(formData.get('instagram') || ''),
    x: String(formData.get('x') || ''),
    facebook: String(formData.get('facebook') || ''),
    tikTok: String(formData.get('tikTok') || '')
  }
}
