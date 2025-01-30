'use client';

import { ExifData } from "./ImageWithExif";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LightboxProps {
  image: {
    src: string;
    alt: string;
    exifData: ExifData;
  } | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (image) {
      // Animate Overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Animate Content
      gsap.fromTo(
        contentRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [image]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      // Animate Overlay Out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });

      // Animate Content Out
      gsap.to(contentRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!image) return null;

  // Calculate width based on text length
  const makeText = `${image.exifData.make} ${image.exifData.model}`;
  const textWidth = (makeText?.length ?? 0) * 8 + 17; // Use default length of 0 if makeText is undefined

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-default"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative max-w-7xl mx-auto p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-4 right-4 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
            <g transform="rotate(45, 12, 12)">
              <circle cx="12" cy="12" r="10" fill="#000" fillOpacity="0.5"  />
              <path d="M6 12 h 12 m -6 -6 v 12" stroke={isHovered ? '#FFD700' : '#888'} strokeWidth="1" strokeLinecap="round"/>
            </g>
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
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.0)"
            />
            <rect
              x="5"
              y="10"
              width={textWidth}
              height="22"
              rx="8"
              fill="rgba(0,0,0,0.5)"
            />
            <svg
              x="10"
              y="11"
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
            <rect
              x="50%"
              y="calc(100% - 32px)"
              width="200"
              height="25"
              rx="8"
              transform="translate(-100, 0)"
              fill="rgba(0,0,0,0.5)"
            />
            <text
              x="50%"
              y="100%"
              width="100%"
              fill="#FFD700"
              fontFamily="var(--font-geist-mono)"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              <tspan dx="0" dy="-15">{image.exifData.shutterSpeed}</tspan>
              <tspan dx="0" dy="0" fontSize="8">S</tspan>
              <tspan dx="10" dy="0"><tspan style={{ fontFamily: "Times New Roman", fontStyle: "italic" }}>f/</tspan>{image.exifData.fNumber}</tspan>
              <tspan dx="10" dy="0">{image.exifData.iso}</tspan>
              <tspan dx="0" dy="0" fontSize="8">ISO</tspan>
              <tspan dx="10" dy="0">{image.exifData.focalLength}</tspan>
              <tspan dx="0" dy="0" fontSize="8">MM</tspan>
            </text>
          </svg>
        </div>
        <div style={{ color: '#FFD700', fontSize: '14px' }} className="mt-4 p-2 text-right">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '0.5rem' }}>
              {image.exifData.location && (
                <>
                  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#FFD700" />
                  </svg>
                  <div>{image.exifData.location}</div>
                </>
              )}
            </div>
            <div className="bg-black/50 px-4 py-2 rounded-lg">
              {image.exifData.dateTaken ? new Date(image.exifData.dateTaken).toLocaleDateString() : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 