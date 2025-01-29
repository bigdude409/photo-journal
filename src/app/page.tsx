"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./spinner";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP, SplitText);

export default function Home() {
  const [isAnimComplete, setIsAnimComplete] = useState(false);

  const container = useRef(null);
  const router = useRouter();
  const tl = gsap.timeline();

  useEffect(() => {
    // Ensure the router is ready before navigating
    if (isAnimComplete) {
      router.push('/blog');
    }
  }, [isAnimComplete]); // Include router.isReady in the dependency array

  useGSAP(() => {
    var split = new SplitText('.message', { type: "chars" });
    //now animate each character into place from 100px above, fading in:
    tl.from(split.chars, {
      duration: 1,
      y: -75,
      autoAlpha: 0,
      stagger: 0.05,
      ease: "elastic.out(1, 0.7)"
    }, "+=.3");
    tl.to(split.chars, {
      color: "#888", // Gold color, often used in stars title sequences
      duration: .25,
      stagger: 0.05,
      // ease: "power4.in"
    }, "-=.5");
    tl.to(split.chars, {
      color: "white", // Gold color, often used in stars title sequences
      duration: .25,
      stagger: 0.05,
      // ease: "power4.in"
    }, "-=.75");
    tl.to(split.chars, {
      opacity: 0,
      duration: .25,
      stagger: 0.05,
      // ease: "power4.in"
    }, "+=.5");
    // tl.to('.end', {
    //   opacity: 1,
    //   duration: .25,
    //   ease: "power4.in"
    // }, "+=.25");
    tl.to({}, { // Empty tween for delay
      duration: .3,
      onComplete: () => {
        setIsAnimComplete(true);
      }
    });
  }, { scope: container });

  return (
    <>
      {/* <Spinner /> */}
      <div ref={container} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

          {/* <Image
            className="end dark:invert self-center"
            style={{ opacity: 0, width: "auto" }}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          /> */}

          <h1
            style={{ opacity: 1, textTransform: "uppercase" }}
            className="message text-4xl">Build What's Next...
          </h1>

        </div>
      </div>
    </>
  );
}
