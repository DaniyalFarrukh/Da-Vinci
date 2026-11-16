import Image from "next/image";
import { PreFooterBanner } from "@/components/layout/PageTemplate";
import { ActionLink, Container, Reveal, Section } from "@/components/ui/Primitives";
import { siteConfig } from "@/config/site";

export default function LocationsPage() {
  return (
    <>
      <section className="bg-[var(--dark-deep)] pt-[calc(var(--header-h)+64px)] pb-16 text-center text-[var(--on-dark)]">
        <Container>
          <h1 className="text-4xl md:text-6xl">Our Locations</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Visit da Vinci Dental Works for in-person surgical and aesthetic
            consultations. (TODO: Confirm verified studio addresses and phone
            numbers.)
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {siteConfig.locations.map((loc) => (
              <Reveal key={loc.id}>
                <article className="flex flex-col border border-[var(--line)] bg-white/60">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--dark)]">
                    <Image
                      src={loc.image}
                      alt={`${loc.city} studio`}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <h2 className="text-2xl">{loc.city}</h2>
                    <p className="mt-3 text-[var(--mute)]">{loc.addressLine1}</p>
                    <p className="text-[var(--mute)]">{loc.addressLine2}</p>
                    <p className="mt-3">
                      <a
                        href={loc.phoneHref}
                        className="inline-flex min-h-[44px] items-center font-bold tracking-[1px] hover:text-[var(--accent)]"
                      >
                        {loc.phone}
                      </a>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <ActionLink href={loc.consultHref}>
                        Book Consultation
                      </ActionLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <PreFooterBanner
        heading="Virtual Smile Consultations"
        subtitle="Traveling for care? Begin with a virtual diagnostic consultation from anywhere."
      />
    </>
  );
}
