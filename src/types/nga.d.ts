interface State {
  name: string
}

interface LocalGovernment {
  name: string
}

interface NgaApiResponse<T> {
  status: string
  data: T
}

type NGA = {
  key: string
  label: string
}
