"use client";

import Image from "next/image";
import { useState } from "react";
import { teamMembers } from "@/config/pages";
import { siteConfig } from "@/config/site";

export function TeamGrid() {
  const [activeLoc, setActiveLoc] = useState<string>("all");

  const filters = [
    { id: "all", label: "All" },
    ...siteConfig.locations.map((l) => ({ id: l.id, label: l.city })),
  ];

  const filtered =
    activeLoc === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.locationId === activeLoc);

  return (
    <div>
      {/* Filter tabs: horizontally scrollable on mobile, centered on desktop */}
      <div
        role="tablist"
        aria-label="Filter team by location"
        className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:justify-center"
      >
        {filters.map((f) => {
          const active = activeLoc === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveLoc(f.id)}
              className={`min-h-[44px] shrink-0 border px-5 py-2 text-xs font-bold uppercase tracking-[2px] transition-colors cursor-pointer ${
                active
                  ? "border-[#C9A96E] bg-[#C9A96E] text-[#090908]"
                  : "border-[#C9A96E]/30 bg-transparent text-[var(--ink)] hover:border-[#C9A96E]"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* 4-column 3:4 portrait grid with hover badge on desktop & always-visible badge on mobile */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((member) => (
          <article
            key={member.id}
            className="group relative aspect-[3/4] overflow-hidden bg-[var(--dark)]"
          >
            <Image
              src={member.image}
              alt={member.alt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover"
            />
            <div
              className="
                absolute inset-x-0 bottom-0 bg-[var(--dark-deep)]/90 p-4 text-[var(--on-dark)]
                transition-all duration-300
                md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0
              "
            >
              <h3 className="text-base font-bold tracking-[1.5px]">
                {member.name}
              </h3>
              <p className="mt-1 text-xs text-white/80">{member.role}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[1.5px] text-[var(--accent)]">
                {member.locationLabel}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
