"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

interface Greeting {
  text: string;
  lang: string;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const splashRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const greetings: Greeting[] = [
    { text: "Hello", lang: "English" },
    { text: "Halo", lang: "Indonesian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "안녕하세요", lang: "Korean" }
  ];

  useEffect(() => {
    runSplashAnimation();
  }, []);

  const runSplashAnimation = (): void => {
    if (!splashRef.current || !textRef.current) return;

    const masterTimeline = gsap.timeline({
      onComplete: () => {
        // Fade out splash
        gsap.to(splashRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    // Animate each greeting
    greetings.forEach((greeting, index) => {
      // Set content
      masterTimeline.call(() => {
        if (textRef.current) {
          textRef.current.textContent = greeting.text;
        }
      });

      // Fade in
      masterTimeline.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // Hold
      masterTimeline.to({}, { duration: 0.8 });

      // Fade out (except last)
      if (index < greetings.length - 1) {
        masterTimeline.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in"
        });
      }
    });
  };

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div
        ref={textRef}
        className="text-5xl md:text-7xl font-bold text-foreground"
      />
    </div>
  );
}