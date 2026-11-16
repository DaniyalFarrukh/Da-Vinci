export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
  children?: NavChild[];
}

export interface LocationItem {
  id: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  phoneHref: string;
  whatsapp?: string;
  consultHref: string;
  image: string;
}

export const siteConfig = {
  brand: {
    name: "da Vinci Dental Works",
    shortName: "da Vinci",
    subName: "Dental Works",
    tagline: "A new standard in surgical & aesthetic dentistry.",
    emblem: "/images/da-vinci-emblem.webp",
    /** TODO: Confirm official press contact email */
    pressEmail: "TODO: press@davincidentalworks.com",
    copyrightYear: 2026,
  },
  nav: [
    {
      label: "What We Do",
      href: "/what-we-do",
      children: [
        { label: "The da Vinci Experience", href: "/what-we-do" },
        { label: "Cosmetic Dentistry", href: "/what-we-do/cosmetic-dentistry" },
        { label: "Porcelain Veneers", href: "/what-we-do/porcelain-veneers" },
        { label: "Smile Makeover Process", href: "/what-we-do/smile-makeover-process" },
      ],
    },
    {
      label: "Who We Are",
      href: "/who-we-are",
      children: [
        { label: "About Us", href: "/who-we-are" },
        { label: "Dr. Shuaib Malik", href: "/who-we-are/founder" },
        { label: "Our Team", href: "/who-we-are/team" },
        { label: "Our Locations", href: "/locations" },
      ],
    },
    {
      label: "Our Work",
      href: "/our-work",
      children: [
        { label: "Before & After", href: "/our-work" },
        { label: "Transformations Gallery", href: "/our-work/gallery" },
        { label: "Patient Testimonials", href: "/testimonials" },
        { label: "In The Media", href: "/media" },
        { label: "Journal", href: "/blog" },
      ],
    },
    {
      label: "Schedule a Consultation",
      href: "/schedule-a-consult",
      isCta: true,
    },
  ] satisfies NavItem[],
  /** TODO: Supply verified studio addresses, phone numbers, and city photography */
  locations: [
    {
      id: "chicago",
      city: "Chicago",
      addressLine1: "TODO: Street Address & Suite",
      addressLine2: "Chicago, IL TODO ZIP",
      phone: "TODO: (312) 000-0000",
      phoneHref: "tel:+13120000000",
      consultHref: "/schedule-a-consult/chicago",
      image: "/images/harvard-mgh-team.webp",
    },
    {
      id: "location-2",
      city: "TODO: City 2",
      addressLine1: "TODO: Street Address & Suite",
      addressLine2: "TODO: City, State ZIP",
      phone: "TODO: (000) 000-0000",
      phoneHref: "tel:+10000000000",
      consultHref: "/schedule-a-consult/location-2",
      image: "/images/mayo-clinic-fellowship.webp",
    },
    {
      id: "location-3",
      city: "TODO: City 3",
      addressLine1: "TODO: Street Address & Suite",
      addressLine2: "TODO: City, State ZIP",
      phone: "TODO: (000) 000-0000",
      phoneHref: "tel:+10000000000",
      consultHref: "/schedule-a-consult/location-3",
      image: "/images/hallway-consultation.webp",
    },
    {
      id: "location-4",
      city: "TODO: City 4",
      addressLine1: "TODO: Street Address & Suite",
      addressLine2: "TODO: City, Country",
      phone: "TODO: +00 00 000 0000",
      phoneHref: "tel:+00000000000",
      consultHref: "/schedule-a-consult/location-4",
      image: "/images/digital-planning-display.webp",
    },
  ] satisfies LocationItem[],
  /** TODO: Confirm official social media URLs */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/shuaib_malik_27/" },
    { label: "Facebook", href: "#TODO-facebook" },
    { label: "YouTube", href: "#TODO-youtube" },
  ],
} as const;
