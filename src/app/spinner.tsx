'use client';

import { useEffect, useRef } from 'react';

export function hideSpinner(spinner: HTMLDivElement | null) {
 
  if (spinner) {
    spinner.animate(
      [
        { opacity: 1 },
        { opacity: 0 }
      ],
      {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
      }
    );
  }
}

export function Spinner() {
  // Loads too quick to see the spinner
  // Hide spinner when the page is fully loaded
  const spinnerRef = useRef<HTMLDivElement>(null);
  const spinner = () => hideSpinner(spinnerRef.current);
  // window.addEventListener('load', spinner);


  useEffect(() => {
    // Fallback to hide spinner after 1 seconds

    const timeout = setTimeout(spinner, 1000);

    return () => {
      window.removeEventListener('load', spinner);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={spinnerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-500">
      <div className="animate-[pulse_1s_ease-in-out_infinite] text-2xl font-bold">

        <svg viewBox="0 0 100 100" width="100" height="100">
          <rect width="100%" height="100%" fill="#000" />
          <g transform="translate(50, 50)">
            <circle cx="0" cy="0" r="44" fill="none" stroke="#FFF" strokeWidth="3" strokeDasharray="72.15 20">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="2s"
                repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="scale"
                values="1;0.75;1"
                dur="2s"
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
}
