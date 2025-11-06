import { getAllOrders } from '@services/order'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptOrders } from '@adapters/order.adapter'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { orderQueryFilter } from '@validations/order'

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const session = await verifySession();

    if (!session?.userId) {
      return errorResponse("UnAuthenticated", null, 401);
    }

    const { searchParams } = new URL(req.url);

    const parsed = orderQueryFilter.safeParse({
       page: searchParams.get("page") !== null
  ? Number(searchParams.get("page"))
  : undefined,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    });

    if (!parsed.success) {
      console.log(parsed.error)
      return errorResponse("Invalid query params", parsed.error, 400);
    }

    const queries = parsed.data;

    const page = queries.page || 1;
    const pageSize = queries.limit || 10;

    const filters: OrderFilter = {
      page,
      limit: pageSize,
      sort: { createdAt: -1 },
    };

    // Apply status filter
    if (queries.status) {
      filters.status = queries.status;
    }

    // Admin search: allow searching by id OR text search
    if (session.role === "admin") {
      if (queries.search) {
        if (queries.search) {
          filters.id = queries.search;
        }
      }
    } else {
      filters.userId = session.userId;
    }

    const data = await getAllOrders(filters);

    const transformed = adaptOrders({
      data: data.orders,
      total: data.count,
      page,
      pageSize,
    });

    return sendResponse("Orders fetched successfully", transformed, 200);

  } catch (error) {
    console.error("Error fetching orders:", error);
    return errorResponse("Failed to fetch orders", null, 500);
  }
}

