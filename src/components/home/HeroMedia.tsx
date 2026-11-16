"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroMediaProps {
  desktopPoster: string;
  mobilePoster: string;
  desktopVideo: string | null;
  mobileVideo: string | null;
}

export function HeroMedia({
  desktopPoster,
  mobilePoster,
  desktopVideo,
  mobileVideo,
}: HeroMediaProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--dark-deep)]">
      {/* Desktop landscape layer (md and up) */}
      <div className="relative hidden h-full w-full md:block">
        <Image
          src={desktopPoster}
          alt="da Vinci Dental Works clinical team"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {desktopVideo && !reducedMotion && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={desktopPoster}
          >
            <source src={desktopVideo} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Mobile vertical layer (< md), with poster fallback for iOS Low Power Mode */}
      <div className="relative block h-full w-full md:hidden">
        <Image
          src={mobilePoster}
          alt="da Vinci Dental Works emblem"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {mobileVideo && !reducedMotion && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={mobilePoster}
          >
            <source src={mobileVideo} type="video/mp4" />
          </video>
        )}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25"
        aria-hidden="true"
      />
    </div>
  );
}
