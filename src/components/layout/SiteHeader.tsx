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
        className={`fixed top-0 left-0 right-0 z-30 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-[var(--bg)] text-[var(--ink)] border-b border-[var(--line)]"
            : "bg-transparent text-[var(--on-dark)] border-b border-transparent"
        }`}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--container-max)] items-center justify-between px-4 md:px-7">
          {/* Mobile left spacer to keep brand centered on mobile */}
          <div className="w-11 shrink-0 md:hidden" aria-hidden="true" />

          {/* Brand crest + wordmark */}
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-3 no-underline text-current"
          >
            <span
              className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-[14%] border transition-colors ${
                scrolled ? "border-[var(--ink)]/20" : "border-white/30"
              }`}
            >
              <Image
                src="/images/da-vinci-mark.webp"
                alt="da Vinci Dental Works crest"
                fill
                priority
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col items-start text-left">
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold uppercase tracking-[3px] leading-none">
                {siteConfig.brand.shortName}
              </span>
              <span
                className={`mt-1 text-[10px] font-bold uppercase tracking-[3px] leading-none ${
                  scrolled ? "text-[var(--mute)]" : "text-white/80"
                }`}
              >
                {siteConfig.brand.subName}
              </span>
            </span>
          </Link>

          {/* Desktop 1440px inline navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {siteConfig.nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="nav-dropdown-trigger relative flex items-center"
                >
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-[15px] font-bold uppercase tracking-[1.5px] text-current transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                  <div className="nav-dropdown-menu invisible absolute left-0 top-full min-w-[240px] translate-y-1 bg-[var(--dark-deep)] py-3 opacity-0 shadow-lg transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex min-h-[44px] items-center px-5 text-[14px] font-medium uppercase tracking-[1.2px] text-[var(--on-dark)] transition-colors hover:text-[var(--accent)]"
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
                  className="action-link text-[15px] tracking-[1.5px] text-current"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Far-right hamburger toggle */}
          <button
            ref={triggerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            onClick={() => setDrawerOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-current transition-colors hover:text-[var(--accent)] cursor-pointer"
          >
            <span className="flex w-6 flex-col gap-[5px]">
              <span className="block h-[1.5px] w-full bg-current" />
              <span className="block h-[1.5px] w-full bg-current" />
              <span className="block h-[1.5px] w-full bg-current" />
            </span>
          </button>
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
