'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ExifData {
  make?: string;
  model?: string;
  exposureTime?: string;
  fNumber?: string;
  iso?: number;
  focalLength?: string;
  dateTaken?: string;
}

interface ImageWithExifProps {
  src: string;
  alt: string;
  exifData: ExifData;
}

export const ImageWithExif = ({ src, alt, exifData }: ImageWithExifProps) => {
  const overlayRef = useRef<SVGSVGElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isHovering) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isHovering]);

  return (
    <div 
      className="relative inline-block w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover aspect-[4/3]"
      />
      <svg
        ref={overlayRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.7)"
        />
        <text
          x="20"
          y="40"
          fill="#FFD700"
          fontFamily="Arial"
          fontSize="14"
        >
          <tspan x="20" dy="0">Camera: {exifData.make} {exifData.model}</tspan>
          <tspan x="20" dy="25">Exposure: {exifData.exposureTime}s</tspan>
          <tspan x="20" dy="25">Aperture: f/{exifData.fNumber}</tspan>
          <tspan x="20" dy="25">ISO: {exifData.iso}</tspan>
          <tspan x="20" dy="25">Focal Length: {exifData.focalLength}</tspan>
          <tspan x="20" dy="25">Date: {exifData.dateTaken}</tspan>
        </text>
      </svg>
    </div>
  );
}; 