import Image from "next/image";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/home/BackgroundSlideshow";
import { LuxuryHero } from "@/components/home/HeroMedia";
import { BeforeAfterGrid } from "@/components/sections/BeforeAfterGrid";
import { LuxuryCarousel } from "@/components/ui/LuxuryCarousel";
import { ActionLink, Container, Reveal, Section } from "@/components/ui/Primitives";
import { homeContent } from "@/config/home";

export default function HomePage() {
  const {
    hero,
    experienceIntro,
    featurePanels,
    revolutionizing,
    beforeAfter,
    journey,
    founderQuote,
    videoSocialBand,
    mediaBuzz,
    preFooterConsult,
  } = homeContent;

  return (
    <>
      {/* 1. Luxury Editorial Hero (GSAP choreography + Dr. Shuaib Malik media + floating museum gallery) */}
      <LuxuryHero
        heading={hero.heading}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
      />

      {/* 2a. Editorial Obsidian Intro Split (matching attached luxury layout) */}
      <Section
        id="experience"
        dark
        className="border-t border-b border-[var(--line-dark)]"
      >
        <Container>
          <Reveal className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div
                className="mb-4 h-px w-12 bg-[var(--accent)]"
                aria-hidden="true"
              />
              <h2 className="text-2xl md:text-4xl font-medium leading-tight text-[#FAF8F4]">
                {experienceIntro.heading}
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-5">
              <p className="text-base md:text-lg leading-relaxed text-[#FAF8F4]/80">
                {experienceIntro.subtitle}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 2b. Three Feature Panels on Warm Ivory White */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
            {featurePanels.map((panel, idx) => (
              <Reveal key={panel.title}>
                <article className="group flex flex-col">
                  <Link
                    href={panel.href}
                    className="relative block w-full overflow-hidden border border-[#C9A96E]/30 bg-[var(--dark)] aspect-square md:aspect-[16/10] shadow-[0_14px_38px_rgba(17,17,16,0.08)]"
                  >
                    <Image
                      src={panel.image}
                      alt={panel.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="mt-5 flex items-baseline justify-between gap-3">
                    <h3 className="text-xl md:text-2xl">
                      <Link
                        href={panel.href}
                        className="hover:text-[var(--accent-dark)] transition-colors"
                      >
                        {panel.title}
                      </Link>
                    </h3>
                    <span className="text-[11px] font-semibold tracking-[0.22em] text-[#9B7C44]">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-[var(--mute)]">
                    {panel.copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. "Revolutionizing Modern Dentistry" with 3-slide background slideshow */}
      <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--dark-deep)] text-[var(--on-dark)] py-20 border-b border-[var(--line-dark)]">
        <BackgroundSlideshow slides={revolutionizing.slides} />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 z-10 h-80 w-80 rounded-full bg-[#C9A96E]/10 blur-[110px]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Reveal className="max-w-xl border-l-2 border-[#C9A96E] pl-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#DFC38C]">
              The da Vinci Standard
            </p>
            <h2 className="text-3xl md:text-4xl">{revolutionizing.heading}</h2>
            <p className="mt-4 text-base md:text-lg text-white/85">
              {revolutionizing.copy}
            </p>
            <div className="mt-6">
              <ActionLink href={revolutionizing.ctaHref} dark>
                {revolutionizing.ctaLabel}
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4. 3x3 Before & After Grid + Featured Carousel on Obsidian Black */}
      <Section id="before-after" dark className="border-b border-[var(--line-dark)]">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#DFC38C]">
              Clinical Transformations
            </p>
            <h2 className="text-2xl md:text-3xl">{beforeAfter.heading}</h2>
            <p className="mt-4 text-white/75">{beforeAfter.subtitle}</p>
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-4xl">
            <LuxuryCarousel
              aspectClass="aspect-[16/9]"
              items={beforeAfter.cases.slice(0, 4).map((c) => ({
                id: c.id,
                src: c.image,
                alt: c.alt,
                title: c.label,
                subtitle: c.note,
              }))}
            />
          </Reveal>

          <div className="mt-10">
            <BeforeAfterGrid />
          </div>

          <div className="mt-10 flex justify-center">
            <ActionLink href={beforeAfter.ctaHref} dark>
              {beforeAfter.ctaLabel}
            </ActionLink>
          </div>
        </Container>
      </Section>

      {/* 5. 3-Step "Dentistry Reimagined" Journey with full-height columns */}
      <section className="bg-[var(--dark-deep)] text-[var(--on-dark)]">
        <Container className="py-16 md:py-20 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#DFC38C]">
              The Patient Journey
            </p>
            <h2 className="text-2xl md:text-4xl">{journey.heading}</h2>
            <p className="mt-4 text-white/80">{journey.subtitle}</p>
            <div className="mt-6 flex justify-center">
              <ActionLink href={journey.ctaHref} dark>
                {journey.ctaLabel}
              </ActionLink>
            </div>
          </Reveal>
        </Container>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[var(--line-dark)]">
          {journey.steps.map((step, idx) => (
            <div
              key={step.title}
              className="group relative flex min-h-[75svh] md:min-h-[85svh] items-end overflow-hidden border-t md:border-t-0 md:border-r last:md:border-r-0 border-[var(--line-dark)]"
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"
                aria-hidden="true"
              />
              <div className="relative z-10 w-full p-7 md:p-9">
                <span className="mb-2 block text-xs font-bold tracking-[0.26em] text-[#DFC38C]">
                  0{idx + 1}
                </span>
                <h3 className="text-xl md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-base text-white/85">{step.copy}</p>
                <div className="mt-5 h-[2px] w-0 bg-[#C9A96E] transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Founder Quote Block ("Meet the Man Behind the Brand") */}
      <Section id="founder">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#C9A96E]/40 bg-[var(--dark)] shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
                <Image
                  src={founderQuote.image}
                  alt={founderQuote.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover grayscale contrast-105"
                />
              </div>
            </Reveal>

            <Reveal>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9B7C44]">
                Founder &amp; Lead Surgeon
              </p>
              <h2 className="text-2xl md:text-3xl">{founderQuote.heading}</h2>
              <div className="mt-5 font-[family-name:var(--font-heading)] text-5xl leading-none text-[#C9A96E]">
                “
              </div>
              <blockquote className="mt-1 border-l-2 border-[#C9A96E] pl-5 text-lg md:text-xl leading-relaxed text-[var(--ink)]">
                {founderQuote.quote}”
              </blockquote>
              <p className="mt-4 text-sm font-bold uppercase tracking-[2px] text-[#9B7C44]">
                — {founderQuote.attribution}
              </p>
              <div className="mt-8">
                <ActionLink href={founderQuote.ctaHref}>
                  {founderQuote.ctaLabel}
                </ActionLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 7. Dark Video / Social Band */}
      <Section
        dark
        className="relative overflow-hidden text-center border-y border-[var(--line-dark)]"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A96E]/10 blur-[100px]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Reveal className="mx-auto max-w-2xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#DFC38C]">
              Behind The Atelier
            </p>
            <h3 className="text-2xl md:text-3xl">{videoSocialBand.heading}</h3>
            <div className="mt-7 flex justify-center">
              <Link
                href={videoSocialBand.ctaHref}
                className="inline-flex min-h-[48px] items-center justify-center border border-[#C9A96E] bg-[#C9A96E] px-8 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#090908] shadow-[0_8px_28px_rgba(201,169,110,0.25)] transition-all duration-300 hover:bg-[#DFC38C] hover:border-[#DFC38C]"
              >
                {videoSocialBand.ctaLabel}
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 8. Media Buzz Section (real clinical & symposium imagery) */}
      <Section id="media-buzz">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9B7C44]">
              Symposiums &amp; Press
            </p>
            <h2 className="text-2xl md:text-3xl">{mediaBuzz.heading}</h2>
            <p className="mt-4 text-[var(--mute)]">{mediaBuzz.subtitle}</p>
            <div className="mt-6 flex justify-center">
              <ActionLink href={mediaBuzz.ctaHref}>
                {mediaBuzz.ctaLabel}
              </ActionLink>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {mediaBuzz.tiles.map((tile) => (
              <Reveal key={tile.id}>
                <article className="group relative aspect-[4/3] overflow-hidden border border-[#C9A96E]/30 bg-[var(--dark)] shadow-[0_14px_38px_rgba(17,17,16,0.1)]">
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--on-dark)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DFC38C]">
                      {tile.note}
                    </p>
                    <span className="mt-1 block font-[family-name:var(--font-heading)] text-base font-bold uppercase tracking-[2px]">
                      {tile.label}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-[#C9A96E] transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Schedule a Consultation CTA Band (replaces inline homepage form) */}
      <Section dark className="text-center border-b border-[var(--line-dark)]">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-3xl">{preFooterConsult.heading}</h2>
            <p className="mt-4 text-white/80">{preFooterConsult.subtitle}</p>
            <div className="mt-6 flex justify-center">
              <ActionLink href={preFooterConsult.ctaHref} dark>
                {preFooterConsult.ctaLabel}
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
