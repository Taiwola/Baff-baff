'use client';

import React, { useState } from 'react';
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
   rowsPerPage?: number;
};

export default function DataTable({ columns, rows, rowsPerPage = 10 }: DataTableProps) {
   const [page, setPage] = useState(1);

   const pages = Math.ceil(rows.length / rowsPerPage);
   const start = (page - 1) * rowsPerPage;
   const paginatedRows = rows.slice(start, start + rowsPerPage);


   let paginationContent;
   if (pages > 1) {
      paginationContent = <Pagination total={pages} page={page} onChange={setPage} />
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
                     //  className="whitespace-normal break-words"
                  >
                     {column.label}
                  </TableColumn>
               )}
            </TableHeader>

            <TableBody emptyContent={"No rows to display."} items={paginatedRows}>
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
