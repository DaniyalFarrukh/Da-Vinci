import {
  EditorialBand,
  PageHero,
  PreFooterBanner,
  SplitBand,
  TransformationShowcase,
} from "@/components/layout/PageTemplate";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

const OFFERINGS = [
  {
    title: "Porcelain Veneers",
    copy: "Hand-layered ceramic restorations calibrated for natural translucency, surface texture, and minimal tooth preparation.",
  },
  {
    title: "Full-Mouth Reconstruction",
    copy: "Comprehensive surgical and prosthetic rehabilitation restoring vertical dimension, comfort, and facial support.",
  },
  {
    title: "Implant & Zygomatic Surgery",
    copy: "Advanced surgical protocols for single-tooth replacement through complex full-arch reconstruction.",
  },
] as const;

export default function CosmeticDentistryPage() {
  return (
    <>
      <PageHero
        title="Cosmetic Dentistry"
        subtitle="Where surgical medicine meets architectural smile design."
        image="/images/digital-planning-display.webp"
        alt="Dr. Shuaib Malik presenting digital dental planning"
      />

      <EditorialBand
        heading="The da Vinci Standard"
        paragraphs={[
          "Natural teeth are never uniform white blocks. We study lip dynamics, incisal edge position, and light reflection so each restoration belongs naturally to your face.",
        ]}
      />

      <SplitBand
        dark
        heading="The Smile Makeover"
        paragraphs={[
          "A transformative smile makeover is both functional and deeply personal. Whether addressing wear, asymmetry, or missing dentition, we design outcomes built to endure.",
        ]}
        image="/images/surgical-loupes-closeup.webp"
        alt="Precision dental work under surgical loupes"
      />

      <Section>
        <Container>
          <Reveal>
            <h2 className="text-center text-2xl md:text-3xl">
              Clinical Offerings
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {OFFERINGS.map((item) => (
              <Reveal key={item.title}>
                <div className="border-t border-[var(--ink)] pt-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-[var(--mute)]">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <TransformationShowcase />

      <PreFooterBanner />
    </>
  );
}
