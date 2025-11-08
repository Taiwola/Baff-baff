import { verifySession } from "@lib/dal";
import dbConnect from "@lib/database";
import { IProduct } from "@models/product.model";
import { getAllCarts, getOneCartById } from "@services/cart";
import { getAllProducts } from "@services/product";
import { sendResponse } from "@utils/api-response";
import { extractProductAttributesFromCart, getRecommendedProducts } from "@utils/recommendation-helper";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

      const session = await verifySession()
      const cookieStore = await cookies();
      const guestCartId = cookieStore.get("guestCartId")?.value;

     let recommendedProducts: IProduct[] = [];

    if (session?.userId) {
      const {carts} = await getAllCarts({userId: session.userId})
      const items = carts.flatMap((cart) => cart.items)
      const {categories, productTypes, productIds} = await extractProductAttributesFromCart(items)

      recommendedProducts = await getRecommendedProducts(categories, productTypes, productIds)
    } else if (guestCartId) {
       const cart = await getOneCartById(guestCartId);
       if (cart && cart.items.length > 0) {
         const {categories, productTypes, productIds} = await extractProductAttributesFromCart(cart?.items)

      recommendedProducts = await getRecommendedProducts(categories, productTypes, productIds)
       } 
    } 

    return sendResponse("Request successfull", recommendedProducts, 200)
}