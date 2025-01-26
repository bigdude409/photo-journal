'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
        <>
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
                        fill="rgba(0,0,0,0.5)"
                    />
                    <text
                        x="10"
                        y="100%"
                        fill="#FFD700"
                        fontFamily="var(--font-geist-mono)"
                        fontSize="11"
                        dominantBaseline="hanging"
                    >
                        <tspan x="20" dy="-20">{exifData.make} {exifData.model}</tspan>

                    </text>
                    <text
                        x="calc(95%)"
                        y="100%"
                        width="100%"
                        // y="100"
                        fill="#FFD700"
                        fontFamily="var(--font-geist-mono)"
                        fontSize="11"
                        dominantBaseline="hanging"
                    >
                        <tspan dx="-170" dy="-20">{exifData.exposureTime}s</tspan>
                        <tspan dx="10" dy="0">f/{exifData.fNumber}</tspan>
                        <tspan dx="10" dy="0">{exifData.iso} ISO</tspan>
                        <tspan dx="10" dy="0">{exifData.focalLength}</tspan>
                    </text>
                </svg>

            </div>
            <div style={{ color: '#FFD700', fontSize: '14px' }} className=" bottom-0 right-0 p-2 text-right text-white">
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                       
                       <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#FFD700"/>
                       </svg>
                       <div>{exifData.location}</div>
                   </div>
                   <div>{exifData.dateTaken ? new Date(exifData.dateTaken).toLocaleDateString() : 'Unknown Date'}</div>
               </div>
            </div>

        </>
    );
}; 