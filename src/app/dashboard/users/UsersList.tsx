'use client'

import { use } from "react";
import { format } from "date-fns";

import { DataTable } from "@components/layouts";
import { usePathname, useRouter } from "next/navigation";

type Props = {
   promise: Promise<Pagination<User>>
}

export default function UsersList({ promise }: Props) {
   const users = use(promise)
   const router = useRouter()
   const pathname = usePathname()

   const rows = users.items.map((user) => ({
      key: user.id,
      dateJoined: format(new Date(user.createdAt), "do MMM, yyyy"),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber || <div className="w-full text-center">-</div>,
      goodsPurchased: 0
   }))

   function handleChangePage(page: number) {
      router.replace(pathname + `?page=${page}`)
   }

   return (
      <DataTable
         columns={columns}
         rows={rows}
         metadata={users.metadata}
         onChange={handleChangePage}
      />
   );
}


// Define table columns
const columns = [
   { key: "dateJoined", label: "DATE JOINED" },
   { key: "firstName", label: "FIRST NAME" },
   { key: "lastName", label: "LAST NAME" },
   { key: "email", label: "EMAIL", width: '20px' },
   { key: "phone", label: "PHONE NUMBER" },
   { key: "goodsPurchased", label: "No of Goods Purchased" },
];