import {
  PageHero,
  PreFooterBanner,
  SplitBand,
} from "@/components/layout/PageTemplate";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

const PILLARS = [
  {
    title: "Artistry",
    copy: "Bespoke smile architecture tailored to facial proportions, lip dynamics, and natural tooth anatomy.",
  },
  {
    title: "Precision",
    copy: "3D surgical diagnostics, guided implantology, and magnification-driven restorative margins.",
  },
  {
    title: "Experience",
    copy: "Unhurried, private appointments designed to make complex dental care calm and transparent.",
  },
] as const;

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        title="Experience Intentional Dentistry"
        subtitle="A practice founded on surgical precision, restorative artistry, and personal care."
        image="/images/harvard-mgh-team.webp"
        alt="Dr. Shuaib Malik and clinical colleagues"
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">
                We don’t just treat teeth. We design lasting confidence.
              </h2>
            </Reveal>
            <Reveal className="space-y-4 text-[var(--mute)]">
              <p>
                da Vinci Dental Works brings oral and maxillofacial surgery
                together with high-craft aesthetic dentistry. Rather than
                treating function and appearance separately, we plan every case
                as one cohesive structure.
              </p>
              <p>
                From single-tooth porcelain restorations to full-arch surgical
                reconstruction, our goal is simple: undetectable work that feels
                effortless in daily life.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <SplitBand
        imageFirst
        heading="Dr. Shuaib Malik"
        paragraphs={[
          "Oral, Facial & Implant Surgeon and founder of da Vinci Dental Works.",
          "TODO: Supply full verified biography, training credentials, and clinical leadership highlights.",
        ]}
        image="/images/founder-xray-portrait.webp"
        alt="Dr. Shuaib Malik portrait"
        ctaLabel="Learn More About Dr. Malik"
        ctaHref="/who-we-are/founder"
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <Reveal key={pillar.title}>
                <div className="border-t border-[var(--ink)] pt-5">
                  <h3 className="text-xl">{pillar.title}</h3>
                  <p className="mt-3 text-[var(--mute)]">{pillar.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <PreFooterBanner heading="Transform Your Smile" />
    </>
  );
}
