import Image from "next/image";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/home/BackgroundSlideshow";
import { HeroMedia } from "@/components/home/HeroMedia";
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
      {/* 1. Hero (100svh, separate desktop landscape & mobile vertical sources + poster fallback) */}
      <section className="relative flex min-h-svh items-end bg-[var(--dark-deep)] text-[var(--on-dark)]">
        <HeroMedia
          desktopPoster={hero.desktopPoster}
          mobilePoster={hero.mobilePoster}
          desktopVideo={hero.desktopVideo}
          mobileVideo={hero.mobileVideo}
        />
        <Container className="relative z-10 pt-[calc(var(--header-h)+24px)] pb-14 md:pb-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl">{hero.heading}</h1>
            <p className="mt-4 max-w-xl text-base md:text-lg text-white/85">
              {hero.subtitle}
            </p>
            <div className="mt-6">
              <ActionLink href={hero.ctaHref} dark>
                {hero.ctaLabel}
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Experience Intro + Three Feature Panels (wide on desktop, 1:1 square on mobile) */}
      <Section id="experience">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl">{experienceIntro.heading}</h2>
            <p className="mt-4 text-[var(--mute)]">{experienceIntro.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
            {featurePanels.map((panel) => (
              <Reveal key={panel.title}>
                <article className="group flex flex-col">
                  <Link
                    href={panel.href}
                    className="relative block w-full overflow-hidden bg-[var(--dark)] aspect-square md:aspect-[16/10]"
                  >
                    <Image
                      src={panel.image}
                      alt={panel.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </Link>
                  <h3 className="mt-5 text-xl">
                    <Link
                      href={panel.href}
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {panel.title}
                    </Link>
                  </h3>
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
      <section className="relative flex min-h-[75svh] items-center bg-[var(--dark-deep)] text-[var(--on-dark)] py-20">
        <BackgroundSlideshow slides={revolutionizing.slides} />
        <Container className="relative z-10">
          <Reveal className="max-w-xl">
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

      {/* 4. 3x3 Before & After Grid (9 cards, labeled placeholders until real patient photos are supplied) */}
      <Section id="before-after">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl">{beforeAfter.heading}</h2>
            <p className="mt-4 text-[var(--mute)]">{beforeAfter.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {beforeAfter.cases.map((item) => (
              <Reveal key={item.id}>
                <div className="flex aspect-[4/3] flex-col items-center justify-center border border-[var(--line)] bg-white/60 p-6 text-center">
                  <span className="font-[family-name:var(--font-heading)] text-lg font-bold uppercase tracking-[2px] text-[var(--ink)]">
                    {item.label}
                  </span>
                  <span className="mt-2 text-xs uppercase tracking-[1.5px] text-[var(--mute)]">
                    {item.note}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <ActionLink href={beforeAfter.ctaHref}>
              {beforeAfter.ctaLabel}
            </ActionLink>
          </div>
        </Container>
      </Section>

      {/* 5. 3-Step "Dentistry Reimagined" Journey with full-height columns */}
      <section className="bg-[var(--dark-deep)] text-[var(--on-dark)]">
        <Container className="py-16 md:py-20 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-4xl">{journey.heading}</h2>
            <p className="mt-4 text-white/80">{journey.subtitle}</p>
            <div className="mt-6 flex justify-center">
              <ActionLink href={journey.ctaHref} dark>
                {journey.ctaLabel}
              </ActionLink>
            </div>
          </Reveal>
        </Container>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {journey.steps.map((step) => (
            <div
              key={step.title}
              className="relative flex min-h-[75svh] md:min-h-[85svh] items-end overflow-hidden border-t md:border-t-0 md:border-r last:md:border-r-0 border-[var(--line-dark)]"
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15"
                aria-hidden="true"
              />
              <div className="relative z-10 p-7 md:p-9">
                <h3 className="text-xl md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-base text-white/85">{step.copy}</p>
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
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--dark)]">
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
              <h2 className="text-2xl md:text-3xl">{founderQuote.heading}</h2>
              <blockquote className="mt-6 border-l-2 border-[var(--accent)] pl-5 text-lg md:text-xl leading-relaxed text-[var(--ink)]">
                “{founderQuote.quote}”
              </blockquote>
              <p className="mt-4 text-sm font-bold uppercase tracking-[2px] text-[var(--mute)]">
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
      <Section dark className="text-center border-y border-[var(--line-dark)]">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <h3 className="text-2xl md:text-3xl">{videoSocialBand.heading}</h3>
            <div className="mt-6 flex justify-center">
              <ActionLink href={videoSocialBand.ctaHref} dark>
                {videoSocialBand.ctaLabel}
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 8. Media Buzz Section (placeholder press tiles — no invented outlets) */}
      <Section id="media-buzz">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
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
                <div className="flex min-h-[160px] flex-col items-center justify-center border border-[var(--line)] bg-white/60 p-6 text-center">
                  <span className="font-[family-name:var(--font-heading)] text-base font-bold uppercase tracking-[2px] text-[var(--ink)]">
                    {tile.label}
                  </span>
                  <span className="mt-2 text-xs uppercase tracking-[1.5px] text-[var(--mute)]">
                    {tile.note}
                  </span>
                </div>
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
