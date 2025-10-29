import { getOrders } from "@actions/orders.action";
import { OrdersList } from "@components/features/orders";

type Props = {
  searchParams: Promise<{ query: string }>
}

export default async function AllOrdersPage({ searchParams }: Props) {
  const { query } = await searchParams
  const promise = getOrders({ search: query })

  return (
    <div className="w-full h-auto">
      <OrdersList promise={promise} />
    </div>
  )
}
