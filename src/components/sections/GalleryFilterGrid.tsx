"use client";

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
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--on-dark)]"
                  : "border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex aspect-[4/3] flex-col items-center justify-center border border-[var(--line)] bg-white/60 p-6 text-center"
          >
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
              {item.category}
            </span>
            <h3 className="mt-2 text-lg">{item.title}</h3>
            <p className="mt-2 text-xs text-[var(--mute)]">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
