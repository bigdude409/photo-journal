'use client';

import { ExifData } from "./ImageWithExif";
import { useEffect } from "react";

interface LightboxProps {
  image: {
    src: string;
    alt: string;
    exifData: ExifData;
  } | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-7xl mx-auto p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[90vh] w-auto object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <div 
          className="absolute bottom-4 left-4 text-white bg-black/50 p-4 rounded"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm">
            {image.exifData.make} {image.exifData.model} • 
            f/{image.exifData.fNumber} • 
            {image.exifData.shutterSpeed}s • 
            ISO {image.exifData.iso} • 
            {image.exifData.focalLength}mm
          </p>
          {image.exifData.location && (
            <p className="text-sm mt-1">{image.exifData.location}</p>
          )}
        </div>
      </div>
    </div>
  );
} 