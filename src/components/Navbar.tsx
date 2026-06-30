'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-2xl">🌍</span>
          <span className="font-display text-xl tracking-tight">
            Le<span className="text-coral">Prof</span>Nomade
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/methode"
            className="text-sm font-medium text-ink/70 hover:text-ink transition-colors no-underline"
          >
            La méthode
          </Link>
          <Link
            href="/#langues"
            className="text-sm font-medium text-ink/70 hover:text-ink transition-colors no-underline"
          >
            Les langues
          </Link>
          <Link
            href="/#langues"
            className="bg-coral text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-coral-dark transition-colors no-underline"
          >
            Commencer
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-none text-2xl cursor-pointer"
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t border-black/5">
          <Link
            href="/methode"
            className="text-sm font-medium text-ink no-underline pt-4"
            onClick={() => setMenuOpen(false)}
          >
            La méthode
          </Link>
          <Link
            href="/#langues"
            className="text-sm font-medium text-ink no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Les langues
          </Link>
          <Link
            href="/#langues"
            className="bg-coral text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Commencer
          </Link>
        </div>
      )}
    </nav>
  );
}
