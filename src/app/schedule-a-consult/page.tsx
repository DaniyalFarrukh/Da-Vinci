import Image from "next/image";
import { ActionLink, Container, Reveal, Section } from "@/components/ui/Primitives";
import { siteConfig } from "@/config/site";

export default function ScheduleAConsultHubPage() {
  return (
    <>
      <section className="bg-[var(--dark-deep)] pt-[calc(var(--header-h)+64px)] pb-16 text-center text-[var(--on-dark)]">
        <Container>
          <h1 className="text-4xl md:text-6xl">Schedule a Consult</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Schedule an in-person or virtual consultation at the studio
            location of your choice.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {siteConfig.locations.map((loc) => (
              <Reveal key={loc.id}>
                <article className="flex flex-col border border-[#C9A96E]/30 bg-white shadow-[0_14px_38px_rgba(17,17,16,0.06)]">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--dark)]">
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
                    <p className="mt-2 text-sm text-[var(--mute)]">
                      {loc.addressLine1} · {loc.addressLine2}
                    </p>
                    <p className="mt-2">
                      <a
                        href={loc.phoneHref}
                        className="inline-flex min-h-[44px] items-center text-sm font-bold tracking-[1px] hover:text-[var(--accent)]"
                      >
                        {loc.phone}
                      </a>
                    </p>
                    <div className="mt-4">
                      <ActionLink href={`/schedule-a-consult/${loc.id}`}>
                        Schedule a Consultation
                      </ActionLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
