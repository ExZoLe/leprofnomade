import { notFound } from 'next/navigation';
import { languages, type LangKey } from '@/lib/languages';
import { getAllLessons } from '@/lib/lessons';
import { LangDashboardClient } from '@/components/LangDashboardClient';

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export default function LanguageDashboard({
  params,
}: {
  params: { lang: string };
}) {
  const langKey = params.lang as LangKey;
  const lang = languages[langKey];
  if (!lang) notFound();

  const lessons = getAllLessons(langKey);

  return <LangDashboardClient lang={lang} langKey={langKey} lessons={lessons} />;
}
