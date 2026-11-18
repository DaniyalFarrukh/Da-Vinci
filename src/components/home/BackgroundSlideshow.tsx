"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
}

export function BackgroundSlideshow({ slides }: { slides: readonly Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--dark-deep)]">
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30"
        aria-hidden="true"
      />
    </div>
  );
}
