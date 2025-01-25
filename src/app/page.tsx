"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Home() {
  const headingRef = useRef(null);

  useGSAP(() => {
    var split = new SplitText(headingRef.current, { type: "chars" });
    //now animate each character into place from 100px above, fading in:
    gsap.from(split.chars, {
      duration: .5,
      y: 200,
      autoAlpha: 0,
      stagger: 0.05
    });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 ref={headingRef} className="text-4xl font-bold">Build what's next!!!</h1>
      </div>
    </div>
  );
}
