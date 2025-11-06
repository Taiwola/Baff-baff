import 'server-only'

export enum API_Tags {
  PRODUCTS = "products",
  MATERIALS = "materials",
  ADDRESSES = "addresses",
  CARTS = "carts",
  COLLABORATORS = "collaborators",
  MEASUREMENTS = "measurements",
  ORDERS = "orders",
  REGIONS = "regions",
  USERS = "users",
}

export function getTag(name: API_Tags, listId?: string) {
  return {
    name,
    default: name + (listId ?? "LIST"),
    createTag: (id: string) => name + id,
  };
}
