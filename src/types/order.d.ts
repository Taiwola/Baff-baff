type OrderStatus = "notStart" | "processing" | "delivered"

type Order = {
   id: string
   date: string
   orderId: string
   fullName: string
   email: string
   phoneNumber: string
   deliveryZone: string
   address: string
   status: OrderStatus
}