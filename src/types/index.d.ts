type FormState<T> = {
  values: T;
  error?: string
  errors: Partial<Record<keyof T, string | undefined>>;
};

type Result<T> = {
  code: number;
  message: string;
  data: T;
};

type FetchOptions = RequestInit & {
  responseType?: "json" | "blob" | "text";
};

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}