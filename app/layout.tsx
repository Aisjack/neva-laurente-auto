import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Adrian Cruz | Automotive Sales Consultant",
    description: "Personal assistance for new and certified pre-owned vehicles—from selection and financing to delivery and after-sales support.",
    openGraph: {
      title: "Adrian Cruz | Your Next Drive, Made Simple.",
      description: "Personal automotive sales support in Metro Manila.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Adrian Cruz automotive sales consultant" }],
    },
    twitter: { card: "summary_large_image", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
