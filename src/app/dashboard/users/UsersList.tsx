import { format } from "date-fns";

import { getUsers } from "@actions/users.action";
import { DataTable } from "@components/layouts";

export default async function UsersList() {
   const users = await getUsers()

   const rows = users.map((user) => ({
      key: user.id,
      dateJoined: format(new Date(user.createdAt), "do MMM, yyyy"),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber || <div className="w-full text-center">-</div>,
      goodsPurchased: 0
   }))

   return (
      <DataTable
         columns={columns}
         rows={rows}
         rowsPerPage={10}
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