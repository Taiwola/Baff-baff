import React from 'react'

export default function PaymentInfo() {
  return (
    <section className="w-full py-14 container mx-auto flex flex-col gap-3">
      <article className="flex flex-col gap-2 md:flex-row-reverse">
        <div className="w-auto px-7 py-6 bg-black text-white rounded-md md:inline-flex md:justify-center md:items-center">
          <h2 className="font-roboto font-bold text-brand-light text-nowrap">Payment Info</h2>
        </div>

        <div className="py-10 px-2.5 w-full border-1 border-[#202020] rounded-md flex flex-col gap-2.5">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed  font-montserrat mb-4">
            Payments are to be made on the website. An option to check out via card payments will be provided to you at the final stage of checkout.
          </h3>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium  font-montserrat">
            Your personal details are safe — all payment mediums are processed through secure and trusted channels.
          </p>
        </div>
      </article>

      <article className="flex flex-col gap-2 md:flex-row">
        <div className="w-auto px-7 py-6 bg-black text-white rounded-md md:inline-flex md:justify-center md:items-center">
          <h2 className="font-roboto font-bold text-brand-light text-nowrap">DELIVERY</h2>
        </div>

        <div className="py-10 px-2.5 w-full border-1 border-[#202020] rounded-md flex flex-col gap-2.5">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed  font-montserrat mb-4">
            Delivery is made after payment confirmation at your cost. Delivery fees may vary depending on your location.
          </h3>

          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed  font-montserrat mb-4">
            Delivery takes between 5 - 10 days working days
          </h3>

          

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium  font-montserrat hover:text-brand-dark transition-colors">
            Contact us via WhatsApp to facilitate delivery
          </p>
        </div>
      </article>
    </section>
  )
}
