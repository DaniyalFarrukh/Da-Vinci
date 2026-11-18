import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Primitives";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--dark-deep)] text-[var(--on-dark)] border-t border-[var(--line-dark)] pt-16 pb-10">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.26em] text-[#DFC38C]">
            There’s only one {siteConfig.brand.name}
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex min-h-[44px] flex-col items-center justify-center gap-3 text-[var(--on-dark)] no-underline"
          >
            <span className="relative h-24 w-20 overflow-hidden rounded-[12%] border border-[#C9A96E]/45 shadow-[0_0_24px_rgba(201,169,110,0.16)]">
              <Image
                src="/images/da-vinci-crest.webp"
                alt="da Vinci Dental Works crest"
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <span className="font-[family-name:var(--font-heading)] text-3xl font-medium uppercase tracking-[0.2em]">
              {siteConfig.brand.shortName}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#DFC38C]">
              {siteConfig.brand.subName}
            </span>
          </Link>

          <p className="mt-5 text-sm text-white/75">
            For press inquiries, please contact{" "}
            <span className="text-[var(--accent)]">
              {siteConfig.brand.pressEmail}
            </span>
          </p>
        </div>

        {/* Gradient gold hairline divider */}
        <div
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#C9A96E]/45 to-transparent"
          aria-hidden="true"
        />

        {/* 4-column location grid on desktop, 1-column stacked on mobile */}
        <div className="grid grid-cols-1 gap-8 pt-10 text-center md:grid-cols-4 md:text-left">
          {siteConfig.locations.map((loc) => (
            <div key={loc.id} className="space-y-1.5">
              <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold uppercase tracking-[2px] text-[#DFC38C]">
                {loc.city}
              </h4>
              <p className="text-sm text-white/75">{loc.addressLine1}</p>
              <p className="text-sm text-white/75">{loc.addressLine2}</p>
              <p className="pt-1">
                <a
                  href={loc.phoneHref}
                  className="inline-flex min-h-[44px] items-center text-sm font-bold tracking-[1px] text-[var(--on-dark)] hover:text-[var(--accent)]"
                >
                  {loc.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Socials & Legal Bar */}
        <div
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <div className="flex items-center gap-6">
            {siteConfig.socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-xs font-bold uppercase tracking-[2px] text-white/80 hover:text-[var(--accent)]"
              >
                {soc.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/65">
            <span>
              © {siteConfig.brand.copyrightYear} {siteConfig.brand.name}. All
              Rights Reserved.
            </span>
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-[44px] items-center hover:text-[var(--accent)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/accessibility"
              className="inline-flex min-h-[44px] items-center hover:text-[var(--accent)]"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
