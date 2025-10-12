type FormState<T, E = Partial<Record<keyof T, string | undefined>>> = {
  values: T
  error?: string
  errors: E
}

type Result<T> = {
  code: number
  message: string
  data: T
}

type FetchOptions = RequestInit & {
  responseType?: 'json' | 'blob' | 'text'
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

type SelectItem = {
  key: string
  label: string
}
