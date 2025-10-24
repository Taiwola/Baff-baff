'use client';

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/react";

import { Pagination } from '@components/ui';

type Column = {
   key: string;
   label: string;
   width?: string | number;
};

type DataTableProps = {
   columns: Column[];
   rows: Record<string, unknown>[];
   metadata?: PaginationMetadata
   onChange?: (page: number) => void
};

export default function DataTable({ columns, rows, metadata, onChange }: DataTableProps) {

   let paginationContent;
   if (metadata && metadata.totalItems > metadata.pageSize && onChange) {
      paginationContent = <Pagination metadata={metadata} onChange={onChange} />
   }

   return (
      <div className="w-full overflow-x-auto no-scrollbar">
         <Table
            aria-label="Reusable data table"
            removeWrapper
            fullWidth
            bottomContent={paginationContent}
            classNames={{
               base: "bg-white rounded-[20px] border border-black border-opacity-30 overflow-hidden",
               table: "border-collapse w-full",
               thead: "text-sm",
               tr: "border-b border-foreground",
               th: "text-left font-medium text-xs text-[#667085] bg-[#F9FAFB] px-5 py-5",
               td: "text-left text-xs text-black px-4 sm:px-5 py-3 sm:py-5",
            }}
         >
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn
                     key={column.key}
                     style={{
                        width: column.width || "auto",
                        whiteSpace: "nowrap",
                     }}
                  >
                     {column.label}
                  </TableColumn>
               )}
            </TableHeader>

            <TableBody emptyContent={"No rows to display."} items={rows}>
               {(item) => (
                  <TableRow key={item.key as string}>
                     {(columnKey) => (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                     )}
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
}
