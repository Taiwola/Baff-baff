import Button from "../Button";

interface PaginationProps {
   total: number;
   page: number;
   onChange: (page: number) => void;
}

export default function Pagination({ total, page, onChange }: PaginationProps) {
   const pages = Array.from({ length: total }, (_, i) => i + 1);

   const handlePrev = () => {
      if (page > 1) onChange(page - 1);
   };

   const handleNext = () => {
      if (page < total) onChange(page + 1);
   };

   return (
      <div className="flex justify-between items-center w-full px-5 pb-5">
    
         <span className="text-sm text-gray-600">
            Page {page} of {total}
         </span>

         {total > 3 && (
            <div className="flex gap-2">
               {pages.map((p) => (
                  <Button
                     key={p}
                     size="sm"
                     variant={p === page ? "filled" : "bordered"}
                     className={`w-8 h-8 p-0 rounded-md text-sm ${p === page ? "bg-black text-white" : "border-black/30 text-black"
                        }`}
                     onClick={() => onChange(p)}
                  >
                     {p}
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
               disabled={page === 1}
               onClick={handlePrev}
            >
               Previous
            </Button>
            <Button
               size="sm"
               variant="bordered"
               className="px-3 py-1 border-black/30 text-black"
               disabled={page === total}
               onClick={handleNext}
            >
               Next
            </Button>
         </div>
      </div>
   );
};
