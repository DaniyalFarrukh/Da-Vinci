import { PreFooterBanner } from "@/components/layout/PageTemplate";
import { BeforeAfterGrid } from "@/components/sections/BeforeAfterGrid";
import { BeforeAfterSliderHero } from "@/components/sections/BeforeAfterSliderHero";
import { GalleryFilterGrid } from "@/components/sections/GalleryFilterGrid";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

export default function TransformationsGalleryPage() {
  return (
    <>
      <BeforeAfterSliderHero />

      <Section>
        <Container>
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl">Before and After Photos</h2>
            <p className="mt-4 text-[var(--mute)]">
              Hover over any frame to reveal full natural color.
            </p>
          </Reveal>

          <BeforeAfterGrid />
        </Container>
      </Section>

      <Section dark className="border-b border-[var(--line-dark)]">
        <Container>
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl">Filter by Procedure</h2>
          </Reveal>
          <GalleryFilterGrid />
        </Container>
      </Section>

      <PreFooterBanner heading="Begin Your Transformation" />
    </>
  );
}
