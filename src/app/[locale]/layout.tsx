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
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    icons: {
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23111111'/><path d='M30 70l20-40 10 20 20-30' fill='none' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/></svg>",
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

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <head>
        {/* Preload the LCP image — browser starts fetching before JS executes */}
        <link rel="preload" as="image" href="/avatar.png" fetchPriority="high" />
        {/* Warm up DNS + TLS for Google Fonts CDN — reduces latency by ~200ms */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load Fonts directly in head to prevent CLS instead of async client injection */}
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

