import SignatureApp from "@/components/SignatureApp";
import { getDictionary } from "@/lib/get-dictionary";
import { I18nProvider } from "@/components/I18nProvider";
import { Metadata } from "next";

export async function generateMetadata({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ name?: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const { name } = await searchParams;
  const dict = await getDictionary(locale);

  const ogUrl = new URL("https://email-signature.online/api/og");
  if (name) ogUrl.searchParams.set("name", name);

  return {
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: "Email Signature Preview",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <I18nProvider dict={dict} locale={locale}>
      <SignatureApp />
    </I18nProvider>
  );
}

