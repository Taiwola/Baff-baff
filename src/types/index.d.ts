type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string[] | undefined>>;
  isSubmitting: boolean;
  isValid: boolean;
};
