import { FeatureImageSvg1 } from "@assets/svg/featureImagesSvg1";
import { FeatureImageSvg3 } from "@assets/svg/featureImagesSvg3";
import { FeatureImageSvg2 } from "@assets/svg/featureImageSvg2";
import { FeatureImageSvg4 } from "@assets/svg/featureImageSvg4";
import { FeatureImageSvg5 } from "@assets/svg/featureImageSvg5";
import { FeatureImageSvg6 } from "@assets/svg/featureImageSvg6";

export default function FeaturedImages() {
  const slides = [
    { id: 1, component: <FeatureImageSvg1 className="w-full h-auto" /> },
    { id: 2, component: <FeatureImageSvg2 className="w-full h-auto" /> },
    { id: 3, component: <FeatureImageSvg3 className="w-full h-auto" /> },
    { id: 4, component: <FeatureImageSvg4 className="w-full h-auto" /> },
    { id: 5, component: <FeatureImageSvg5 className="w-full h-auto" /> },
    { id: 6, component: <FeatureImageSvg6 className="w-full h-auto" /> },
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
