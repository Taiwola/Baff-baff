"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { decodeBlurHash } from "fast-blurhash";

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoad' | 'placeholder' | 'blurDataURL'> {
  src: string;
  alt: string;
  className?: string;
  blurhash?: string; // Optional blurhash string
  placeholderColor?: string;
}

export default function ProgressiveImage({ 
  src, 
  alt, 
  className = "",
  quality = 75,
  blurhash,
  placeholderColor = "bg-gray-100",
  ...props 
}: ProgressiveImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string | undefined>();

  // Generate blur placeholder from blurhash
  useEffect(() => {
    if (blurhash) {
      try {
        // Decode blurhash to pixel data (32x32 is standard for placeholders)
        const pixels = decodeBlurHash(blurhash, 32, 32);
        
        // Convert pixels to base64 image
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const imageData = ctx.createImageData(32, 32);
          imageData.data.set(pixels);
          ctx.putImageData(imageData, 0, 0);
          const dataUrl = canvas.toDataURL();
          setBlurDataUrl(dataUrl);
        }
      } catch (error) {
        console.error('Failed to decode blurhash:', error);
      }
    }
  }, [blurhash]);

  useEffect(() => {
    setImageSrc(src);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      {/* Fallback placeholder if no blurhash provided */}
      {!blurDataUrl && (
        <div 
          className={`absolute inset-0 ${placeholderColor} transition-opacity duration-700 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        quality={quality}
        loading="lazy"
        placeholder={blurDataUrl ? "blur" : "empty"}
        blurDataURL={blurDataUrl}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}