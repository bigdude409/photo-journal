'use client';

import { ExifData } from "./ImageWithExif";
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

interface LightboxProps {
  image: {
    src: string;
    alt: string;
    exifData: ExifData;
  } | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const overlayRef = useRef<SVGSVGElement>(null);
  const [isHovering, setIsHovering] = useState(false);

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
      <div 
        className="relative max-w-7xl mx-auto p-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[90vh] w-auto object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <svg
            ref={overlayRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.5)"
            />
            <svg
              x="10"
              y="10"
              width="24"
              height="24"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#FFD700" d="M21 6h-4.18C16.4 4.84 14.98 4 13.5 4c-1.48 0-2.9.84-3.32 2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11c-2.49 0-4.5-2.01-4.5-4.5S11.01 8 13.5 8s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5S12.12 15 13.5 15s2.5-1.12 2.5-2.5S14.88 10 13.5 10z" />
            </svg>
            <text
              x="20"
              y="20"
              fill="#FFD700"
              fontFamily="var(--font-geist-mono)"
              fontSize="11"
            >
              <tspan dx="15" dy="5">{image.exifData.make} {image.exifData.model}</tspan>
            </text>
            <text
              x="50%"
              y="100%"
              width="100%"
              fill="#FFD700"
              fontFamily="var(--font-geist-mono)"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              <tspan dx="0" dy="-15">{image.exifData.shutterSpeed}</tspan>
              <tspan dx="0" dy="0" fontSize="7">S</tspan>
              <tspan dx="10" dy="0">f/{image.exifData.fNumber}</tspan>
              <tspan dx="10" dy="0">{image.exifData.iso}</tspan>
              <tspan dx="0" dy="0" fontSize="7">ISO</tspan>
              <tspan dx="10" dy="0">{image.exifData.focalLength}</tspan>
              <tspan dx="0" dy="0" fontSize="7">MM</tspan>
            </text>
          </svg>
        </div>
        <div style={{ color: '#FFD700', fontSize: '14px' }} className="mt-4 p-2 text-right">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {image.exifData.location && (
                <>
                  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#FFD700" />
                  </svg>
                  <div>{image.exifData.location}</div>
                </>
              )}
            </div>
            <div>{image.exifData.dateTaken ? new Date(image.exifData.dateTaken).toLocaleDateString() : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 