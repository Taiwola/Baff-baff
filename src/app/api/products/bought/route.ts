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

        const top4productSold = products.sort((a,b) => b.numberOfSales - a.numberOfSales).slice(0, 4)

        return sendResponse("Request successful", top4productSold, 200)
    } else {
        const {orders} = await getAllOrders({userId: session.userId})

        const {categories, productIds, productTypes} = extractProductAttributesFromOrders(orders)

        const recommendedProduct = await getRecommendedProducts(categories, productIds, productTypes)
         return sendResponse("Request successful", recommendedProduct, 200)
    }

}