/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderModel, { IOrder } from '@models/order.model'
import { CreateOrderDto, UpdateOrderDto } from '@validations/order'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createOrder(data: CreateOrderDto, session?: ClientSession): Promise<IOrder> {
  const Orders = new OrderModel({
    ...data
  })

  await Orders.save({ session })
  return Orders
}

export async function getAllOrders({ limit, sort, page = 1, ...filter }: FilterQuery<OrderFilter>): Promise<IOrder[]> {
  const query = OrderModel.find(filter)

  if (sort) {
    query.sort(sort)
  }

  if (limit) {
    const skip = (page - 1) * limit
    query.limit(limit).skip(skip)
  }

  return await query
}

export async function getOneOrderById(id: string): Promise<IOrder | null> {
  return await OrderModel.findById(id)
}

export async function getOrderByFilter(filter: FilterQuery<IOrder>): Promise<IOrder | null> {
  return await OrderModel.findOne(filter)
}

export async function updateOrder(id: string, data: UpdateOrderDto, session?: ClientSession): Promise<IOrder | null> {
  const Order = await OrderModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return Order
}

export async function deleteOrder(id: string): Promise<IOrder | null> {
  return await OrderModel.findByIdAndDelete(id)
}


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * Returns sales totals grouped by the requested periods.
 *
 * @param startDate  Inclusive start of the period (UTC recommended)
 * @param endDate    Inclusive end of the period (UTC recommended)
 * @param groupings  Which aggregations to compute (default: all)
 * @throws Error if dates are invalid or the DB query fails
 */
export async function salesData(
  startDate: Date,
  endDate: Date,
  groupings = ['daily']
) {
  try {

    // Build $facet pipelines dynamically
    const facetStage: Record<string, any[]> = {};

    if (groupings.includes('yearly')) {
      facetStage.yearly = [
        {
          $group: {
            _id: { year: { $year: '$createdAt' } },
            totalSales: { $sum: '$total' },
          },
        },
        { $sort: { '_id.year': 1 } },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            totalSales: 1,
          },
        },
      ];
    }

    if (groupings.includes('monthly')) {
      facetStage.monthly = [
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            totalSales: { $sum: '$total' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: {
              $dateToString: {
                format: '%B',
                date: {
                  $dateFromParts: {
                    year: '$_id.year',
                    month: '$_id.month',
                    day: 1,
                  },
                },
              },
            },
            totalSales: 1,
          },
        },
      ];
    }

    if (groupings.includes('weekly')) {
      facetStage.weekly = [
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              week: { $week: '$createdAt' },
              firstDay: { $min: '$createdAt' },
            },
            totalSales: { $sum: '$total' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.week': 1 } },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: {
              $dateToString: {
                format: '%B',
                date: {
                  $dateFromParts: {
                    year: '$_id.year',
                    month: '$_id.month',
                    day: 1,
                  },
                },
              },
            },
            weekOfMonth: {
              $ceil: {
                $divide: [
                  { $dayOfMonth: '$_id.firstDay' },
                  7,
                ],
              },
            },
            totalSales: 1,
          },
        },
      ];
    }

    if (groupings.includes('daily')) {
      facetStage.daily = [
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
              date: { $min: '$createdAt' },
            },
            totalSales: { $sum: '$total' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: {
              $dateToString: {
                format: '%B',
                date: {
                  $dateFromParts: {
                    year: '$_id.year',
                    month: '$_id.month',
                    day: 1,
                  },
                },
              },
            },
            dayOfWeek: { $dayOfWeek: '$_id.date' }, // Numeric: 1=Sunday, 2=Monday, ..., 7=Saturday
            dayName: {
              $arrayElemAt: [
                days,
                { $subtract: [{ $dayOfWeek: '$_id.date' }, 1] }
              ]
            },
            totalSales: 1,
          },
        },
      ];
    }

    const combinedSales = await OrderModel.aggregate([
      {
        $match: {
          status: { $in: ['delivered', 'paid'] },
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $facet: facetStage },
    ]);

    const result: any = {};

    if (groupings.includes('yearly')) result.yearly = combinedSales[0].yearly ?? [];
    if (groupings.includes('monthly')) result.monthly = combinedSales[0].monthly ?? [];
    if (groupings.includes('weekly')) result.weekly = combinedSales[0].weekly ?? [];
    if (groupings.includes('daily')) result.daily = combinedSales[0].daily ?? [];

    return result;
  } catch (error: any) {
    console.error('Error fetching sales data:', error);
    throw new Error(`Failed to retrieve sales data: ${error?.message ?? error}`);
  }
}