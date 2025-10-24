export interface FileValidationOptions {
  maxSize?: number
  allowedTypes?: string[]
  allowedExtensions?: string[]
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const DEFAULT_VALIDATION_OPTIONS: FileValidationOptions = {
  maxSize: 5 * 1024 * 1024, // 5MB default
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
}

export const validateFile = (file: File, options: FileValidationOptions = {}): ValidationResult => {
  const mergedOptions = { ...DEFAULT_VALIDATION_OPTIONS, ...options }
  const errors: string[] = []

  // Validate file type
  if (mergedOptions.allowedTypes && !mergedOptions.allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed: ${mergedOptions.allowedTypes.join(', ')}`)
  }

  // Validate file size
  if (mergedOptions.maxSize && file.size > mergedOptions.maxSize) {
    const maxSizeMB = (mergedOptions.maxSize / (1024 * 1024)).toFixed(1)
    errors.push(`File too large. Maximum size is ${maxSizeMB}MB`)
  }

  // Validate file extension (optional)
  if (mergedOptions.allowedExtensions && file.name) {
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    if (!mergedOptions.allowedExtensions.includes(fileExtension)) {
      errors.push(`Invalid file extension. Allowed: ${mergedOptions.allowedExtensions.join(', ')}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Helper function to get human-readable file size
export const getReadableFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Pre-defined validation presets
export const VALIDATION_PRESETS = {
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
  },
  DOCUMENT: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    allowedExtensions: ['.pdf', '.doc', '.docx', '.txt']
  },
  VIDEO: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'],
    allowedExtensions: ['.mp4', '.mpeg', '.mov', '.avi']
  },
  AUDIO: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'],
    allowedExtensions: ['.mp3', '.wav', '.ogg', '.m4a']
  }
}

// Type-safe preset validation
export const validateFileWithPreset = (file: File, preset: keyof typeof VALIDATION_PRESETS): ValidationResult => {
  return validateFile(file, VALIDATION_PRESETS[preset])
}
