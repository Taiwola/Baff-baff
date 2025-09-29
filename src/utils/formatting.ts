import { z, ZodError } from 'zod'

export function formatError<T>(error: ZodError<T>): T {
  const tree = z.treeifyError(error)

  if (!('properties' in tree && tree.properties)) {
    return {} as T
  }

  const properties: Record<string, { errors: string[] } | undefined> = tree.properties

  const err = Object.entries(properties).map(([key, value]) => {
    return { [key]: value?.errors[0] }
  })

  return Object.assign({}, ...err)
}
