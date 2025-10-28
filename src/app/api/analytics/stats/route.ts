import dbConnect from "@lib/database";
import { getAllOrders } from "@services/order";
import { getAllProducts } from "@services/product";
import { errorResponse, sendResponse } from "@utils/api-response";

export async function GET() {
    await dbConnect()
    
    try {
        const products = await getAllProducts({})
        const totalProducts = products.length
        const orders = await getAllOrders({})
        const completedOrders = orders.filter(o => o.status === 'delivered')
        const totalCompletedOrders = completedOrders.length
        const pendingOrders =  orders.filter(i => i.status === 'pending')
        const totalPendingOrders = pendingOrders.length
    
        return sendResponse('Analytics stats fetched successfully', {
            totalProducts,
            totalOrders: orders.length,
            totalCompletedOrders,
            totalPendingOrders
        }, 200)
        
    } catch (error) {
        console.log(error);
        return errorResponse('An Error Occured', null, 500)
    }
}