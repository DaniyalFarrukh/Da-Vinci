import { ActionLink, Container, Section } from "@/components/ui/Primitives";

export function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Section className="pt-[calc(var(--header-h)+56px)] min-h-[70svh]">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl">{title}</h1>
          <p className="mt-4 text-[var(--mute)]">{subtitle}</p>
          <div className="mt-8">
            <ActionLink href="/">Back to Home</ActionLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
