export default function PaymentInfo() {
  return (
    <div className="w-full py-14">
      <div className="container mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 md:flex-row-reverse">
            <div className="w-full pl-7 py-6 bg-black text-white rounded-md md:inline-flex md:justify-center md:items-center  md:w-[32.31%]">
              <h2 className="font-roboto font-bold text-2xl">Payment Info</h2>
            </div>
            <div className="py-10 px-2.5 w-full border-1 border-[#202020] rounded-md flex flex-col gap-2.5">
              <p className="font-montserrat font-medium text-2xl">
                Payments are to be made on the website, an option to check out
                via card payments will be provided to you at final stage of your
                check out
              </p>
              <p className="font-montserrat font-medium text-base">
                Your personal details are safe as all payment mediums are
                through proper and secure channels
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full pl-7 py-6 bg-black text-white rounded-md md:inline-flex md:justify-center md:items-center md:w-[32.31%]">
              <h2 className="font-roboto font-bold text-2xl">DELIVERY</h2>
            </div>
            <div className="py-10 px-2.5 w-full border-1 border-[#202020] rounded-md flex flex-col gap-2.5">
              <p className="font-montserrat font-medium text-2xl">
                Delivery is made after payment confirmation at your cost, while
                delivery fees may change depending on your location
              </p>
              <p className="font-montserrat font-medium text-base underline">
                Contact us via whatsapp to facilitate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
