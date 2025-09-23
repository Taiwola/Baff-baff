"use client";

import React from "react";
import { Chip } from "@heroui/react";

import { DataTable } from "@components/layouts";
import ActionButton from "./ActionButton";

export default function MaterialsList() {

   const mappedRows = rows.map((row) => ({
      ...row,
      status: (
         <Chip
            className={`text-xs w-[90px] text-center h-6 ${row.status === "In stock"
               ? "bg-green-100 text-green-700"
               : "bg-red-100 text-red-700"}`
            }
            size="sm"
         >
            {row.status}
         </Chip>
      ),
   }));

   return <DataTable columns={columns} rows={mappedRows} />;
}

const columns = [
   { key: "product", label: "Product", width: '35%' },
   { key: "yardLeft", label: "Yard Left", width: '35%' },
   { key: "status", label: "Status", width: '20%' },
   { key: "actions", label: "", width: "10%" },
];

const rows = [
   {
      key: "1",
      product: "Cotton Fabric",
      yardLeft: 120,
      status: "In stock",
      actions: <ActionButton id="1" />,
   },
   {
      key: "2",
      product: "Denim",
      yardLeft: 0,
      status: "Out of stock",
      actions: <ActionButton id="2" />,
   },
   {
      key: "3",
      product: "Silk",
      yardLeft: 45,
      status: "In stock",
      actions: <ActionButton id="3" />,
   },
   {
      key: "4",
      product: "Linen",
      yardLeft: 12,
      status: "Out of stock",
      actions: <ActionButton id="4" />,
   },
];