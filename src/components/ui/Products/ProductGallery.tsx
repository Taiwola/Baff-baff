"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="w-full flex justify-center">
      {/* Desktop layout */}
      <div
        className="hidden md:flex gap-4"
        style={{ width: "34.375rem", height: "34.375rem" }}
      >
        {/* Thumbnails (scrollable vertically) */}
        <div className="flex flex-col gap-[0.625rem] overflow-y-auto no-scrollbar w-[6.25rem]">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(img)}
              className={`w-full h-[7.5rem] border flex-shrink-0 cursor-pointer ${selected === img ? "border-brand-dark" : "border-gray-300"}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={100}
                height={120}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="w-[27.5rem] h-[34.375rem] flex-shrink-0">
          <Image
            src={selected}
            alt="Selected product"
            width={440}
            height={550}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden w-full">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-[23.1875rem]">
              <Image
                src={img}
                alt={`Mobile product image ${idx + 1}`}
                width={250}
                height={250}
                className="object-cover w-full h-full rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
