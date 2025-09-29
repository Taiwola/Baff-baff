import 'server-only'
import { v2 as cloudinary, UploadApiResponse, TransformationOptions } from 'cloudinary'
import { CLOUDINARY_FOLDERS } from './folder'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export const uploadToCloudinary = async (
  file: File | Buffer,
  folder: string = CLOUDINARY_FOLDERS.TEMP,
  options: {
    public_id?: string
    transformation?: TransformationOptions[]
  } = {}
) => {
  try {
    let buffer: Buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      buffer = file
    }

    // Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          ...options
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result!)
        }
      )
      uploadStream.end(buffer)
    })

    return {
      success: true,
      data: {
        url: result.secure_url
      }
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return { success: result.result === 'ok' }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return { success: false, error }
  }
}

export const getFolderResources = async (folder: string) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 500
    })
    return { success: true, data: result.resources }
  } catch (error) {
    return { success: false, error }
  }
}
