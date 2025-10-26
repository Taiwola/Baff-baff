import { getAllOrders } from "@services/order";
import { getAllProducts } from "@services/product";
import { sendResponse } from "@utils/api-response";

export async function GET() {
    const products = await getAllProducts({})
    const totalProducts = products.length
    const orders = await getAllOrders({status: 'delivered'})
    const totalCompletedOrders = orders.length
    const pendingOrders =  await getAllOrders({status: 'paid'})
    const totalPendingOrders = pendingOrders.length

    return sendResponse('Analytics stats fetched successfully', {
        totalProducts,
        totalCompletedOrders,
        totalPendingOrders
    }, 200)
}