import SignatureApp from "@/components/SignatureApp";
import { getDictionary } from "@/lib/get-dictionary";
import { I18nProvider } from "@/components/I18nProvider";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <I18nProvider dict={dict} locale={locale}>
      <SignatureApp />
    </I18nProvider>
  );
}

