import Image from "next/image";
import { notFound } from "next/navigation";
import { PreFooterBanner } from "@/components/layout/PageTemplate";
import { ActionLink, Container, Section } from "@/components/ui/Primitives";
import { blogPosts } from "@/config/pages";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-[var(--dark-deep)] pt-[calc(var(--header-h)+64px)] pb-16 text-[var(--on-dark)]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[var(--accent)]">
            {post.category} · {post.date}
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl">{post.title}</h1>
        </Container>
      </section>

      <Section>
        <Container className="max-w-3xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--dark)]">
            <Image
              src={post.image}
              alt={post.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="mt-8 space-y-5 text-[var(--mute)]">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <ActionLink href="/blog">Back to Journal</ActionLink>
          </div>
        </Container>
      </Section>

      <PreFooterBanner />
    </>
  );
}
