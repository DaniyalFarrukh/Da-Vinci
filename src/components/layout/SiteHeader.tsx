"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  // Track scroll position for transparent-over-hero -> solid header transition
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // iOS Safari-safe body scroll lock + focus trap + Escape key
  useEffect(() => {
    if (!drawerOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [drawerOpen, closeDrawer]);

  const toggleGroup = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={`fixed top-0 left-0 right-0 z-30 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#090908]/95 text-[#FAF8F4] border-b border-[#C9A96E]/25 backdrop-blur-md shadow-[0_10px_32px_rgba(0,0,0,0.45)]"
            : "bg-gradient-to-b from-black/80 via-black/45 to-transparent text-[#FAF8F4] border-b border-transparent"
        }`}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-7">
          {/* Top row: balanced spacer + centered crest & serif wordmark + right drawer toggle */}
          <div className="flex h-[72px] md:h-[62px] items-center justify-between gap-1">
            <div className="w-8 sm:w-11 shrink-0" aria-hidden="true" />

            <Link
              href="/"
              className="flex min-h-[44px] min-w-0 items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 no-underline text-current group"
            >
              <span className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-[18%] border border-[#C9A96E]/50 shadow-[0_0_16px_rgba(201,169,110,0.18)] transition-transform duration-300 group-hover:scale-[1.03]">
                <Image
                  src="/images/da-vinci-mark.webp"
                  alt="da Vinci Dental Works crest"
                  fill
                  priority
                  quality={100}
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="font-[family-name:var(--font-heading)] text-[11px] sm:text-lg md:text-[22px] font-medium uppercase tracking-[0.08em] sm:tracking-[0.16em] md:tracking-[0.22em] text-[#FAF8F4] whitespace-nowrap">
                {siteConfig.brand.name}
              </span>
            </Link>

            <button
              ref={triggerRef}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              onClick={() => setDrawerOpen(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center text-[#DFC38C] transition-colors hover:text-[#FAF8F4] cursor-pointer"
            >
              <span className="flex w-5 flex-col gap-[5px]">
                <span className="block h-[1.5px] w-full bg-current" />
                <span className="block h-[1.5px] w-full bg-current" />
                <span className="block h-[1.5px] w-full bg-current" />
              </span>
            </button>
          </div>

          {/* Desktop gold hairline divider */}
          <div
            className="hidden md:block mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent"
            aria-hidden="true"
          />

          {/* Desktop centered secondary row navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex h-[48px] items-center justify-center gap-8 lg:gap-12"
          >
            {siteConfig.nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="nav-dropdown-trigger relative flex items-center"
                >
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-[12px] lg:text-[13px] font-medium uppercase tracking-[0.22em] text-[#DFC38C] transition-colors hover:text-[#FAF8F4]"
                  >
                    {item.label}
                  </Link>
                  <div className="nav-dropdown-menu invisible absolute left-1/2 top-full min-w-[240px] -translate-x-1/2 translate-y-1 border border-[#C9A96E]/25 bg-[#090908]/95 py-2.5 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex min-h-[44px] items-center px-5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#FAF8F4]/90 transition-colors hover:bg-[#C9A96E]/10 hover:text-[#DFC38C]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#DFC38C] transition-colors hover:text-[#FAF8F4] border-b border-[#C9A96E]/50 hover:border-[#FAF8F4]"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Full-height black drawer with accordion +/- submenus, focus trap, Escape, iOS scroll lock */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60"
          onClick={closeDrawer}
        >
          <aside
            id="site-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="flex h-dvh w-full max-w-[400px] flex-col overflow-y-auto bg-[var(--dark-deep)] text-[var(--on-dark)] p-6"
            style={{
              paddingTop: "calc(24px + var(--safe-top))",
              paddingBottom: "calc(24px + var(--safe-bottom))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between border-b border-[var(--line-dark)] pb-4">
              <span className="font-[family-name:var(--font-heading)] text-lg font-bold uppercase tracking-[3px]">
                {siteConfig.brand.name}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={closeDrawer}
                className="flex h-11 w-11 items-center justify-center text-2xl text-[var(--on-dark)] hover:text-[var(--accent)] cursor-pointer"
              >
                ×
              </button>
            </div>

            <nav aria-label="Drawer menu" className="flex flex-col">
              {siteConfig.nav.map((item) => {
                const isOpen = !!expanded[item.label];
                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeDrawer}
                      className="flex min-h-[48px] items-center border-b border-[var(--line-dark)] py-3 font-[family-name:var(--font-heading)] text-xl font-bold uppercase tracking-[2px] text-[var(--on-dark)] hover:text-[var(--accent)]"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="border-b border-[var(--line-dark)]"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={closeDrawer}
                        className="flex min-h-[48px] flex-1 items-center py-3 font-[family-name:var(--font-heading)] text-xl font-bold uppercase tracking-[2px] text-[var(--on-dark)] hover:text-[var(--accent)]"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={isOpen}
                        onClick={() => toggleGroup(item.label)}
                        className="flex h-11 w-11 items-center justify-center text-xl text-[var(--on-dark)] hover:text-[var(--accent)] cursor-pointer"
                      >
                        {isOpen ? "−" : "+"}
                      </button>
                    </div>
                    {isOpen && (
                      <div className="flex flex-col pb-3 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeDrawer}
                            className="flex min-h-[44px] items-center text-sm uppercase tracking-[1.5px] text-white/80 hover:text-[var(--accent)]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
