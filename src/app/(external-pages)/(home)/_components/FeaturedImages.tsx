import Image from "next/image";

export default function FeaturedImages() {
  const slides = [
    { id: 1, component: <Image src={"/images/feature-imageSvg1.svg"} width={100} height={100} priority alt="feature image" className="w-full h-auto" /> },
    { id: 2, component: <Image src={"/images/feature-imageSvg2.svg"} width={100} height={100} priority alt="feature image" className="w-full h-auto" /> },
    { id: 3, component: <Image src={"/images/feature-imageSvg3.svg"} width={100} height={100} priority alt="feature image" className="w-full h-auto" /> },
    { id: 4, component: <Image src={"/images/feature-imageSvg4.svg"} width={100} height={100} priority alt="feature image" className="w-full h-auto" /> },
    { id: 5, component: <Image src={"/images/feature-imageSvg5.svg"} width={100} height={100} priority alt="feature image" className="w-full h-auto" /> },
    { id: 6, component: <Image src={"/images/feature-imageSvg6.svg"} width={100} height={100} priority alt="feature image" className="w-full h-auto" /> },
  ];

  return (
    <div className="relative w-full mx-auto overflow-hidden md:overflow-x-scroll no-scrollbar">
      <div className="flex transition-transform duration-500 ease-in-out">
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 flex justify-center">
            {slide.component}
          </div>
        ))}
      </div>
    </div>
  );
}
