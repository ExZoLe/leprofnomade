import type { Metadata } from 'next';
import { DM_Serif_Display, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const display = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LeProfNomade — Apprends les langues comme si tu y étais',
  description:
    'Site 100% gratuit pour apprendre l\'anglais, le coréen et l\'italien. Des vraies situations, des vraies explications, et la culture qu\'aucune app ne t\'enseigne.',
  openGraph: {
    title: 'LeProfNomade',
    description: 'Apprends les langues autrement. 100% gratuit.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
