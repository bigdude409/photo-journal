"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Home() {
  const messageRef = useRef(null);
  const endMessageRef = useRef(null);
  const tl = gsap.timeline();

  useGSAP(() => {
    var split = new SplitText(messageRef.current, { type: "chars" });
    //now animate each character into place from 100px above, fading in:
    tl.from(split.chars, {
      duration: 1,
      y: -75,
      autoAlpha: 0,
      stagger: 0.05,
      ease: "elastic.out(1, 0.7)"
    }, "+=2.25");
    tl.to(split.chars, {
      color: "orange",
      duration: .25,
      stagger: 0.05,
      // ease: "power4.in"
    }, "-=.5");
    tl.to(split.chars, {
      opacity: 0,
      duration: .25,
      stagger: 0.05,
      // ease: "power4.in"
    }, "+=.5");
    tl.to(endMessageRef.current, {
      opacity: 1,
      duration: .25,
      ease: "power4.in"
    }, "+=.25");
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 ref={messageRef} style={{opacity: 1}} className="text-4xl font-bold">Build what's Next!!!</h1>

        <h1 ref={endMessageRef} style={{opacity: 0}} className="text-4xl font-bold text-center self-center">!</h1>
      </div>
    </div>
  );
}
