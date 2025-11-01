import { ManInBlueShirtSvg } from "@assets/svg/manInBlueShirtSvg";

export default function FeaturedImages() {
  const slides = [
    { id: 1, component: <ManInBlueShirtSvg className="w-full h-auto" /> },
    { id: 2, component: <ManInBlueShirtSvg className="w-full h-auto" /> },
    { id: 3, component: <ManInBlueShirtSvg className="w-full h-auto" /> },
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
