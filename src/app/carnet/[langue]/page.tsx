import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CarnetClient from '@/components/CarnetClient';
import { getTheme } from '@/lib/travel-theme';

import lexiqueCoreen from '@/data/lexique-coreen.json';
import lexiqueItalien from '@/data/lexique-italien.json';
import lexiqueAnglais from '@/data/lexique-anglais.json';

const LEXIQUES: Record<string, typeof lexiqueCoreen> = {
  coreen: lexiqueCoreen,
  italien: lexiqueItalien,
  anglais: lexiqueAnglais,
};

const LANGUE_LABEL: Record<string, string> = {
  coreen: 'coréen',
  italien: 'italien',
  anglais: 'anglais',
};

export function generateStaticParams() {
  return Object.keys(LEXIQUES).map((langue) => ({ langue }));
}

export function generateMetadata({ params }: { params: { langue: string } }): Metadata {
  const label = LANGUE_LABEL[params.langue];
  if (!label) return {};
  return {
    title: `Vocabulaire ${label} — Le Passeport lexical | LeProfNomade`,
    description: `Tout le vocabulaire ${label} essentiel pour voyager, classé par thème et par escale. Cherche un mot, retrouve la leçon. Gratuit.`,
  };
}

export default function CarnetPage({ params }: { params: { langue: string } }) {
  const entries = LEXIQUES[params.langue];
  const theme = getTheme(params.langue);
  if (!entries || !theme) notFound();

  return (
    <>
      <CarnetClient langue={params.langue} entries={entries} />
      <div style={{ background: '#EFE7D9', textAlign: 'center', paddingBottom: 32 }}>
        <Link
          href={`/${params.langue}`}
          style={{ fontSize: 14, color: theme.primary, textDecoration: 'none' }}
        >
          ← Retour au tableau de bord {theme.country}
        </Link>
      </div>
    </>
  );
}
