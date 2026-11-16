import Image from "next/image";
import type { ReactNode } from "react";
import { ActionLink, Container, Reveal, Section } from "@/components/ui/Primitives";
import { homeContent } from "@/config/home";

export function PageHero({
  title,
  subtitle,
  image,
  alt,
  grayscale = false,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  grayscale?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative flex min-h-[70svh] items-end bg-[var(--dark-deep)] text-[var(--on-dark)]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${grayscale ? "grayscale contrast-105" : ""}`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30"
        aria-hidden="true"
      />
      <Container className="relative z-10 pt-[calc(var(--header-h)+32px)] pb-14 md:pb-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl">{title}</h1>
          <p className="mt-4 text-base md:text-lg text-white/85">{subtitle}</p>
          {ctaLabel && ctaHref && (
            <div className="mt-6">
              <ActionLink href={ctaHref} dark>
                {ctaLabel}
              </ActionLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function EditorialBand({
  heading,
  paragraphs,
  centered = true,
  children,
}: {
  heading: string;
  paragraphs: readonly string[];
  centered?: boolean;
  children?: ReactNode;
}) {
  return (
    <Section>
      <Container>
        <Reveal
          className={
            centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
          }
        >
          <h2 className="text-2xl md:text-3xl">{heading}</h2>
          <div className="mt-5 space-y-4 text-[var(--mute)]">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </Container>
    </Section>
  );
}

export function SplitBand({
  heading,
  paragraphs,
  image,
  alt,
  imageFirst = false,
  dark = false,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  paragraphs: readonly string[];
  image: string;
  alt: string;
  imageFirst?: boolean;
  dark?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Section dark={dark}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal className={imageFirst ? "md:order-2" : "md:order-1"}>
            <h2 className="text-2xl md:text-3xl">{heading}</h2>
            <div
              className={`mt-5 space-y-4 ${
                dark ? "text-white/80" : "text-[var(--mute)]"
              }`}
            >
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            {ctaLabel && ctaHref && (
              <div className="mt-7">
                <ActionLink href={ctaHref} dark={dark}>
                  {ctaLabel}
                </ActionLink>
              </div>
            )}
          </Reveal>

          <Reveal className={imageFirst ? "md:order-1" : "md:order-2"}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--dark)]">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function TransformationShowcase() {
  const { heading, subtitle, ctaLabel, ctaHref, cases } =
    homeContent.beforeAfter;
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl">{heading}</h2>
          <p className="mt-4 text-[var(--mute)]">{subtitle}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <div
              key={item.id}
              className="flex aspect-[4/3] flex-col items-center justify-center border border-[var(--line)] bg-white/60 p-6 text-center"
            >
              <span className="font-[family-name:var(--font-heading)] text-lg font-bold uppercase tracking-[2px]">
                {item.label}
              </span>
              <span className="mt-2 text-xs uppercase tracking-[1.5px] text-[var(--mute)]">
                {item.note}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ActionLink href={ctaHref}>{ctaLabel}</ActionLink>
        </div>
      </Container>
    </Section>
  );
}

export function PreFooterBanner({
  heading = "Schedule a Consultation",
  subtitle = "Connect with our clinical team to begin your personalized smile evaluation.",
  ctaLabel = "Schedule a Consultation",
  ctaHref = "/schedule-a-consult",
}: {
  heading?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Section dark className="text-center border-b border-[var(--line-dark)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl">{heading}</h2>
          <p className="mt-4 text-white/80">{subtitle}</p>
          <div className="mt-6 flex justify-center">
            <ActionLink href={ctaHref} dark>
              {ctaLabel}
            </ActionLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
