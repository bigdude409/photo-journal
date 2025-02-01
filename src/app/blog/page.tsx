'use client';

// Correct the import path or ensure the module exists at the specified path
import { ImageWithExif } from "@/components/ImageWithExif";

import { ExifData } from "@/components/ImageWithExif";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from 'react';
import { Lightbox } from '@/components/Lightbox';
// import LoginPage from '../login/page';
import { useRouter } from 'next/navigation';
import LoginPage from "../login/page";

// [
//   {
//       "_id": "679d4f69e89fa984a957360f",
//       "userId": "679d4b923a736d3bb0133bd0",
//       "images": [
//           {
//               "exifData": {
//                   "make": "Canon",
//                   "model": "EOS 77D",
//                   "fNumber": "2.8",
//                   "iso": 128000,
//                   "focalLength": "1600",
//                   "dateTaken": "2024-03-19",
//                   "location": "Glamis Dunes, CA",
//                   "shutterSpeed": "1/2500"
//               },
//               "src": "/photos/photo1.jpg",
//               "alt": "Landscape photo",
//               "_id": "679d4f69e89fa984a9573610"
//           }
//       ],
//       "__v": 0
//   }
// ]

interface BlogImage {
  _id: number;
  src: string;
  alt: string;
  exifData: ExifData;
}

const HomePage = () => {
  const [blogImages, setBlogImages] = useState<BlogImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<BlogImage | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);


  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchImages = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming you store the email in localStorage
        console.log('User ID:', userId);
        const response = await fetch(`http://localhost:3010/api/v1/user/media/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data[0].images)) {
          setBlogImages(data[0].images);
          console.log('Updated blogImages:', data[0].images);
        } else {
          console.error('Data.images is not an array:', data[0].images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [ router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    localStorage.removeItem('userId'); // Remove the email
    router.push('/login'); // Redirect to login
  };

  useGSAP(() => {
    gsap.from(".fade-in", { opacity: 0, duration: .5, ease: "power2.inOut" });
  }, []);

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'black' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="fade-in text-3xl font-normal ml-8 font-[family-name:var(--font-geist-sans)]" style={{ color: '#FFD700' }}>
          BUD'S OFFROADING ADVENTURES
        </h1>
        <button onClick={handleLogout} className="text-white hover:text-gray-300" style={{ backgroundColor: 'black', color: '#FFD700', border: '1px solid #FFD700', borderRadius: '10px', padding: '5px 10px' }}>
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogImages.map((image) => (
          <div key={image._id}>
            <div
              className="relative group cursor-zoom-in"
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithExif
                src={image.src}
                alt={image.alt}
                exifData={image.exifData}
              />
            </div>
            <div style={{ color: '#FFD700', fontSize: '14px' }} className="fade-in bottom-0 right-0 p-2 text-right text-white">
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
};

export default HomePage; 