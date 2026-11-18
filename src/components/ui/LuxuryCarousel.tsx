"use client";

import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface CarouselItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export function LuxuryCarousel({
  items,
  aspectClass = "aspect-[16/10]",
  autoPlayMs = 3800,
}: {
  items: readonly CarouselItem[];
  aspectClass?: string;
  autoPlayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || autoPlayMs <= 0) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(next, autoPlayMs);
    return () => window.clearInterval(id);
  }, [items.length, autoPlayMs, next]);

  useEffect(() => {
    const el = slideRefs.current[index];
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.04 },
        { scale: 1.0, duration: 1.4, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [index]);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`relative w-full overflow-hidden border border-[#C9A96E]/35 bg-[var(--dark)] shadow-[0_24px_70px_rgba(0,0,0,0.45)] ${aspectClass}`}
      >
        {items.map((item, idx) => {
          const active = idx === index;
          return (
            <div
              key={item.id}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={100}
                sizes="(max-width: 767px) 100vw, 80vw"
                className="object-cover contrast-[1.03] saturate-[1.04]"
              />
              {(item.title || item.subtitle) && (
                <>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-[var(--on-dark)]">
                    {item.subtitle && (
                      <p className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
                        {item.subtitle}
                      </p>
                    )}
                    {item.title && (
                      <p className="mt-1 font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold uppercase tracking-[2px]">
                        {item.title}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[#090908]/75 text-white backdrop-blur-sm transition-colors hover:bg-[#C9A96E] hover:text-[#090908] cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[#090908]/75 text-white backdrop-blur-sm transition-colors hover:bg-[#C9A96E] hover:text-[#090908] cursor-pointer"
            >
              ›
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Slide pagination"
        >
          {items.map((item, idx) => {
            const active = idx === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setIndex(idx)}
                className="flex h-11 min-w-[28px] items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-[2px] transition-all duration-300 ${
                    active
                      ? "w-8 bg-[#C9A96E]"
                      : "w-4 bg-[#C9A96E]/35 hover:bg-[#C9A96E]/75"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
