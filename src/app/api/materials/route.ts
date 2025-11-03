
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { uploadToCloudinary } from '@lib/cloudinary'
import { errorResponse, sendResponse } from '@utils/api-response'
import { createMaterial, getAllMaterials } from '@services/material'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
import { adaptMaterial, adaptMaterials } from '@adapters/material.adapter'
import { CreateMaterialDto, createMaterialSchema, materialQueryFilter } from '@validations/material'
import {IncomingForm} from "formidable"
import { Readable } from "stream"
import { convertToNodeRequest } from '@utils/request-to-node-request'






import { readFile } from 'fs/promises'

export async function POST(req: NextRequest) {
  console.log("here")
  await dbConnect()
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
    multiples: false,
  });

  let fields: any, files: any;
  const nodeReq = await convertToNodeRequest(req)
  
  try {
    [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });
  } catch (err: any) {
    console.error('Form parse error:', err);
    return errorResponse('Invalid form data', { error: err.message }, 400);
  }


  const imageFile = files.image?.[0] || files.image
  
  let fileToUpload: File | undefined

  if (imageFile) {
    const buffer = await readFile(imageFile.filepath)
    const blob = new Blob([buffer], { type: imageFile.mimetype || 'image/jpeg' })
    fileToUpload = new File([blob], imageFile.originalFilename || 'image.jpg', {
      type: imageFile.mimetype || 'image/jpeg'
    })
  }

  const body: CreateMaterialDto = {
    name: String(fields.name?.[0] || fields.name) || '',
    stock: Number(fields.stock?.[0] || fields.stock) || 0,
    image: fileToUpload
  }

  const result = createMaterialSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    console.log('material error', validationErrors);
    
    return errorResponse('Validation failed', validationErrors, 422)
  }

  const image = result.data.image

  if (image && image instanceof File) {
    const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)

    if (!validation.isValid) {
      return errorResponse('File validation failed', { errors: validation.errors }, 400)
    }

    try {
      const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.MATERIALS)

      if (!uploadResult.success) {
        return errorResponse('Image upload failed', { error: uploadResult.error }, 500)
      }

      body.image = uploadResult.data?.url ?? ''
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      return errorResponse('Image upload failed', null, 500)
    }
  }

  const material = await createMaterial(body)
  const transform = adaptMaterial(material)

  return sendResponse('Material created successfully', transform, 201)
}

export async function GET(req: NextRequest) {
    await dbConnect()
  const auth = await verifySession()
  const { searchParams } = new URL(req.url)

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const parsed = materialQueryFilter.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit')
  })

  const queries = parsed.data

  const filters: MaterialFilter = {}

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  filters.page = page
  filters.limit = pageSize

  const {materials, count} = await getAllMaterials(filters)
  const transforms = adaptMaterials({ data: materials, total: count, page, pageSize })

  return sendResponse('Materials fetched successfully', transforms, 200)
}
