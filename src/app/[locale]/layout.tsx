import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    metadataBase: new URL("https://email-signature.online"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        de: "/de",
        es: "/es",
        pt: "/pt",
        ja: "/ja",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `https://email-signature.online/${locale}`,
      siteName: "email-signature.online",
      type: "website",
      locale: locale,
      images: [
        {
          url: "/avatar.png", // We should ideally have an OG image, but using avatar as placeholder
          width: 800,
          height: 600,
          alt: "Email Signature Preview",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    icons: {
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iMjQiIGZpbGw9IiMwMDAwMDAiIC8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsIDE2KSBzY2FsZSgwLjc1KSIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0ibTgzLjYgMTA4Yy0uNyAwLTEuNC0uMi0xLjktLjctMS4zLTEuMS0xLjQtMy0uMy00LjJsMi45LTMuNGMxLjMtMiAzLjUtMy4yIDUuOC0zLjFzNC4zIDEuNCA1LjQgMy41bC45IDEuN2MwIC4xLjEuMi4zLjJzLjMtLjEuMy0uMmwyLjEtNi43Yy45LTIuOCAzLjMtNC44IDYuMi01IDIuOS0uMyA1LjcgMS4yIDcgMy44bDMgNS43Yy42IDEuMSAxLjYgMS44IDIuOCAyczIuNC0uMiAzLjMtMS4xYzEuMi0xLjIgMy4xLTEuMiA0LjIgMCAxLjIgMS4yIDEuMiAzLjEgMCA0LjItMi4yIDIuMi01LjMgMy4yLTguNCAyLjgtMy4xLS41LTUuNy0yLjMtNy4yLTUuMWwtMy01LjdjLS4zLS42LS45LS43LTEuMi0uNi0uMyAwLS44LjItMSAuOGwtMi4xIDYuN2MtLjggMi41LTIuOSA0LjItNS41IDQuNHMtNS0xLjItNi4yLTMuNWwuOS0xLjdjLS4xLS4yLS4yLS4yLS4yLS4yLS4xIDAtLjQuMS0uNi40LS4xLjEtLjIuMy0uMy40bC0zIDMuNWMtLjcuNy0xLjUgMS4xLTIuNCAxLjF6IiAvPjxwYXRoIGQ9Im0xMDQgMjBoLTgwYy03LjIgMC0xMyA1LjgtMTMgMTN2NjJjMCA3LjIgNS44IDEzIDEzIDEzaDI1YzEuNyAwIDMtMS4zIDMtM3MtMS4zLTMtMy0zaC0yNWMtMy45IDAtNy0zLjEtNy03di02MmMwLTMuOSAzLjEtNyA3LTdoODBjMy45IDAgNyAzLjEgNyA3djQ0YzAgMS43IDEuMyAzIDMgM3MzLTEuMyAzLTN2LTQ0YzAtNy4yLTUuOC0xMy0xMy0xM3oiIC8+PHBhdGggZD0ibTY1IDEwMmMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgM2g0YzEuNyAwIDMtMS4zIDMtM3MtMS4zLTMtMy0zeiIgLz48cGF0aCBkPSJtMTAwLjYgNDcuOHMtMjAuNCAyNC4yLTM2LjYgMjQuMi0zNi42LTI0LjItMzYuNi0yNC4yIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIC8+PC9nPjwvc3ZnPg==",
      shortcut: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iMjQiIGZpbGw9IiMwMDAwMDAiIC8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsIDE2KSBzY2FsZSgwLjc1KSIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0ibTgzLjYgMTA4Yy0uNyAwLTEuNC0uMi0xLjktLjctMS4zLTEuMS0xLjQtMy0uMy00LjJsMi45LTMuNGMxLjMtMiAzLjUtMy4yIDUuOC0zLjFzNC4zIDEuNCA1LjQgMy41bC45IDEuN2MwIC4xLjEuMi4zLjJzLjMtLjEuMy0uMmwyLjEtNi43Yy45LTIuOCAzLjMtNC44IDYuMi01IDIuOS0uMyA1LjcgMS4yIDcgMy44bDMgNS43Yy42IDEuMSAxLjYgMS44IDIuOCAyczIuNC0uMiAzLjMtMS4xYzEuMi0xLjIgMy4xLTEuMiA0LjIgMCAxLjIgMS4yIDEuMiAzLjEgMCA0LjItMi4yIDIuMi01LjMgMy4yLTguNCAyLjgtMy4xLS41LTUuNy0yLjMtNy4yLTUuMWwtMy01LjdjLS4zLS42LS45LS43LTEuMi0uNi0uMyAwLS44LjItMSAuOGwtMi4xIDYuN2MtLjggMi41LTIuOSA0LjItNS41IDQuNHMtNS0xLjItNi4yLTMuNWwuOS0xLjdjLS4xLS4yLS4yLS4yLS4yLS4yLS4xIDAtLjQuMS0uNi40LS4xLjEtLjIuMy0uMy40bC0zIDMuNWMtLjcuNy0xLjUgMS4xLTIuNCAxLjF6IiAvPjxwYXRoIGQ9Im0xMDQgMjBoLTgwYy03LjIgMC0xMyA1LjgtMTMgMTN2NjJjMCA3LjIgNS44IDEzIDEzIDEzaDI1YzEuNyAwIDMtMS4zIDMtM3MtMS4zLTMtMy0zaC0yNWMtMy45IDAtNy0zLjEtNy03di02MmMwLTMuOSAzLjEtNyA3LTdoODBjMy45IDAgNyAzLjEgNyA3djQ0YzAgMS43IDEuMyAzIDMgM3MzLTEuMyAzLTN2LTQ0YzAtNy4yLTUuOC0xMy0xMy0xM3oiIC8+PHBhdGggZD0ibTY1IDEwMmMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgM2g0YzEuNyAwIDMtMS4zIDMtM3MtMS4zLTMtMy0zeiIgLz48cGF0aCBkPSJtMTAwLjYgNDcuOHMtMjAuNCAyNC4yLTM2LjYgMjQuMi0zNi42LTI0LjItMzYuNi0yNC4yIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIC8+PC9nPjwvc3ZnPg==",
      apple: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iMjQiIGZpbGw9IiMwMDAwMDAiIC8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsIDE2KSBzY2FsZSgwLjc1KSIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0ibTgzLjYgMTA4Yy0uNyAwLTEuNC0uMi0xLjktLjctMS4zLTEuMS0xLjQtMy0uMy00LjJsMi45LTMuNGMxLjMtMiAzLjUtMy4yIDUuOC0zLjFzNC4zIDEuNCA1LjQgMy41bC45IDEuN2MwIC4xLjEuMi4zLjJzLjMtLjEuMy0uMmwyLjEtNi43Yy45LTIuOCAzLjMtNC44IDYuMi01IDIuOS0uMyA1LjcgMS4yIDcgMy44bDMgNS43Yy42IDEuMSAxLjYgMS44IDIuOCAyczIuNC0uMiAzLjMtMS4xYzEuMi0xLjIgMy4xLTEuMiA0LjIgMCAxLjIgMS4yIDEuMiAzLjEgMCA0LjItMi4yIDIuMi01LjMgMy4yLTguNCAyLjgtMy4xLS41LTUuNy0yLjMtNy4yLTUuMWwtMy01LjdjLS4zLS42LS45LS43LTEuMi0uNi0uMyAwLS44LjItMSAuOGwtMi4xIDYuN2MtLjggMi41LTIuOSA0LjItNS41IDQuNHMtNS0xLjItNi4yLTMuNWwuOS0xLjdjLS4xLS4yLS4yLS4yLS4yLS4yLS4xIDAtLjQuMS0uNi40LS4xLjEtLjIuMy0uMy40bC0zIDMuNWMtLjcuNy0xLjUgMS4xLTIuNCAxLjF6IiAvPjxwYXRoIGQ9Im0xMDQgMjBoLTgwYy03LjIgMC0xMyA1LjgtMTMgMTN2NjJjMCA3LjIgNS44IDEzIDEzIDEzaDI1YzEuNyAwIDMtMS4zIDMtM3MtMS4zLTMtMy0zaC0yNWMtMy45IDAtNy0zLjEtNy03di02MmMwLTMuOSAzLjEtNyA3LTdoODBjMy45IDAgNyAzLjEgNyA3djQ0YzAgMS43IDEuMyAzIDMgM3MzLTEuMyAzLTN2LTQ0YzAtNy4yLTUuOC0xMy0xMy0xM3oiIC8+PHBhdGggZD0ibTY1IDEwMmMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgM2g0YzEuNyAwIDMtMS4zIDMtM3MtMS4zLTMtMy0zeiIgLz48cGF0aCBkPSJtMTAwLjYgNDcuOHMtMjAuNCAyNC4yLTM2LjYgMjQuMi0zNi42LTI0LjItMzYuNi0yNC4yIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIC8+PC9nPjwvc3ZnPg==",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Email Signature Online",
    "operatingSystem": "Windows, macOS, Linux, Android, iOS",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1240"
    }
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preload the LCP image */}
        <link rel="preload" as="image" href="/avatar.png" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Space+Grotesk:wght@300..700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Lora:ital,wght@0,400..700;1,400..700&family=Outfit:wght@300..700&family=Plus+Jakarta+Sans:wght@300..700&family=Roboto+Mono:wght@300..700&display=swap" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background font-sans">
        {children}
      </body>
    </html>
  );
}
