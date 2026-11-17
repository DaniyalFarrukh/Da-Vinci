export const homeContent = {
  hero: {
    heading: "A new standard in surgical & aesthetic dentistry",
    subtitle:
      "Precision oral surgery and bespoke restorative artistry, designed around how you live.",
    ctaLabel: "Schedule a Consultation",
    ctaHref: "/schedule-a-consult",
    desktopPoster: "/images/surgical-team-hands-on.webp",
    mobilePoster: "/images/da-vinci-emblem.webp",
    mobileVideo: "/videos/hero-mobile.mp4",
    /** TODO: Add transcoded landscape hero MP4 (< 8 MB) once ffmpeg is approved */
    desktopVideo: null as string | null,
  },
  experienceIntro: {
    heading: "Experience a new kind of smile at da Vinci Dental Works",
    subtitle:
      "Traditional craftsmanship meets advanced surgical and digital planning to deliver restorative dentistry with natural harmony and lasting function.",
  },
  featurePanels: [
    {
      title: "Dentistry as Artistry",
      copy: "A bespoke approach to smile architecture that unites digital facial mapping with hand-finished ceramic craft.",
      href: "/what-we-do/cosmetic-dentistry",
      image: "/images/lab-model-sculpting.webp",
      alt: "Master technician and Dr. Shuaib Malik sculpting a 3D dental arch model",
    },
    {
      title: "Unmatched in Quality",
      copy: "Every restoration is guided by surgical precision and collaborative laboratory artistry under magnification.",
      href: "/what-we-do/porcelain-veneers",
      image: "/images/surgical-loupes-closeup.webp",
      alt: "Dr. Shuaib Malik and surgical colleague working with precision loupes",
    },
    {
      title: "Impossible to Replicate",
      copy: "From comprehensive diagnostics to final polish, each case is engineered for natural translucency and balance.",
      href: "/what-we-do",
      image: "/images/digital-planning-display.webp",
      alt: "Dr. Shuaib Malik reviewing digital dental and surgical planning scans",
    },
  ],
  revolutionizing: {
    heading: "Revolutionizing Modern Dentistry",
    copy: "There is nothing ordinary about da Vinci Dental Works. Under the leadership of Dr. Shuaib Malik, our practice elevates oral care from routine necessity to intentional, confidence-restoring design.",
    ctaLabel: "About da Vinci Dental Works",
    ctaHref: "/who-we-are",
    slides: [
      {
        src: "/images/surgical-team-hands-on.webp",
        alt: "Surgical team collaborating hands-on in clinical training",
      },
      {
        src: "/images/hallway-consultation.webp",
        alt: "Dr. Shuaib Malik consulting with a colleague in the clinic corridor",
      },
      {
        src: "/images/mayo-clinic-fellowship.webp",
        alt: "Dr. Shuaib Malik leading surgical education and hands-on workshops",
      },
    ],
  },
  beforeAfter: {
    heading: "Before and After Photos",
    subtitle:
      "Our smile transformations favor careful, nuanced improvements for natural balance and facial harmony.",
    ctaLabel: "See All Transformations",
    ctaHref: "/our-work",
    cases: [
      {
        id: "case-1",
        label: "Porcelain Veneer Architecture",
        note: "Custom Hand-Layered Ceramics",
        image: "/images/case-smile-01.webp",
        alt: "Close-up of natural porcelain veneer smile restoration",
      },
      {
        id: "case-2",
        label: "Full-Arch Harmony",
        note: "Surgical & Aesthetic Design",
        image: "/images/case-smile-02.webp",
        alt: "Confident male smile restoration with natural enamel translucency",
      },
      {
        id: "case-3",
        label: "Refined Enamel Translucency",
        note: "Balanced Incisal Contours",
        image: "/images/case-smile-03.webp",
        alt: "Refined female smile transformation",
      },
      {
        id: "case-4",
        label: "Upper & Lower Veneer Harmony",
        note: "Natural Shade Calibration",
        image: "/images/teeth-case-04.webp",
        alt: "Macro close-up of upper and lower porcelain veneers",
      },
      {
        id: "case-5",
        label: "Architectural Male Smile",
        note: "Custom Ceramic Contouring",
        image: "/images/teeth-case-05.webp",
        alt: "Macro close-up of aligned male smile restoration",
      },
      {
        id: "case-6",
        label: "Gingival & Ceramic Balance",
        note: "Bespoke Porcelain Aesthetics",
        image: "/images/teeth-case-06.webp",
        alt: "Macro dental close-up of custom ceramic restorations",
      },
    ],
  },
  journey: {
    heading: "Dentistry Reimagined",
    subtitle:
      "A practice built on surgical skill, innovation, and artistry—placing the patient experience on equal footing with the clinical result.",
    ctaLabel: "Schedule a Consultation",
    ctaHref: "/schedule-a-consult",
    steps: [
      {
        title: "1. Schedule a Consultation",
        copy: "Your journey begins with an unhurried diagnostic conversation to understand your goals, facial proportions, and clinical possibilities.",
        image: "/images/hallway-consultation.webp",
        alt: "Dr. Shuaib Malik in clinical consultation",
      },
      {
        title: "2. Transform Your Smile",
        copy: "Undetectable restorations and surgical precision engineered so your smile feels natural from day one.",
        image: "/images/surgical-precision-duo.webp",
        alt: "Dr. Shuaib Malik performing precision surgical and restorative work",
      },
      {
        title: "3. Experience the Difference",
        copy: "Completion is the start of a long-term partnership, supported by continuing hygiene and preventive care.",
        image: "/images/harvard-mgh-team.webp",
        alt: "Dr. Shuaib Malik with surgical and clinical colleagues",
      },
    ],
  },
  founderQuote: {
    heading: "Meet the Man Behind the Brand",
    /** TODO: Confirm exact founder quote from Dr. Shuaib Malik */
    quote:
      "TODO: Great surgical and aesthetic dentistry is never just about teeth—it is about restoring confidence, function, and how people see themselves.",
    attribution: "Dr. Shuaib Malik · Oral, Facial & Implant Surgeon",
    ctaLabel: "Meet Our Team",
    ctaHref: "/who-we-are/team",
    image: "/images/founder-xray-portrait.webp",
    alt: "Portrait of Dr. Shuaib Malik in front of panoramic radiograph",
  },
  videoSocialBand: {
    heading: "Content You Won’t Find Anywhere Else",
    ctaLabel: "Step Inside",
    ctaHref: "/media",
  },
  mediaBuzz: {
    heading: "The Media Is Buzzing",
    subtitle:
      "Lectures, surgical symposiums, and clinical highlights from da Vinci Dental Works.",
    ctaLabel: "See All Media Coverage",
    ctaHref: "/media",
    tiles: [
      {
        id: "press-1",
        label: "Keynote Symposium",
        note: "National Surgical Address",
        image: "/images/keynote-stage-thank-you.webp",
        alt: "Dr. Shuaib Malik on conference keynote stage",
      },
      {
        id: "press-2",
        label: "Academic Fellowship",
        note: "Hands-On Surgical Workshop",
        image: "/images/mayo-clinic-fellowship.webp",
        alt: "Mayo Clinic surgical workshop and lecture",
      },
      {
        id: "press-3",
        label: "Hospital Collaboration",
        note: "Surgical Faculty Team",
        image: "/images/harvard-mgh-team.webp",
        alt: "Dr. Shuaib Malik with surgical team",
      },
      {
        id: "press-4",
        label: "Zygomatic Protocols",
        note: "Clinical Lecture Series",
        image: "/images/lecture-zygomatic-wide.webp",
        alt: "Dr. Shuaib Malik lecturing on zygomatic surgical protocol",
      },
      {
        id: "press-5",
        label: "Complex Reconstruction",
        note: "Live Case Presentation",
        image: "/images/conference-stage-case.webp",
        alt: "Clinical case presentation on stage",
      },
      {
        id: "press-6",
        label: "Digital Architecture",
        note: "3D Guided Planning",
        image: "/images/digital-planning-display.webp",
        alt: "Digital surgical planning display",
      },
    ],
  },
  preFooterConsult: {
    heading: "Ready to Begin Your Transformation?",
    subtitle:
      "Connect with our team to schedule an in-person or virtual consultation.",
    ctaLabel: "Schedule a Consultation",
    ctaHref: "/schedule-a-consult",
  },
} as const;
