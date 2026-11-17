"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroSlide =
  | { type: "video"; src: string; poster: string; alt: string; durationMs: number }
  | { type: "image"; src: string; alt: string; durationMs: number };

// Person-focused photos & videos only (Dr. Shuaib Malik)
const HERO_SLIDES: readonly HeroSlide[] = [
  {
    type: "image",
    src: "/images/founder-xray-portrait.webp",
    alt: "Dr. Shuaib Malik presenting in front of panoramic radiograph",
    durationMs: 3800,
  },
  {
    type: "video",
    src: "/videos/clip-02.mp4",
    poster: "/images/founder-xray-portrait.webp",
    alt: "Dr. Shuaib Malik clinical & surgical reel",
    durationMs: 6500,
  },
  {
    type: "image",
    src: "/images/lecture-zygomatic-wide.webp",
    alt: "Dr. Shuaib Malik lecturing on surgical protocol",
    durationMs: 3800,
  },
  {
    type: "image",
    src: "/images/hallway-consultation.webp",
    alt: "Dr. Shuaib Malik in studio consultation",
    durationMs: 3800,
  },
  {
    type: "video",
    src: "/videos/clip-05.mp4",
    poster: "/images/surgical-training-duo.webp",
    alt: "Dr. Shuaib Malik surgical training reel",
    durationMs: 6500,
  },
  {
    type: "image",
    src: "/images/keynote-stage-thank-you.webp",
    alt: "Dr. Shuaib Malik keynote stage presentation",
    durationMs: 3800,
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Recurring slideshow timer tailored per slide (3.8s photo, 6.5s video)
  useEffect(() => {
    if (reducedMotion) return;
    const ms = HERO_SLIDES[active]?.durationMs ?? 3800;
    const timer = window.setTimeout(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, ms);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion]);

  // GSAP Ken Burns zoom + restart/play active video
  useEffect(() => {
    const el = slideRefs.current[active];
    const vid = videoRefs.current[active];

    if (vid && !reducedMotion) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }

    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== active) v.pause();
    });

    if (!el || reducedMotion) return;
    const durSec = (HERO_SLIDES[active]?.durationMs ?? 3800) / 1000;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.06 },
        { scale: 1.0, duration: durSec, ease: "power1.out" }
      );
    });
    return () => ctx.revert();
  }, [active, reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--dark-deep)]">
      {HERO_SLIDES.map((slide, idx) => {
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
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                className="h-full w-full object-cover object-top contrast-[1.04] saturate-[1.05]"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
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

      {/* Editorial bottom gradient for legible typography */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
        aria-hidden="true"
      />

      {/* Minimalist slide pagination */}
      <div
        className="absolute bottom-6 right-5 z-20 flex items-center gap-2 md:right-8"
        role="tablist"
        aria-label="Hero slideshow"
      >
        {HERO_SLIDES.map((slide, idx) => {
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
