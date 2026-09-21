import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.title}`, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "RamsesCode.dev",
    title: `${site.name} — ${site.title}`,
    description: site.description,
    ...(site.openGraphImage
      ? { images: [{ url: site.openGraphImage, alt: `${site.name} — ${site.title}` }] }
      : {}),
  },
  twitter: {
    card: site.openGraphImage ? "summary_large_image" : "summary",
    title: `${site.name} — ${site.title}`,
    description: site.description,
    ...(site.openGraphImage ? { images: [site.openGraphImage] } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#101113", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
