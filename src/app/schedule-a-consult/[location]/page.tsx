import { notFound } from "next/navigation";
import { ConsultForm } from "@/components/sections/ConsultForm";
import { ActionLink, Container, Section } from "@/components/ui/Primitives";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return siteConfig.locations.map((loc) => ({ location: loc.id }));
}

export default async function LocationConsultPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const studio = siteConfig.locations.find((l) => l.id === location);
  if (!studio) notFound();

  return (
    <>
      <section className="bg-[var(--dark-deep)] pt-[calc(var(--header-h)+64px)] pb-12 text-center text-[var(--on-dark)]">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[2px] text-[var(--accent)]">
            {studio.city} Studio
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl">
            Schedule a Consultation
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            {studio.addressLine1} · {studio.addressLine2} · {studio.phone}
          </p>
          <div className="mt-5 flex justify-center">
            <ActionLink href="/schedule-a-consult" dark>
              All Locations
            </ActionLink>
          </div>
        </Container>
      </section>

      <Section dark className="border-b border-[var(--line-dark)]">
        <Container>
          <ConsultForm locationId={studio.id} locationCity={studio.city} />
        </Container>
      </Section>
    </>
  );
}
