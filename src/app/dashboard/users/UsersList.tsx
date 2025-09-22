'use client'

import { DataTable } from "@components/layouts";

export default function UsersList() {
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

// Mock data
const rows = [
   {
      key: "1",
      dateJoined: "15th Apr, 2024",
      firstName: "Joshua",
      lastName: "Adeyemi",
      email: "joshua.adeyemi@example.com",
      phone: "+44 7123 456 789",
      goodsPurchased: 12,
   },
   {
      key: "2",
      dateJoined: "2nd May, 2024",
      firstName: "Amara",
      lastName: "Okafor",
      email: "amara.okafor@example.com",
      phone: "+44 7987 654 321",
      goodsPurchased: 7,
   },
   {
      key: "3",
      dateJoined: "19th Jun, 2024",
      firstName: "Michael",
      lastName: "Smith",
      email: "m.smith@example.com",
      phone: "+44 7700 900 123",
      goodsPurchased: 20,
   },
   {
      key: "4",
      dateJoined: "5th Jul, 2024",
      firstName: "Sophia",
      lastName: "Brown",
      email: "sophia.brown@example.com",
      phone: "+44 7456 111 222",
      goodsPurchased: 4,
   },
   {
      key: "5",
      dateJoined: "25th Aug, 2024",
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@example.com",
      phone: "+44 7012 334 556",
      goodsPurchased: 15,
   },
];