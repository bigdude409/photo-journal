'use client';

// Correct the import path or ensure the module exists at the specified path
import { ImageWithExif } from "@/components/ImageWithExif";

import { ExifData } from "@/components/ImageWithExif";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from 'react';
import { Lightbox } from '@/components/Lightbox';
import { useRouter } from 'next/navigation';

interface BlogImage {
  _id: number;
  src: string;
  alt: string;
  exifData: ExifData;
}

const getLocaleDateStr = (image: BlogImage) => {
  const inputDateStr = image.exifData.dateTaken;

  // Replace colons in the date part with dashes to make it a valid format
  const formattedDateStr = inputDateStr?.replace(":", "-").replace(":", "-");

  // Create a Date object
  const dateObj = formattedDateStr ? new Date(formattedDateStr) : '';

  // Convert to locale format
  const localeDateStr = dateObj ? dateObj.toLocaleString() : '';
  return localeDateStr;
}

const HomePage = () => {
  const [blogImages, setBlogImages] = useState<BlogImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<BlogImage | null>(null);

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
        const response = await fetch(`http:///${window.location.hostname}:3010/api/v1/user/media/${userId}`, {
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
          setBlogImages(data.map((item: { images: BlogImage[]; }) => item.images).flat());
          // setBlogImages(data[0].images);
          console.log('Updated blogImages:', data[0].images);
        } else {
          console.error('Data.images is not an array:', data[0].images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [router]);

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
          SANTA BARBARA TRIP
        </h1>
        <button onClick={handleLogout} className="fade-in text-white hover:text-gray-300"
          style={{ fontSize: '12px', backgroundColor: 'rgba(0, 0, 0, 0.9)', color: '#666', border: '1px solid #666', borderRadius: '10px', padding: '2px 10px', transition: 'background-color 0.3s ease' }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#FFD700'; e.currentTarget.style.borderColor = '#FFD700' }}
          onMouseOut={(e) => { e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = '#666' }}>
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
                src={"/media/" + image.src}
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
                <div>{getLocaleDateStr(image)}</div>
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