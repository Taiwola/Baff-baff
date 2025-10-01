import Button from "../Button";

interface PaginationProps {
   onChange: (page: number) => void;
   metadata: PaginationMetadata
}

export default function Pagination({ metadata, onChange }: PaginationProps) {
   const handlePrev = () => {
      if (metadata.hasPrevPage) onChange(metadata.currentPage - 1);
   };

   const handleNext = () => {
      if (metadata.hasNextPage) onChange(metadata.currentPage + 1);
   };

   return (
      <div className="flex justify-between items-center w-full px-5 pb-5">
    
         <span className="text-sm text-gray-600">
            Page {metadata.currentPage} of {metadata.totalPages}
         </span>

         {metadata.totalPages > 3 && (
            <div className="flex gap-2">
               {[...Array(metadata.totalPages).keys()].map((p) => (
                  <Button
                     key={p}
                     size="sm"
                     variant={p + 1 === metadata.currentPage ? "filled" : "bordered"}
                     className={`w-8 h-8 p-0 rounded-md text-sm ${p + 1 === metadata.currentPage ? "bg-black text-white" : "border-black/30 text-black"
                        }`}
                     onClick={() => onChange(p)}
                  >
                     {p + 1}
                  </Button>
               ))}
            </div>
         )}

         {/* Right side */}
         <div className="flex gap-2">
            <Button
               size="sm"
               variant="bordered"
               className="px-3 py-1 border-black/30 text-black"
               disabled={metadata.currentPage === 1}
               onClick={handlePrev}
            >
               Previous
            </Button>
            <Button
               size="sm"
               variant="bordered"
               className="px-3 py-1 border-black/30 text-black"
               disabled={metadata.currentPage >= metadata.totalItems}
               onClick={handleNext}
            >
               Next
            </Button>
         </div>
      </div>
   );
};
