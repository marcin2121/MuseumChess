import { getDictionary, Locale } from "@/dictionaries";
import HeroClient from "@/components/HeroClient";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "pl" ? "pl" : "en") as Locale;
  const dict = await getDictionary(locale);

  return <HeroClient dict={dict} locale={locale} />;
}
