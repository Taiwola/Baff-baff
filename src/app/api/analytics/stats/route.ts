import dbConnect from "@lib/database";
import { getAllOrders } from "@services/order";
import { getAllProducts } from "@services/product";
import { errorResponse, sendResponse } from "@utils/api-response";

export async function GET() {
    await dbConnect()
    
    try {
        const products = await getAllProducts({})
        const totalProducts = products.products.length
        const {orders} = await getAllOrders({})
        const completedOrders = orders.filter(o => o.status === 'delivered')
        const totalCompletedOrders = completedOrders.length
        const pendingOrders =  orders.filter(i => i.status === 'pending')
        const totalPendingOrders = pendingOrders.length

        const overviewStats: OverviewStats = {
            totalProducts,
            totalOrders: orders.length,
            totalCompletedOrders,
            totalPendingOrders
        } 
    
        return sendResponse('Analytics stats fetched successfully', overviewStats, 200)
        
    } catch (error) {
        console.log(error);
        return errorResponse('An Error Occured', null, 500)
    }
}