import { PageHero, PreFooterBanner, SplitBand } from "@/components/layout/PageTemplate";
import { ActionLink } from "@/components/ui/Primitives";

export default function BeforeAfterPhilosophyPage() {
  return (
    <>
      <PageHero
        title="A Minimally Invasive Approach"
        subtitle="Thoughtful, conservative smile design engineered to preserve healthy tooth structure while elevating facial balance."
        image="/images/lab-model-sculpting.webp"
        alt="3D dental arch model sculpting"
        ctaLabel="View Transformations Gallery"
        ctaHref="/our-work/gallery"
      />

      <SplitBand
        heading="Intentional Treatment Planning"
        paragraphs={[
          "Every restoration is planned around long-term biology, bite stability, and natural light refraction—never aggressive over-preparation.",
          "Explore our clinical methodology or browse the transformations gallery.",
        ]}
        image="/images/digital-planning-display.webp"
        alt="Digital surgical and dental planning display"
      >
      </SplitBand>

      <div className="bg-[var(--bg)] pb-14 text-center">
        <div className="flex flex-wrap justify-center gap-8">
          <ActionLink href="/what-we-do">Read About The Experience</ActionLink>
          <ActionLink href="/our-work/gallery">
            Open Filterable Gallery
          </ActionLink>
        </div>
      </div>

      <PreFooterBanner
        heading="Smile Makeover"
        subtitle="Ready to explore what intentional restorative and surgical care can achieve?"
      />
    </>
  );
}
