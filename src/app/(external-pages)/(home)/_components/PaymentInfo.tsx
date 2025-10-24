import React from 'react'

export default function PaymentInfo() {
   return (
      <section className="w-full py-14 container mx-auto flex flex-col gap-3">
         <article className="flex flex-col gap-2 md:flex-row-reverse">
            <div className="w-auto px-7 py-6 bg-black text-white rounded-md md:inline-flex md:justify-center md:items-center">
               <h2 className="font-roboto font-bold text-brand-light text-nowrap">Payment Info</h2>
            </div>

            <div className="py-10 px-2.5 w-full border-1 border-[#202020] rounded-md flex flex-col gap-2.5">
               <h3 className="font-montserrat">
                  Payments are to be made on the website, an option to check out
                  via card payments will be provided to you at final stage of your
                  check out
               </h3>

               <p className="font-montserrat font-medium">
                  Your personal details are safe as all payment mediums are
                  through proper and secure channels
               </p>
            </div>
         </article>

         <article className="flex flex-col gap-2 md:flex-row">
            <div className="w-auto px-7 py-6 bg-black text-white rounded-md md:inline-flex md:justify-center md:items-center">
               <h2 className="font-roboto font-bold text-brand-light text-nowrap">DELIVERY</h2>
            </div>

            <div className="py-10 px-2.5 w-full border-1 border-[#202020] rounded-md flex flex-col gap-2.5">
                <h3 className="font-montserrat">
                  Delivery is made after payment confirmation at your cost, while
                  delivery fees may change depending on your location
               </h3>

               <p className="font-montserrat font-medium underline">
                  Contact us via whatsapp to facilitate
               </p>
            </div>
         </article>
      </section>
   )
}
