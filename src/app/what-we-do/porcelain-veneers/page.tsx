import {
  PageHero,
  PreFooterBanner,
  SplitBand,
  TransformationShowcase,
} from "@/components/layout/PageTemplate";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

const PILLARS = [
  {
    title: "Natural Micro-Texture",
    copy: "Hand-finished enamel characterization avoids flat, artificial opacity and reflects light like natural dentition.",
  },
  {
    title: "Conservative Preparation",
    copy: "Guided by diagnostic wax-ups and 3D scans to preserve healthy tooth structure whenever clinically possible.",
  },
  {
    title: "Enduring Craft",
    copy: "Precision adhesive bonding protocols under magnification for clean margins and long-term gingival health.",
  },
] as const;

export default function PorcelainVeneersPage() {
  return (
    <>
      <PageHero
        title="Porcelain Veneers"
        subtitle="Individually sculpted ceramic artistry, calibrated to your facial proportions."
        image="/images/lab-model-sculpting.webp"
        alt="Master technician sculpting a 3D dental arch model"
      />

      <SplitBand
        imageFirst
        heading="In-House Laboratory Collaboration"
        paragraphs={[
          "Great porcelain cannot be rushed or outsourced to an assembly line. Our clinicians collaborate directly with master ceramists from diagnostic mock-up through final glaze.",
          "Every shade, incisal halo, and contour is refined in person to complement your skin tone and smile line.",
        ]}
        image="/images/surgical-precision-duo.webp"
        alt="Clinicians collaborating over precision instruments"
      />

      <Section dark>
        <Container>
          <Reveal>
            <h2 className="text-center text-2xl md:text-3xl">
              The Porcelain Advantage
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {PILLARS.map((p) => (
              <Reveal key={p.title}>
                <div className="border-t border-[var(--line-dark)] pt-5">
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="mt-3 text-white/80">{p.copy}</p>
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
