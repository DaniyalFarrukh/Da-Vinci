import {
  EditorialBand,
  PageHero,
  PreFooterBanner,
  TransformationShowcase,
} from "@/components/layout/PageTemplate";
import { ProcessAccordion } from "@/components/sections/ProcessAccordion";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

export default function SmileMakeoverProcessPage() {
  return (
    <>
      <PageHero
        grayscale
        title="Designing the Smile for You"
        subtitle="A structured, transparent clinical journey from first conversation to lasting aftercare."
        image="/images/surgical-loupes-closeup.webp"
        alt="Dr. Shuaib Malik performing precision treatment"
      />

      <EditorialBand
        heading="Our Structured Approach"
        paragraphs={[
          "Every smile transformation follows a clear sequence of diagnostic, provisional, and definitive milestones—so you know what to expect at every appointment.",
        ]}
      />

      <Section dark>
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/images/digital-planning-display.webp"
              >
                <source src="/videos/clip-05.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl md:text-3xl">
              The 7-Step Smile Makeover Process
            </h2>
            <ProcessAccordion />
          </Reveal>
        </Container>
      </Section>

      <TransformationShowcase />

      <PreFooterBanner
        heading="Experience a Smile Makeover for Yourself"
        subtitle="Schedule an in-person or virtual consultation to review your goals and timeline."
      />
    </>
  );
}
