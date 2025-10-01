"use client";

import React, { use } from "react";
import { Chip } from "@heroui/react";

import ActionButton from "./ActionButton";
import { DataTable } from "@components/layouts";

type Props = {
   promise: Promise<Material[]>
}

export default function MaterialsList({ promise }: Props) {
   const materials = use(promise)

   const rows = materials.map((material) => ({
      key: material.id,
      product: material.name,
      yardLeft: material.stock,
      status: (
         <Chip
            className={`text-xs w-[90px] text-center h-6 ${material.status === 'In Stock'
               ? "bg-green-100 text-green-700"
               : "bg-red-100 text-red-700"}`
            }
            size="sm"
         >
            {material.status || 'Out of Stock'}
         </Chip>
      ),
      actions: <ActionButton material={material} />
   }));

   return <DataTable columns={columns} rows={rows} />;
}

const columns = [
   { key: "product", label: "Product", width: '35%' },
   { key: "yardLeft", label: "Yard Left", width: '35%' },
   { key: "status", label: "Status", width: '20%' },
   { key: "actions", label: "", width: "10%" },
];