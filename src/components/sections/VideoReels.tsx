"use client";

import { useEffect, useRef } from "react";

const REELS = [
  { src: "/videos/clip-01.mp4", poster: "/images/surgical-team-hands-on.webp", label: "Clinical Reel 01" },
  { src: "/videos/clip-02.mp4", poster: "/images/da-vinci-emblem.webp", label: "Clinical Reel 02" },
  { src: "/videos/clip-03.mp4", poster: "/images/lab-model-sculpting.webp", label: "Clinical Reel 03" },
  { src: "/videos/clip-04.mp4", poster: "/images/surgical-loupes-closeup.webp", label: "Clinical Reel 04" },
  { src: "/videos/clip-05.mp4", poster: "/images/digital-planning-display.webp", label: "Clinical Reel 05" },
  { src: "/videos/clip-06.mp4", poster: "/images/harvard-mgh-team.webp", label: "Clinical Reel 06" },
] as const;

export function VideoReels() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const videos = Array.from(root.querySelectorAll("video"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      {REELS.map((reel) => (
        <figure
          key={reel.src}
          className="relative aspect-[9/16] overflow-hidden border border-[#C9A96E]/30 bg-[var(--dark-deep)] shadow-[0_14px_38px_rgba(17,17,16,0.12)]"
        >
          <video
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="none"
            poster={reel.poster}
            aria-label={reel.label}
          >
            <source src={reel.src} type="video/mp4" />
          </video>
        </figure>
      ))}
    </div>
  );
}
