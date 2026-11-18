import Image from "next/image";
import {
  EditorialBand,
  PageHero,
  PreFooterBanner,
  SplitBand,
} from "@/components/layout/PageTemplate";
import { buzzItems } from "@/config/pages";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

export default function FounderPage() {
  return (
    <>
      <PageHero
        grayscale
        layout="split"
        imageAspect="portrait"
        title="Dr. Shuaib Malik"
        subtitle="Founder · Oral, Facial & Implant Surgeon"
        image="/images/founder-xray-portrait.webp"
        alt="Black and white portrait of Dr. Shuaib Malik"
      />

      <EditorialBand
        centered={false}
        heading="Background & Training"
        paragraphs={[
          "TODO: Supply verified education, residency, and academic appointments for Dr. Shuaib Malik.",
          "Dr. Malik lectures nationally and internationally on zygomatic implant protocols, full-arch reconstruction, and interdisciplinary aesthetic planning.",
        ]}
      />

      <SplitBand
        imageFirst
        heading="Surgical Philosophy & Craft"
        paragraphs={[
          "Combining hospital-grade surgical discipline with bespoke restorative design, Dr. Malik approaches every case from facial structure outward.",
          "TODO: Supply verified clinical milestones and philosophy statement.",
        ]}
        image="/images/lecture-zygomatic-portrait.webp"
        alt="Dr. Shuaib Malik lecturing on zygomatic surgical protocols"
      />

      {/* Awards vs. Media 2-column split */}
      <Section dark>
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl md:text-3xl">Awards &amp; Recognition</h2>
              <ul className="mt-6 space-y-3 border-t border-[var(--line-dark)] pt-5 text-white/80">
                <li>TODO: Supply verified clinical awards &amp; fellowships</li>
                <li>TODO: Supply verified academic honors</li>
                <li>TODO: Supply verified society memberships</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl md:text-3xl">Speaking &amp; Media</h2>
              <ul className="mt-6 space-y-3 border-t border-[var(--line-dark)] pt-5 text-white/80">
                <li>Surgical Symposium Keynote Presentations</li>
                <li>Hands-On Zygomatic &amp; Full-Arch Workshops</li>
                <li>TODO: Supply verified press &amp; publication features</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 2-column Latest Buzz grid */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="text-2xl md:text-3xl">The Latest Buzz</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {buzzItems.slice(0, 4).map((item) => (
              <article
                key={item.id}
                className="flex flex-col border border-[#C9A96E]/30 bg-white shadow-[0_14px_38px_rgba(17,17,16,0.06)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--dark)]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    quality={100}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--mute)]">
                    {item.outlet}
                  </span>
                  <h3 className="mt-2 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--mute)]">
                    {item.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <PreFooterBanner heading="Consult With Dr. Malik" />
    </>
  );
}
