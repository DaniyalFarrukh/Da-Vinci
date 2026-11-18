"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Primitives";
import { galleryCases } from "@/config/pages";

export function BeforeAfterSliderHero() {
  const cases = galleryCases.slice(0, 6);
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const current = cases[index];

  // Idle sinusoidal sweep until user interacts
  useEffect(() => {
    if (interacted) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = ((now - start) % 3400) / 3400;
      const eased = 0.5 - 0.5 * Math.cos(elapsed * Math.PI * 2);
      setPos(18 + 64 * eased);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [interacted, index]);

  const updatePosFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDownHandle = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setInteracted(true);
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMoveHandle = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updatePosFromClientX(e.clientX);
  };

  const onPointerUpHandle = () => {
    draggingRef.current = false;
  };

  return (
    <section
      className="bg-[var(--dark-deep)] text-[var(--on-dark)] border-b border-[var(--line-dark)]"
      style={{ paddingTop: "calc(var(--header-h) + var(--safe-top))" }}
    >
      <Container className="py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
          {/* Left editorial copy */}
          <div className="md:col-span-5 border-l-2 border-[#C9A96E] pl-5 md:pl-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
              Before and After Photos
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85">
              Our smile makeovers favor careful, nuanced improvements, for
              natural results that keep overall balance and facial harmony.
            </p>
          </div>

          {/* Right 4:3 interactive before/after slider */}
          <div className="md:col-span-7">
            <div
              ref={containerRef}
              onClick={(e) => {
                setInteracted(true);
                updatePosFromClientX(e.clientX);
              }}
              className="relative aspect-[4/3] w-full overflow-hidden border border-[#C9A96E]/35 bg-[var(--dark-deep)] shadow-[0_20px_60px_rgba(0,0,0,0.45)] select-none"
            >
              {/* Before image underneath (monochrome pre-treatment tone) */}
              <Image
                src={current.beforeImage}
                alt={`${current.title} — before treatment`}
                fill
                priority
                quality={100}
                sizes="(max-width: 767px) 100vw, 58vw"
                className="object-cover grayscale contrast-[1.06]"
              />

              {/* After image clipped on top in full bright porcelain finish */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              >
                <Image
                  src={current.afterImage}
                  alt={`${current.title} — after treatment`}
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 767px) 100vw, 58vw"
                  className="object-cover contrast-[1.06] brightness-[1.05] saturate-[1.08]"
                />
              </div>

              {/* Top Before / After badges */}
              <span className="ba-tag pointer-events-none">Before</span>
              <span className="ba-tag ba-tag-after pointer-events-none">
                After
              </span>

              {/* Draggable divider handle */}
              <div
                role="slider"
                tabIndex={0}
                aria-label={`Compare before and after for ${current.title}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                style={{ left: `${pos}%` }}
                className="ba-slider-handle"
                onPointerDown={onPointerDownHandle}
                onPointerMove={onPointerMoveHandle}
                onPointerUp={onPointerUpHandle}
                onKeyDown={(e) => {
                  setInteracted(true);
                  if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
                  if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
                }}
              >
                <span className="ba-slider-knob" />
              </div>

              {/* Prev / Next transformation buttons */}
              <button
                type="button"
                aria-label="Previous transformation"
                onClick={(e) => {
                  e.stopPropagation();
                  setInteracted(true);
                  setIndex((i) => (i - 1 + cases.length) % cases.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[#090908]/75 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-[#C9A96E] hover:text-[#090908] cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next transformation"
                onClick={(e) => {
                  e.stopPropagation();
                  setInteracted(true);
                  setIndex((i) => (i + 1) % cases.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[#090908]/75 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-[#C9A96E] hover:text-[#090908] cursor-pointer"
              >
                ›
              </button>
            </div>

            {/* Pagination dots cleanly below the slider */}
            <div className="mt-3 flex justify-center gap-1">
              {cases.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Show transformation ${idx + 1}`}
                  aria-current={idx === index ? "true" : undefined}
                  onClick={() => {
                    setInteracted(true);
                    setIndex(idx);
                  }}
                  className="flex h-11 w-11 items-center justify-center cursor-pointer"
                >
                  <span
                    className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                      idx === index
                        ? "bg-[#C9A96E]"
                        : "bg-white/40 hover:bg-[#C9A96E]/80"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
