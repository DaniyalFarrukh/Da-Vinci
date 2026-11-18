import Image from "next/image";
import { PageHero, PreFooterBanner } from "@/components/layout/PageTemplate";
import { testimonialItems } from "@/config/pages";
import { Container, Reveal, Section } from "@/components/ui/Primitives";

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Hear From Our Patients"
        subtitle="Stories of surgical and aesthetic restoration. (TODO: Supply verified patient portraits and quotes.)"
        image="/images/hallway-consultation.webp"
        alt="Dr. Shuaib Malik in clinical consultation"
      />

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl">
              Patient Testimonials &amp; Reviews
            </h2>
            <p className="mt-4 text-[var(--mute)]">
              Placeholder patient cards below will be populated with verified
              patient stories.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonialItems.map((item) => (
              <Reveal key={item.id}>
                <article className="flex flex-col border border-[#C9A96E]/30 bg-white shadow-[0_14px_38px_rgba(17,17,16,0.06)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--dark)]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg">{item.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[1.5px] text-[var(--mute)]">
                      {item.location}
                    </p>
                    <p className="mt-3 text-sm text-[var(--mute)]">
                      “{item.quote}”
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <PreFooterBanner />
    </>
  );
}
