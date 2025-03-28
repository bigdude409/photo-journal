'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { fraction, format } from 'mathjs';

import Image from 'next/image';
export interface ExifData {
    make?: string;
    model?: string;
    exposureTime?: string;
    fNumber?: string;
    iso?: number;
    focalLength?: string;
    dateTaken?: string;
    location?: string;
    shutterSpeed?: string;
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
                    duration: 0.3,
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

    // Calculate width based on text length
    const makeText = `${exifData.model}`;
    const textWidth = (makeText?.length ?? 0) * 8 + 17; // Use default length of 0 if makeText is undefined

    const exposureTime = exifData.exposureTime ? format(fraction(exifData.exposureTime), { fraction: 'ratio' }) : '';

    return (
        <div style={{ opacity: 0 }}
            ref={containerRef}>
            <div
                className="relative inline-block w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={300}
                    height={200}
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
                        <path fill="var(--text-color)" d="M21 6h-4.18C16.4 4.84 14.98 4 13.5 4c-1.48 0-2.9.84-3.32 2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11c-2.49 0-4.5-2.01-4.5-4.5S11.01 8 13.5 8s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5S12.12 15 13.5 15s2.5-1.12 2.5-2.5S14.88 10 13.5 10z" />
                    </svg>
                    <text
                        x="20"
                        y="20"
                        fill="var(--text-color)"
                        fontFamily="var(--font-geist-mono)"
                        fontSize="11"
                    // dominantBaseline="hanging"
                    >
                        <tspan dx="15" dy="5">{exifData.model}</tspan>

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
                        fill="var(--text-color)"
                        fontFamily="var(--font-geist-mono)"
                        fontSize="12"
                        fontWeight="bold"
                        // dominantBaseline="hanging"
                        textAnchor="middle"
                    >
                        <tspan dx="0" dy="-15">{exposureTime}</tspan>
                        <tspan dx="0" dy="0" fontSize="8">S</tspan>
                        <tspan dx="10" dy="0"><tspan style={{ fontFamily: "Times New Roman", fontStyle: "italic" }}>f/</tspan>{exifData.fNumber}</tspan>
                        <tspan dx="10" dy="0">{exifData.iso}</tspan>
                        <tspan dx="0" dy="0" fontSize="8">ISO</tspan>
                        <tspan dx="10" dy="0">{exifData.focalLength}</tspan>
                        <tspan dx="0" dy="0" fontSize="8">MM</tspan>
                    </text>
                </svg>

            </div>


        </div>
    );
}; 