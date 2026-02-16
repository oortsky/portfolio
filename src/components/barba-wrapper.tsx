"use client";

import { useEffect, useRef, ReactNode } from "react";

interface BarbaWrapperProps {
  children: ReactNode;
}

export function BarbaWrapper({ children }: BarbaWrapperProps) {
  const barbaInitialized = useRef<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initBarba = async () => {
      const { gsap } = await import("gsap");
      const barba = (await import("@barba/core")).default;

      if (!barbaInitialized.current) {
        barbaInitialized.current = true;

        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            }
          );
        }

        barba.init({
          transitions: [
            {
              name: "default-transition",

              async leave(data: any) {
                await gsap.to(data.current.container, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.inOut"
                });
              },

              async enter(data: any) {
                await gsap.fromTo(
                  data.next.container,
                  { opacity: 0 },
                  {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                  }
                );
              }
            }
          ],

          prevent: ({ el }) => el.classList && el.classList.contains("no-barba")
        });

        barba.hooks.enter(() => {
          window.scrollTo(0, 0);
        });
      }
    };

    initBarba();

    return () => {
      if (barbaInitialized.current) {
        import("@barba/core").then(({ default: barba }) => {
          barba.destroy();
        });
      }
    };
  }, []);

  return (
    <div ref={contentRef} data-barba="wrapper" className="min-h-screen">
      <div data-barba="container" data-barba-namespace="home">
        {children}
      </div>
    </div>
  );
}
