import { verifySession } from "@lib/dal";
import dbConnect from "@lib/database";
import { getAllOrders } from "@services/order";
import { getAllProducts } from "@services/product";
import { sendResponse } from "@utils/api-response";
import { extractProductAttributesFromOrders, getRecommendedProducts } from "@utils/recommendation-helper";

export async function GET() {
    await dbConnect()
    const session = await verifySession()

    if (!session?.userId) {
        const {products} = await getAllProducts({})

        const top = [];

        for (const p of products) {
            top.push(p);
            top.sort((a, b) => b.numberOfSales - a.numberOfSales);
            if (top.length > 4) top.pop();
        }

        return sendResponse("Request successful", top, 200)
    } else {
        const {orders} = await getAllOrders({})

        const {categories, productIds, productTypes} = extractProductAttributesFromOrders(orders)

        const recommendedProduct = await getRecommendedProducts(categories, productTypes, productIds)
         return sendResponse("Request successful", recommendedProduct, 200)
    }

}