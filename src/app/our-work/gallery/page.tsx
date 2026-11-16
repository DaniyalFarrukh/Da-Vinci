import { PageHero, PreFooterBanner } from "@/components/layout/PageTemplate";
import { GalleryFilterGrid } from "@/components/sections/GalleryFilterGrid";
import { Container, Section } from "@/components/ui/Primitives";

export default function TransformationsGalleryPage() {
  return (
    <>
      <PageHero
        title="Transformations Gallery"
        subtitle="Filterable clinical case studies. (TODO: Supply verified patient before & after photography.)"
        image="/images/surgical-loupes-closeup.webp"
        alt="Precision dental craftsmanship under loupes"
      />

      <Section>
        <Container>
          <GalleryFilterGrid />
        </Container>
      </Section>

      <PreFooterBanner heading="Begin Your Transformation" />
    </>
  );
}
