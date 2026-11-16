import {
  PageHero,
  PreFooterBanner,
  SplitBand,
} from "@/components/layout/PageTemplate";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Container, Section } from "@/components/ui/Primitives";

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Meet Our Team"
        subtitle="Surgeons, restorative clinicians, and master ceramists united by one standard."
        image="/images/harvard-mgh-team.webp"
        alt="da Vinci Dental Works clinical team"
      />

      <Section>
        <Container>
          <TeamGrid />
        </Container>
      </Section>

      <SplitBand
        dark
        heading="Master Ceramists &amp; Laboratory Craft"
        paragraphs={[
          "Every restoration is shaped in close collaboration with dedicated laboratory artisans—combining digital CAD/CAM precision with hand-layered porcelain artistry.",
          "TODO: Supply verified laboratory team names and studio details.",
        ]}
        image="/images/lab-model-sculpting.webp"
        alt="Master ceramist sculpting a 3D dental model"
      />

      <PreFooterBanner />
    </>
  );
}
