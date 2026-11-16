"use client";

import Image from "next/image";
import { useState } from "react";
import { buzzItems } from "@/config/pages";

export function BuzzGrid() {
  const [visibleCount, setVisibleCount] = useState(6);
  const shown = buzzItems.slice(0, visibleCount);
  const hasMore = visibleCount < buzzItems.length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {shown.map((item) => (
          <article
            key={item.id}
            className="flex flex-col border border-[var(--line)] bg-white/60"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--dark)]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--mute)]">
                {item.outlet}
              </span>
              <h2 className="mt-2 text-xl">{item.title}</h2>
              <p className="mt-3 flex-1 text-sm text-[var(--mute)]">
                {item.excerpt}
              </p>
              <span className="mt-5 inline-flex min-h-[44px] items-center text-xs font-bold uppercase tracking-[2px] text-[var(--ink)]">
                TODO: Read More
              </span>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + 3)}
            className="action-link text-[var(--ink)]"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
