"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-max)] px-5 md:px-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  dark = false,
  className = "",
  id,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-14 md:py-20 ${
        dark
          ? "bg-[var(--dark)] text-[var(--on-dark)]"
          : "bg-[var(--bg)] text-[var(--ink)]"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function ActionLink({
  href,
  children,
  dark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`action-link ${
        dark ? "text-[var(--on-dark)]" : "text-[var(--ink)]"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
