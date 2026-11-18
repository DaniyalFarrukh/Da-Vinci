"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO = {
  src: "/videos/hero-section-video.mp4",
  alt: "da Vinci Dental Works hero showcase video",
} as const;

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
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const copyRef = useRef<HTMLDivElement>(null);

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

  // Ensure hero video plays on mount when motion is allowed
  useEffect(() => {
    const vid = videoRef.current;
    if (vid && !reducedMotion) {
      vid.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-end overflow-hidden bg-[#090908] text-[#FAF8F4]"
    >
      {/* Full-bleed hero section video only */}
      <div className="absolute inset-0 overflow-hidden bg-[#090908]">
        {!reducedMotion && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center brightness-[1.06] contrast-[1.06] saturate-[1.06]"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            aria-label={HERO_VIDEO.alt}
          >
            <source src={HERO_VIDEO.src} type="video/mp4" />
          </video>
        )}

        {/* Architectural obsidian & subtle champagne-gold vignettes */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-[#090908]/55 via-transparent to-[#090908]/75 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-[#090908]/55 via-[#090908]/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-20 z-10 h-[360px] w-[360px] rounded-full bg-[#C9A96E]/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Editorial Lockup (mobile-safe spacing & typography) */}
      <div
        className="relative z-20 mx-auto w-full max-w-[var(--container-max)] px-5 md:px-10 md:pb-20"
        style={{
          paddingTop: "calc(var(--header-h) + var(--safe-top) + 24px)",
          paddingBottom: "calc(44px + var(--safe-bottom))",
        }}
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div ref={copyRef} className="max-w-xl">
            <h1
              data-hero-anim
              className="text-[30px] sm:text-5xl md:text-6xl leading-[1.08] text-[#FAF8F4]"
            >
              {heading}
            </h1>
            <p
              data-hero-anim
              className="mt-3 sm:mt-4 max-w-md text-sm md:text-base text-[#FAF8F4]/85"
            >
              {subtitle}
            </p>
            <div data-hero-anim className="mt-5 sm:mt-6">
              <Link
                href={ctaHref}
                className="action-link text-xs md:text-sm tracking-[0.2em] text-[#FAF8F4]"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
