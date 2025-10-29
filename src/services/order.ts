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

/**
 * Returns sales totals grouped by the requested periods.
 *
 * @param startDate  Inclusive start of the period (UTC recommended)
 * @param endDate    Inclusive end of the period (UTC recommended)
 * @param groupings  Which aggregations to compute (default: all)
 * @throws Error if dates are invalid or the DB query fails
 */
export async function salesData(startDate: Date, endDate: Date, groupings: Grouping = 'daily'): Promise<RevenueOverview> {
  try {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // Build $facet pipelines dynamically
    const facetStage: Record<string, any[]> = {}

    if (groupings === 'yearly') {
      facetStage.yearly = [
        {
          $group: {
            _id: { year: { $year: '$createdAt' } },
            revenue: { $sum: '$total' }
          }
        },
        { $sort: { '_id.year': 1 } },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            revenue: 1
          }
        }
      ]
    }

    if (groupings === 'monthly') {
      facetStage.monthly = [
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            revenue: { $sum: '$total' }
          }
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
                    day: 1
                  }
                }
              }
            },
            revenue: 1
          }
        }
      ]
    }

    if (groupings === 'weekly') {
      facetStage.weekly = [
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              week: { $week: '$createdAt' },
              firstDay: { $min: '$createdAt' }
            },
            revenue: { $sum: '$total' }
          }
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
                    day: 1
                  }
                }
              }
            },
            weekOfMonth: {
              $ceil: {
                $divide: [{ $dayOfMonth: '$_id.firstDay' }, 7]
              }
            },
            revenue: 1
          }
        },
        {
          $group: {
            _id: {
              year: '$year',
              month: '$month',
              weekOfMonth: '$weekOfMonth'
            },
            revenue: { $sum: '$revenue' }
          }
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            weekOfMonth: '$_id.weekOfMonth',
            revenue: 1
          }
        },
        { $sort: { year: 1, month: 1, weekOfMonth: 1 } }
      ]
    }

    if (groupings === 'daily') {
      facetStage.daily = [
        {
          $group: {
            _id: {
              dateString: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'UTC' }
              },
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            revenue: { $sum: '$total' },
            minDate: { $min: '$createdAt' }
          }
        },
        { $sort: { '_id.dateString': 1 } },
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
                    day: 1
                  }
                },
                timezone: 'UTC'
              }
            },
            dayOfWeek: { $dayOfWeek: '$minDate' }, // 1 = Sunday
            name: {
              $arrayElemAt: [days, { $subtract: [{ $dayOfWeek: '$minDate' }, 1] }]
            },
            revenue: 1
          }
        }
      ]
    }

    const combinedSales = await OrderModel.aggregate([
      {
        $match: {
          status: { $in: ['delivered', 'paid'] },
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      { $facet: facetStage }
    ])

    const result: RevenueOverview = {
      yearly: [],
      daily: [],
      weekly: [],
      monthly: []
    }

    if (groupings.includes('yearly')) result.yearly = combinedSales[0].yearly ?? []
    if (groupings.includes('monthly')) result.monthly = combinedSales[0].monthly ?? []
    if (groupings.includes('weekly')) result.weekly = combinedSales[0].weekly ?? []
    if (groupings.includes('daily')) result.daily = combinedSales[0].daily ?? []

    return result
  } catch (error: any) {
    console.error('Error fetching sales data:', error)
    throw new Error(`Failed to retrieve sales data: ${error?.message ?? error}`)
  }
}
