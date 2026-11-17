"use client";

import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroSlide =
  | { type: "video"; src: string; poster: string; alt: string }
  | { type: "image"; src: string; alt: string };

// Client-only photos & videos from D:\Da Vinci\Photos and D:\Da Vinci\Videos (no chairs/rooms)
const CLIENT_HERO_SLIDES: readonly HeroSlide[] = [
  {
    type: "image",
    src: "/images/surgical-team-hands-on.webp",
    alt: "Dr. Shuaib Malik leading hands-on surgical collaboration",
  },
  {
    type: "video",
    src: "/videos/clip-02.mp4",
    poster: "/images/founder-xray-portrait.webp",
    alt: "Dr. Shuaib Malik clinical & surgical reel",
  },
  {
    type: "image",
    src: "/images/lab-model-sculpting.webp",
    alt: "Dr. Shuaib Malik and master ceramist sculpting 3D arch restoration",
  },
  {
    type: "image",
    src: "/images/digital-planning-display.webp",
    alt: "Dr. Shuaib Malik presenting digital surgical and smile planning",
  },
  {
    type: "video",
    src: "/videos/clip-05.mp4",
    poster: "/images/surgical-loupes-closeup.webp",
    alt: "Precision surgical & restorative work in action",
  },
  {
    type: "image",
    src: "/images/harvard-mgh-team.webp",
    alt: "Dr. Shuaib Malik with surgical colleagues",
  },
];

interface HeroMediaProps {
  desktopPoster?: string;
  mobilePoster?: string;
  desktopVideo?: string | null;
  mobileVideo?: string | null;
}

export function HeroMedia(_props: HeroMediaProps) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % CLIENT_HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, next]);

  useEffect(() => {
    const el = slideRefs.current[active];
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.06 },
        { scale: 1.0, duration: 5.0, ease: "power1.out" }
      );
    });
    return () => ctx.revert();
  }, [active, reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--dark-deep)]">
      {CLIENT_HERO_SLIDES.map((slide, idx) => {
        const isCurrent = idx === active;
        return (
          <div
            key={`${slide.type}-${slide.src}`}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            aria-hidden={!isCurrent}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "video" && !reducedMotion ? (
              <video
                className="h-full w-full object-cover object-top contrast-[1.04] saturate-[1.05]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={slide.poster}
                aria-label={slide.alt}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.type === "video" ? slide.poster : slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                quality={95}
                sizes="100vw"
                className="object-cover object-top contrast-[1.04] saturate-[1.05]"
              />
            )}
          </div>
        );
      })}

      {/* Posh editorial vignette for crisp white typography */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-black/35"
        aria-hidden="true"
      />

      {/* Minimalist hero slideshow pagination */}
      <div
        className="absolute bottom-6 right-5 z-20 flex items-center gap-2 md:right-8"
        role="tablist"
        aria-label="Hero slideshow"
      >
        {CLIENT_HERO_SLIDES.map((slide, idx) => {
          const isCurrent = idx === active;
          return (
            <button
              key={`${slide.src}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Hero slide ${idx + 1}`}
              onClick={() => setActive(idx)}
              className="flex h-11 min-w-[24px] items-center justify-center cursor-pointer"
            >
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  isCurrent ? "w-8 bg-[var(--accent)]" : "w-4 bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
