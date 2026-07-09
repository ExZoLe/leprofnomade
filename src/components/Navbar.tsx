'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solidBg = scrolled || menuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo : icône + texte */}
        <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={() => setMenuOpen(false)}>
          <Image
            src="/brand/logo-icone.png"
            alt="LeProfNomade"
            width={34}
            height={34}
            className="rounded-lg"
            priority
          />
          <span className="font-display text-xl tracking-tight">
            Le<span className="text-coral">Prof</span>Nomade
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/methode" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors no-underline">
            La méthode
          </Link>
          <Link href="/#langues" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors no-underline">
            Les langues
          </Link>

          {!loading && (
            user ? (
              <Link href="/profil" className="flex items-center gap-2 bg-ink text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity no-underline">
                <span className="text-base">👤</span>
                Mon profil
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors no-underline">
                  Connexion
                </Link>
                <Link href="/signup" className="bg-coral text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-coral-dark transition-colors no-underline">
                  Commencer
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-none text-2xl cursor-pointer text-ink"
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-black/5 shadow-lg">
          <div className="px-6 py-5 flex flex-col gap-4">
            <Link href="/methode" className="text-base font-medium text-ink no-underline" onClick={() => setMenuOpen(false)}>
              La méthode
            </Link>
            <Link href="/#langues" className="text-base font-medium text-ink no-underline" onClick={() => setMenuOpen(false)}>
              Les langues
            </Link>
            {!loading && (
              user ? (
                <Link href="/profil" className="text-base font-medium text-ink no-underline" onClick={() => setMenuOpen(false)}>
                  👤 Mon profil
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-base font-medium text-ink no-underline" onClick={() => setMenuOpen(false)}>
                    Connexion
                  </Link>
                  <Link href="/signup" className="bg-coral text-white text-base font-semibold px-5 py-3 rounded-lg text-center no-underline" onClick={() => setMenuOpen(false)}>
                    Commencer
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
