'use client';

// Correct the import path or ensure the module exists at the specified path
import { ImageWithExif } from "@/components/ImageWithExif";

interface BlogImage {
  id: number;
  src: string;
  alt: string;
  exifData: {
    make?: string;
    model?: string;
    exposureTime?: string;
    fNumber?: string;
    iso?: number;
    focalLength?: string;
    dateTaken?: string;
  };
}

const blogImages: BlogImage[] = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    alt: "Landscape photo",
    exifData: {
      make: "Canon",
      model: "EOS R5",
      exposureTime: "1/250",
      fNumber: "2.8",
      iso: 100,
      focalLength: "70mm",
      dateTaken: "2024-03-19"
    }
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Sony",
      model: "A7IV",
      exposureTime: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85mm",
      dateTaken: "2024-03-18"
    }
  },
  {
    id: 3,
    src: "/photos/photo1.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Sony",
      model: "A7IV",
      exposureTime: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85mm",
      dateTaken: "2024-03-18"
    }
  },
  {
    id: 4,
    src: "/photos/photo2.jpg",
    alt: "Portrait photo",
    exifData: {
      make: "Sony",
      model: "A7IV",
      exposureTime: "1/125",
      fNumber: "1.8",
      iso: 400,
      focalLength: "85mm",
      dateTaken: "2024-03-18"
    }
  },
  // Add more images as needed
];

export default function BlogPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Bud's trip to Pismo Beach</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogImages.map((image) => (
          <div key={image.id} className="relative group">
            <ImageWithExif
              src={image.src}
              alt={image.alt}
              exifData={image.exifData}
            />
          </div>
        ))}
      </div>
    </main>
  );
} 