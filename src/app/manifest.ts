import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "da Vinci Dental Works",
    short_name: "da Vinci",
    description: "A new standard in surgical & aesthetic dentistry.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf4",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
