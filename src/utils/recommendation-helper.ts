import 'server-only'

import { IOrder } from "@models/order.model";
import { IProduct } from "@models/product.model";
import { getAllProducts } from "@services/product";

/**
 * Extracts unique categories and product types from cart items
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function extractProductAttributesFromCart(items: any[]): Promise<{
  categories: Set<string>;
  productTypes: Set<string>;
  productIds: Set<string>;
}> {
  const categories = new Set<string>();
  const productTypes = new Set<string>();
  const productIds = new Set<string>();

  items.forEach((item) => {
    const product = item.product as IProduct;
    if (product._id) productIds.add(product._id.toString());
    if (product.category) categories.add(product.category);
    if (product.type) productTypes.add(product.type);
  });

  return { categories, productTypes, productIds };
}

/**
 * Extracts unique categories and product types from order items
 */
export function extractProductAttributesFromOrders(orders: IOrder[]): {
  categories: Set<string>;
  productTypes: Set<string>;
  productIds: Set<string>;
} {
  const categories = new Set<string>();
  const productTypes = new Set<string>();
  const productIds = new Set<string>();

  orders.forEach((order) => {
    // Each order has an items array
    order.items.forEach((item: any) => {
      // Each item has a product object with id, name, type, category
      if (item.product) {
        if (item.product.id) productIds.add(item.product.id);
        if (item.product.category) categories.add(item.product.category);
        if (item.product.type) productTypes.add(item.product.type);
      }
    });
  });

  return { categories, productTypes, productIds };
}

/**
 * Gets recommended products based on user preferences
 */
export async function getRecommendedProducts(
  categories: Set<string>,
  productTypes: Set<string>,
  excludeProductIds: Set<string>,
  limit: number = 4
): Promise<IProduct[]> {
  // If we have categories or types, use them for recommendations
  if (categories.size > 0 || productTypes.size > 0) {
    const { products } = await getAllProducts({
      limit: limit * 2, // Fetch more to allow filtering
      category: categories.size > 0 ? Array.from(categories) : undefined,
      type: productTypes.size > 0 ? Array.from(productTypes) : undefined,
    });

    // Filter out products already in cart/purchased
    const filtered = products.filter(
      (product) => !excludeProductIds.has(product._id.toString())
    );

    return filtered.slice(0, limit);
  }

  // Fallback: get popular or random products
  const { products } = await getAllProducts({ limit });
  return products;
}