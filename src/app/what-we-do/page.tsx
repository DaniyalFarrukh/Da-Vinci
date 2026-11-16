import {
  EditorialBand,
  PageHero,
  PreFooterBanner,
  SplitBand,
  TransformationShowcase,
} from "@/components/layout/PageTemplate";
import { ActionLink } from "@/components/ui/Primitives";

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        title="Redefining Excellence"
        subtitle="Surgical precision and bespoke aesthetic artistry under one roof."
        image="/images/surgical-team-hands-on.webp"
        alt="da Vinci Dental Works surgical team collaborating"
      />

      <EditorialBand
        heading="The da Vinci Experience"
        paragraphs={[
          "Every case begins with diagnostic clarity—evaluating facial proportions, airway, bite mechanics, and tooth structure before a single restoration is designed.",
          "Our clinicians and master ceramists work side by side so surgical foundation and aesthetic finish operate as one unified discipline.",
        ]}
      >
        <ActionLink href="/what-we-do/smile-makeover-process">
          Explore the 7-Step Process
        </ActionLink>
      </EditorialBand>

      <SplitBand
        heading="What to Expect"
        paragraphs={[
          "From your initial consultation through final polish, our studios are designed for unhurried, private care.",
          "Digital 3D smile previews and provisional trials let you experience your restoration before permanent placement.",
        ]}
        image="/images/hallway-consultation.webp"
        alt="Dr. Shuaib Malik in clinical consultation"
      />

      <TransformationShowcase />

      <PreFooterBanner />
    </>
  );
}
