"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryCases } from "@/config/pages";

const CATEGORIES = ["All", "Veneers", "Full Makeover", "Implant & Surgical"] as const;

export function GalleryFilterGrid() {
  const [category, setCategory] = useState<string>("All");

  const items =
    category === "All"
      ? galleryCases
      : galleryCases.filter((c) => c.category === category);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`min-h-[44px] border px-5 py-2 text-xs font-bold uppercase tracking-[2px] transition-colors cursor-pointer ${
                active
                  ? "border-[#C9A96E] bg-[#C9A96E] text-[#090908]"
                  : "border-[#C9A96E]/30 bg-transparent text-[var(--ink)] hover:border-[#C9A96E]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden bg-[var(--dark)]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              quality={100}
              sizes="(max-width: 767px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--on-dark)]">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
                {item.category}
              </span>
              <h3 className="mt-1 text-lg">{item.title}</h3>
              <p className="mt-1 text-xs text-white/75">{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
