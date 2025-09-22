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
   rows: Record<string, string | number>[];
   rowsPerPage?: number;
};

export default function DataTable({
   columns,
   rows,
   rowsPerPage = 10,
}: DataTableProps) {
   const [page, setPage] = useState(1);

   const pages = Math.ceil(rows.length / rowsPerPage);
   const start = (page - 1) * rowsPerPage;
   const paginatedRows = rows.slice(start, start + rowsPerPage);


   let paginationContent;
   if (pages > 1) {
      paginationContent = <Pagination total={pages} page={page} onChange={setPage} />
   }

   return (
      <Table
         aria-label="Reusable data table"
         removeWrapper
         fullWidth
         bottomContent={paginationContent}
         classNames={{
            base: "bg-white rounded-[20px] border border-black border-opacity-30 w-full overflow-hidden",
            table: "w-full border-collapse",
            thead: "bg-[#F9FAFB] overflow-hidden text-sm overflow-hidden",
            tr: "border-b border-foreground",
            th: "text-left font-medium text-xs text-[#667085] px-5 py-5 overflow-hidden",
            td: "text-left text-xs text-black px-5 py-5",
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

         <TableBody emptyContent={"No rows to display."} items={paginatedRows}>
            {(item) => (
               <TableRow key={item.key}>
                  {(columnKey) => (
                     <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
               </TableRow>
            )}
         </TableBody>
      </Table>
   );
}
