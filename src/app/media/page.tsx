import { PageHero, PreFooterBanner } from "@/components/layout/PageTemplate";
import { BuzzGrid } from "@/components/sections/BuzzGrid";
import { VideoReels } from "@/components/sections/VideoReels";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

export default function BuzzPage() {
  return (
    <>
      <PageHero
        title="What’s the Buzz?"
        subtitle="Symposiums, surgical education, and media features. (TODO: Supply verified press links.)"
        image="/images/keynote-stage-thank-you.webp"
        alt="Conference keynote presentation"
      />

      <Section>
        <Container>
          <BuzzGrid />
        </Container>
      </Section>

      <Section dark className="border-b border-[var(--line-dark)]">
        <Container>
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl">Studio &amp; Clinical Reels</h2>
            <p className="mt-3 text-white/75">
              Behind-the-scenes surgical training, laboratory craft, and
              symposium highlights.
            </p>
          </Reveal>
          <VideoReels />
        </Container>
      </Section>

      <PreFooterBanner />
    </>
  );
}
