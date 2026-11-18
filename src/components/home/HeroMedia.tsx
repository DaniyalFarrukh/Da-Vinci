"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeroSlide =
  | {
      type: "video";
      src: string;
      poster: string;
      alt: string;
      caption: string;
      durationMs: number;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      durationMs: number;
    };

// Person-focused photos & videos only (Dr. Shuaib Malik)
const HERO_SLIDES: readonly HeroSlide[] = [
  {
    type: "image",
    src: "/images/founder-xray-portrait.webp",
    alt: "Dr. Shuaib Malik presenting in front of panoramic radiograph",
    caption: "01 · Surgical & Facial Architecture",
    durationMs: 4200,
  },
  {
    type: "video",
    src: "/videos/clip-02.mp4",
    poster: "/images/founder-xray-portrait.webp",
    alt: "Dr. Shuaib Malik clinical & surgical reel",
    caption: "02 · Precision In Motion",
    durationMs: 6500,
  },
  {
    type: "image",
    src: "/images/lecture-zygomatic-wide.webp",
    alt: "Dr. Shuaib Malik lecturing on surgical protocol",
    caption: "03 · Academic & Clinical Leadership",
    durationMs: 4200,
  },
  {
    type: "image",
    src: "/images/hallway-consultation.webp",
    alt: "Dr. Shuaib Malik in studio consultation",
    caption: "04 · Bespoke Patient Consultation",
    durationMs: 4200,
  },
  {
    type: "video",
    src: "/videos/clip-05.mp4",
    poster: "/images/surgical-training-duo.webp",
    alt: "Dr. Shuaib Malik surgical training reel",
    caption: "05 · Hands-On Surgical Artistry",
    durationMs: 6500,
  },
  {
    type: "image",
    src: "/images/keynote-stage-thank-you.webp",
    alt: "Dr. Shuaib Malik keynote stage presentation",
    caption: "06 · International Symposiums",
    durationMs: 4200,
  },
];

interface LuxuryHeroProps {
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export function LuxuryHero({
  heading,
  subtitle,
  ctaLabel,
  ctaHref,
}: LuxuryHeroProps) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // GSAP entrance choreography (keeps opacity: 1 for instant first paint)
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (copyRef.current) {
        const items = copyRef.current.querySelectorAll("[data-hero-anim]");
        gsap.from(items, {
          y: 22,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Self-running slideshow timer
  useEffect(() => {
    if (reducedMotion) return;
    const ms = HERO_SLIDES[active]?.durationMs ?? 4200;
    const timer = window.setTimeout(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, ms);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion]);

  // GSAP Ken Burns motion + active video playback + gold progress bar fill
  useEffect(() => {
    const el = slideRefs.current[active];
    const vid = videoRefs.current[active];
    const bar = progressRefs.current[active];

    if (vid && !reducedMotion) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }

    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== active) v.pause();
    });

    if (reducedMotion) return;

    const durSec = (HERO_SLIDES[active]?.durationMs ?? 4200) / 1000;
    const ctx = gsap.context(() => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 1.07 },
          { scale: 1.0, duration: durSec, ease: "power1.out" }
        );
      }
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: durSec, ease: "none" }
        );
      }
    });

    return () => ctx.revert();
  }, [active, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-end overflow-hidden bg-[#090908] text-[#FAF8F4]"
    >
      {/* Full-bleed self-running Dr. Shuaib Malik media */}
      <div className="absolute inset-0 overflow-hidden bg-[#090908]">
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
                  className="h-full w-full object-cover object-top contrast-[1.06] saturate-[1.04]"
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
                  quality={100}
                  sizes="100vw"
                  className="object-cover object-top contrast-[1.06] saturate-[1.04]"
                />
              )}
            </div>
          );
        })}

        {/* Architectural obsidian & subtle champagne-gold vignettes */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-[#090908]/80 via-[#090908]/20 to-[#090908]/92 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-[#090908]/75 via-[#090908]/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-20 z-10 h-[360px] w-[360px] rounded-full bg-[#C9A96E]/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Editorial Lockup (clean, minimal, exact reference layout) */}
      <div className="relative z-20 mx-auto w-full max-w-[var(--container-max)] px-5 md:px-10 pt-[calc(var(--header-h)+24px)] pb-14 md:pb-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div ref={copyRef} className="max-w-xl">
            <h1
              data-hero-anim
              className="text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-[#FAF8F4]"
            >
              {heading}
            </h1>
            <p
              data-hero-anim
              className="mt-4 max-w-md text-sm md:text-base text-[#FAF8F4]/85"
            >
              {subtitle}
            </p>
            <div data-hero-anim className="mt-6">
              <Link
                href={ctaHref}
                className="action-link text-xs md:text-sm tracking-[0.2em] text-[#FAF8F4]"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Minimalist Auto-Progressing Gold Reel Bars */}
          <div
            className="flex items-center gap-2 self-start md:self-end md:pb-1"
            aria-label="Hero reel progress"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === active;
              return (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`View reel ${idx + 1}: ${slide.caption}`}
                  onClick={() => setActive(idx)}
                  className="flex h-11 items-center px-0.5 cursor-pointer"
                >
                  <span className="relative block h-[2px] w-7 md:w-9 overflow-hidden bg-white/30">
                    {isCurrent && (
                      <span
                        ref={(el) => {
                          progressRefs.current[idx] = el;
                        }}
                        className="absolute inset-0 block bg-[#C9A96E]"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
