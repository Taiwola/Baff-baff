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

export async function getAllOrders(filter?: FilterQuery<OrderFilter>): Promise<IOrder[]> {
  return await OrderModel.find(filter || {}).limit(filter?.limit)
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
