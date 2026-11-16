"use client";

import { useState } from "react";
import { processSteps } from "@/config/pages";

export function ProcessAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {processSteps.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.step} className="py-2">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="flex min-h-[56px] w-full flex-col items-start justify-between gap-2 py-4 text-left cursor-pointer sm:flex-row sm:items-center"
            >
              <span className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold uppercase tracking-[2px] text-[var(--ink)]">
                {item.step}
              </span>
              <span className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[1.5px] text-[var(--mute)]">
                  · {item.duration}
                </span>
                <span
                  className="text-xl font-bold text-[var(--ink)]"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 pr-8 text-[var(--mute)]">
                <p>{item.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
