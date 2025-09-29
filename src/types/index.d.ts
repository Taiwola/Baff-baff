type FormState<T> = {
  values: T;
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