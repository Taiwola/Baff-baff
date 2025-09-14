type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string[] | undefined>>;
};
