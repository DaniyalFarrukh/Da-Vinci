import { PreFooterBanner } from "@/components/layout/PageTemplate";
import { BlogList } from "@/components/sections/BlogList";
import { Container, Section } from "@/components/ui/Primitives";

export default function BlogPage() {
  return (
    <>
      <section className="bg-[var(--dark-deep)] pt-[calc(var(--header-h)+64px)] pb-16 text-center text-[var(--on-dark)]">
        <Container>
          <h1 className="text-4xl md:text-6xl">Journal</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Clinical perspectives, surgical education, and smile design notes
            from da Vinci Dental Works.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <BlogList />
        </Container>
      </Section>

      <PreFooterBanner />
    </>
  );
}
