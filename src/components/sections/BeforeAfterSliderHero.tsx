"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
      ref={containerRef}
      onClick={(e) => {
        setInteracted(true);
        updatePosFromClientX(e.clientX);
      }}
      className="relative flex min-h-[clamp(440px,78vh,760px)] items-end overflow-hidden bg-[var(--dark-deep)] text-[var(--on-dark)] select-none"
    >
      {/* Before image underneath (pre-treatment tone) */}
      <Image
        src={current.beforeImage}
        alt={`${current.title} — before treatment`}
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover"
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
          quality={95}
          sizes="100vw"
          className="object-cover contrast-[1.06] brightness-[1.05] saturate-[1.08]"
        />
      </div>

      {/* Bottom editorial gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/15 to-black/25"
        aria-hidden="true"
      />

      {/* Top Before / After badges */}
      <span className="ba-tag pointer-events-none">Before</span>
      <span className="ba-tag ba-tag-after pointer-events-none">After</span>

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
        className="absolute left-4 top-[42%] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-2xl text-white transition-colors hover:bg-black/80 hover:text-[var(--accent)] cursor-pointer"
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
        className="absolute right-4 top-[42%] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-2xl text-white transition-colors hover:bg-black/80 hover:text-[var(--accent)] cursor-pointer"
      >
        ›
      </button>

      {/* Top pagination dots */}
      <div
        className="absolute top-[calc(var(--header-h)+12px)] inset-x-0 z-20 flex justify-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
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
            className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
              idx === index ? "bg-white" : "bg-white/45 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Bottom-left title */}
      <div className="pointer-events-none relative z-10 max-w-2xl px-7 pb-12">
        <h1 className="text-3xl md:text-5xl">Before and After Photos</h1>
        <p className="mt-3 text-base text-white/85">
          Our smile makeovers favor careful, nuanced improvements, for natural
          results that keep overall balance and facial harmony.
        </p>
      </div>
    </section>
  );
}
