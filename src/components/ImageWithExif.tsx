'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface ExifData {
    make?: string;
    model?: string;
    exposureTime?: string;
    fNumber?: string;
    iso?: number;
    focalLength?: string;
    dateTaken?: string;
    location?: string;
}

interface ImageWithExifProps {
    src: string;
    alt: string;
    exifData: ExifData;
}

export const ImageWithExif = ({ src, alt, exifData }: ImageWithExifProps) => {
    const overlayRef = useRef<SVGSVGElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const containerRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (containerRef.current) {
            gsap.to(containerRef.current, 
                { 
                    opacity: 1, 
                    duration: 0.25,
                    ease: 'power2.inOut'
                });
        }
    }, []);

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
        <div style={{ opacity: 0 }}
            ref={containerRef}>
            <div
                className="relative inline-block w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover aspect-[4/3] rounded-xl"
                />
                <svg
                    ref={overlayRef}
                    className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        width="100%"
                        height="100%"
                        fill="rgba(0,0,0,0.5)"
                    />
                    <svg
                        x="10"
                        y="10"  // Adjust y position to bottom left, considering the height of the SVG
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
                        dominantBaseline="hanging"
                    >
                        <tspan x="32" dy="-4">{exifData.make} {exifData.model}</tspan>

                    </text>
                    <text
                        x="calc(50%)"
                        y="100%"
                        width="100%"
                        fill="#FFD700"
                        fontFamily="var(--font-geist-mono)"
                        fontSize="11"
                        fontWeight="bold"  // Added bold font style
                        dominantBaseline="hanging"
                        textAnchor="middle"
                    >
                        <tspan dx="0" dy="-20">{exifData.exposureTime}</tspan>
                        <tspan dx="0" dy="0" fontSize="7">S</tspan>
                        <tspan dx="10" dy="0">f/{exifData.fNumber}</tspan>
                        <tspan dx="10" dy="0">{exifData.iso}</tspan>
                        <tspan dx="0" dy="0" fontSize="7">ISO</tspan>
                        <tspan dx="10" dy="0">{exifData.focalLength}</tspan>
                        <tspan dx="0" dy="0" fontSize="7">MM</tspan>
                    </text>
                </svg>

            </div>
            <div style={{ color: '#FFD700', fontSize: '14px' }} className=" bottom-0 right-0 p-2 text-right text-white">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#FFD700" />
                        </svg>
                        <div>{exifData.location}</div>
                    </div>
                    <div>{exifData.dateTaken ? new Date(exifData.dateTaken).toLocaleDateString() : 'Unknown Date'}</div>
                </div>
            </div>

        </div>
    );
}; 