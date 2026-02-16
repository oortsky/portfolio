"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedGreetingProps {
t: (key: string, ...args: any[]) => string | any;
}

export function AnimatedGreeting({ t }: AnimatedGreetingProps) {
  const prefixRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentStateRef = useRef<"codename" | "realname">("codename");

  useEffect(() => {
    const wrapText = (text: string): string => {
      return text
        .split("")
        .map(
          (char, index) =>
            `<span style="display: inline-block; opacity: 0;">${char === " " ? "&nbsp;" : char}</span>`
        )
        .join("");
    };

    const animateText = () => {
      const isCodename = currentStateRef.current === "codename";
      const prefixText = String(
        isCodename ? t("greeting.myCodename") : t("greeting.myRealname")
      );
      const nameText = String(
        isCodename ? t("greeting.codename") : t("greeting.realname")
      );

      if (!prefixRef.current || !nameRef.current) return;

      prefixRef.current.innerHTML = wrapText(prefixText);
      nameRef.current.innerHTML = wrapText(nameText);

      const prefixSpans = prefixRef.current.querySelectorAll("span");
      const nameSpans = nameRef.current.querySelectorAll("span");

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            eraseText(prefixSpans, nameSpans);
          }, 2000);
        }
      });

      timelineRef.current.to(prefixSpans, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: "power2.inOut"
      });

      timelineRef.current.to(
        nameSpans,
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05,
          ease: "power2.inOut"
        },
        "-=0.2"
      );
    };

    const eraseText = (
      prefixSpans: NodeListOf<Element>,
      nameSpans: NodeListOf<Element>
    ) => {
      const eraseTimeline = gsap.timeline({
        onComplete: () => {
          currentStateRef.current =
            currentStateRef.current === "codename" ? "realname" : "codename";

          setTimeout(() => {
            animateText();
          }, 500);
        }
      });

      eraseTimeline.to(nameSpans, {
        opacity: 0,
        duration: 0.05,
        stagger: {
          each: 0.05,
          from: "end"
        },
        ease: "power2.inOut"
      });

      eraseTimeline.to(
        prefixSpans,
        {
          opacity: 0,
          duration: 0.05,
          stagger: {
            each: 0.05,
            from: "end"
          },
          ease: "power2.inOut"
        },
        "-=0.2"
      );
    };

    animateText();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [t]);

  return (
    <span className="block text-xl font-light mt-3 md:text-2xl">
      <span ref={prefixRef} className="inline-block"></span>{" "}
      <span ref={nameRef} className="font-bold inline-block"></span>
    </span>
  );
}
