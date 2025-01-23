'use client';

import { useEffect } from 'react';

export function hideSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 500);
  }
}

export function SplashScreen() {
  useEffect(() => {
    // Hide splash screen when the page is fully loaded
    window.addEventListener('load', hideSplashScreen);
    
    // Fallback to hide splash screen after 2 seconds
    const timeout = setTimeout(hideSplashScreen, 2000);

    return () => {
      window.removeEventListener('load', hideSplashScreen);
      clearTimeout(timeout);
    };
  }, []);

  return null;
} 