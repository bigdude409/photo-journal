'use client';

// Correct the import path or ensure the module exists at the specified path
import { ImageWithExif } from "@/components/ImageWithExif";

import { ExifData } from "@/components/ImageWithExif";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { useState } from 'react';
import { Lightbox } from '@/components/Lightbox';

interface BlogImage {
  id: number;
  src: string;
  alt: string;
  exifData: ExifData;
}

const blogImages: BlogImage[] = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    alt: "Landscape photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/2500",
      fNumber: "2.8",
      iso: 128000,
      focalLength: "1600",
      dateTaken: "2024-03-19",
      location: "Glamis Dunes, CA"
    }
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Nikon",
      model: "Z6",
      shutterSpeed: "1/259",
      fNumber: "5.6",
      iso: 50,
      focalLength: "85",
      dateTaken: "2024-03-18",
      location: "Pismo Beach, CA"
    }
  },
  {
    id: 3,
    src: "/photos/photo1.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Nikon",
      model: "Z6",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "105",
      dateTaken: "2024-03-18",
      location: "Glamis Dunes, CA"
    }
  },
  {
    id: 4,
    src: "/photos/photo1.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  },
  {
    id: 5,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  }, {
    id: 6,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  }, {
    id: 7,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  }, {
    id: 8,
    src: "/photos/photo1.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  }, {
    id: 9,
    src: "/photos/photo1.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  }, {
    id: 10,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  }, {
    id: 11,
    src: "/photos/photo1.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Canon",
      model: "EOS 77D",
      shutterSpeed: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85",
      dateTaken: "2024-03-18"
    }
  },
  // Add more images as needed
];

export default function BlogPage() {
  const [selectedImage, setSelectedImage] = useState<BlogImage | null>(null);

  useGSAP(() => {
    gsap.from("h1", { opacity: 0, duration: .5, ease: "power2.inOut" });
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-normal mb-8 ml-8 font-[family-name:var(--font-geist-sans)]" style={{ color: '#FFD700' }}>
        BUD'S OFFROADING ADVENTURES
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogImages.map((image) => (
          <div key={image.id}>
            <div
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithExif
                src={image.src}
                alt={image.alt}
                exifData={image.exifData}
              />
            </div>
            <div style={{ color: '#FFD700', fontSize: '14px' }} className=" bottom-0 right-0 p-2 text-right text-white">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                  {image.exifData.location && (
                    <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#FFD700" />
                    </svg>
                  )}
                  <div>{image.exifData.location}</div>
                </div>
                <div>{image.exifData.dateTaken ? new Date(image.exifData.dateTaken).toLocaleDateString() : ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <Lightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </main>
  );
} 