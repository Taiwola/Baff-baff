"use client";

import SwiperCarousel from "@components/features/home/Swipper";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

export default function FeaturedImages() {
  const images = [
    "/images/feature-imageSvg1.svg",
    "/images/feature-imageSvg2.svg",
    "/images/feature-imageSvg3.svg",
    "/images/feature-imageSvg4.svg",
    "/images/feature-imageSvg5.svg",
    "/images/feature-imageSvg6.svg",
  ];

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SwiperCarousel
          spaceBetween={10}
          slidesPerView={1.7}        // Mobile: show partial next slide
          slidesPerGroup={1}
          infinite={true}            // Enables infinite loop
          autoplay={true}
          className="featured-swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="w-full shrink-0 flex justify-center">
                <Image
                  src={src}
                  width={200}
                  height={200}
                  alt={`Feature icon ${index + 1}`}
                  className="w-full h-auto min-h-max object-contain drop-shadow-md"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </SwiperCarousel>
      </div>
    </section>
  );
}