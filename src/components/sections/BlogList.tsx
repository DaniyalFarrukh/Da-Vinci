"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogPosts } from "@/config/pages";

const PER_PAGE = 3;

export function BlogList() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = blogPosts.slice(start, start + PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {visible.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col border border-[#C9A96E]/30 bg-white shadow-[0_14px_38px_rgba(17,17,16,0.06)]"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="relative block aspect-[4/3] w-full overflow-hidden bg-[var(--dark)]"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--mute)]">
                {post.category} · {post.date}
              </span>
              <h2 className="mt-2 text-xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm text-[var(--mute)]">
                {post.excerpt}
              </p>
              <div className="mt-5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="action-link text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Numeric pagination */}
      <nav
        aria-label="Journal pagination"
        className="mt-12 flex items-center justify-center gap-3"
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            aria-current={page === num ? "page" : undefined}
            onClick={() => setPage(num)}
            className={`min-h-[44px] min-w-[44px] border text-sm font-bold transition-colors cursor-pointer ${
              page === num
                ? "border-[#C9A96E] bg-[#C9A96E] text-[#090908]"
                : "border-[#C9A96E]/30 text-[var(--ink)] hover:border-[#C9A96E]"
            }`}
          >
            {num}
          </button>
        ))}
      </nav>
    </div>
  );
}
