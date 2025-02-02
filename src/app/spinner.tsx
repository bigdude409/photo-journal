'use client';

import { useRef } from 'react';
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";


export function Spinner() {
  // Loads too quick to see the spinner
  // Hide spinner when the page is fully loaded
  const spinnerRef = useRef<HTMLDivElement>(null);
 
  // const tl = gsap.timeline();

  // useGSAP(() => {
  //   tl.to(spinnerRef.current, {
  //     opacity: 0,
  //     duration: 2,
  //     ease: "power4.in"
  //   });
  // }, []);

  return (
    <div ref={spinnerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-500">
      <div className="animate-[pulse_2s_ease-in-out_infinite] text-2xl font-bold">
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
                dur="1s"
                repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="scale"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.4 1 0.6 1; 0.4 1 0.6 1" />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
}
