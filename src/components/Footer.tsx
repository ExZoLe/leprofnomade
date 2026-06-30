import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-ink text-white/70 pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌍</span>
              <span className="font-display text-lg text-white">
                Le<span className="text-coral">Prof</span>Nomade
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              Apprendre une langue, c&apos;est apprendre à voir le monde autrement.
              On apprend ensemble, on partira prêts.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-bold tracking-wider text-white/40 mb-3">
                APPRENDRE
              </p>
              {['Anglais', 'Coréen', 'Italien'].map(l => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  className="block text-sm text-white/60 hover:text-white transition-colors no-underline mb-2"
                >
                  {l}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-white/40 mb-3">
                PROJET
              </p>
              {[
                { label: 'La méthode', href: '/methode' },
                { label: 'Contact', href: '#' },
                { label: 'Mentions légales', href: '#' },
              ].map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block text-sm text-white/60 hover:text-white transition-colors no-underline mb-2"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} LeProfNomade — 100% gratuit, fait avec ❤️ et du café.
          </p>
        </div>
      </div>
    </footer>
  );
}
