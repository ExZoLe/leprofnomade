// Carte SVG stylisée de Rome — quartiers, Tibre, métro A et B.

const ink = '#3D2D14';
const soft = '#8B7355';
const olive = '#6B7B3E';
const lineA = '#D9822B'; // ligne A (orange)
const lineB = '#3D6A9E'; // ligne B (bleue)

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={olive} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FAF6F0">
        {n}
      </text>
    </g>
  );
}

function Spot({ x, y, label, dy = -10 }: { x: number; y: number; label: string; dy?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill={ink} />
      <circle cx={x} cy={y} r={2} fill="#FAF6F0" />
      <text x={x} y={y + dy} textAnchor="middle" fontSize="14" fontWeight="600" fill={ink}>
        {label}
      </text>
    </g>
  );
}

export function RomeMap() {
  return (
    <svg viewBox="0 0 800 620" role="img" aria-label="Carte simplifiée de Rome avec ses quartiers, le Tibre et le métro" className="w-full h-auto">
      <rect width="800" height="620" fill="#F5EDE3" rx="16" />

      {/* Tibre — serpente nord-sud avec la boucle du centre */}
      <path
        d="M290 -10 C 300 80, 260 140, 250 200 C 240 260, 280 300, 310 340 C 340 380, 330 440, 290 500 C 260 545, 250 580, 255 630 L 305 630 C 300 580, 310 545, 340 505 C 380 450, 390 385, 355 340 C 325 300, 290 265, 300 210 C 310 150, 350 85, 340 -10 Z"
        fill="#D8E4E8"
        stroke="#B8CDD4"
        strokeWidth="1.5"
      />
      <text x="255" y="90" fontSize="13" fontStyle="italic" fill="#7A98A3" transform="rotate(-75 255 90)">
        Le Tibre
      </text>

      {/* Île Tibérine */}
      <ellipse cx="322" cy="345" rx="20" ry="9" fill="#EDE4D6" stroke="#B8CDD4" strokeWidth="1" transform="rotate(35 322 345)" />

      {/* Vers Fiumicino */}
      <path d="M60 560 C 130 540, 190 525, 255 515" stroke={lineB} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
      <text x="55" y="585" fontSize="11" fill={lineB} fontWeight="700">✈ → Fiumicino</text>

      {/* Ligne A (orange) : nord-ouest → sud-est via Termini */}
      <path d="M150 120 C 240 170, 330 210, 430 240 C 520 265, 590 300, 660 370" stroke={lineA} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Ligne B (bleue) : nord-est → sud-ouest via Termini et Colisée */}
      <path d="M640 100 C 580 160, 530 200, 480 250 C 430 300, 400 360, 380 420 C 365 465, 330 500, 280 520" stroke={lineB} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Termini : croisement A/B */}
      <circle cx="483" cy="252" r={8} fill="#FAF6F0" stroke={ink} strokeWidth="2.5" />
      <text x="502" y="242" fontSize="14" fontWeight="700" fill={ink}>Termini 🚆</text>
      <Badge x={575} y={238} n={4} />

      {/* Stations */}
      {[
        [430, 240], [400, 390], [150, 120], [640, 100],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill="#FAF6F0" stroke={ink} strokeWidth="2" />
      ))}

      {/* Quartiers + escales */}
      <Spot x={185} y={185} label="Vatican" dy={-12} />
      <Badge x={235} y={182} n={2} />

      <Spot x={370} y={280} label="Pantheon · Centro" dy={-12} />
      <Badge x={465} y={277} n={6} />

      <Spot x={430} y={165} label="Villa Borghese" dy={-12} />

      <Spot x={415} y={330} label="Piazza Venezia" dy={-12} />

      <Spot x={455} y={390} label="Forum · Colisée 🏛" dy={24} />
      <Badge x={555} y={395} n={10} />

      <Spot x={280} y={430} label="Trastevere" dy={24} />
      <Badge x={352} y={435} n={8} />

      <Spot x={365} y={480} label="Testaccio" dy={24} />
      <Badge x={430} y={485} n={7} />

      <Spot x={620} y={470} label="San Giovanni" dy={22} />

      <Spot x={545} y={150} label="Quartier Coppedè" dy={-12} />

      {/* Légende lignes */}
      <g transform="translate(600, 545)">
        <rect x="-14" y="-20" width="190" height="68" rx="10" fill="#FAF6F0" stroke="rgba(61,45,20,0.12)" />
        <line x1="0" y1="0" x2="30" y2="0" stroke={lineA} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="4" fontSize="12" fill={ink}>Metro A</text>
        <line x1="0" y1="24" x2="30" y2="24" stroke={lineB} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="28" fontSize="12" fill={ink}>Metro B · aéroport</text>
      </g>

      {/* Boussole */}
      <g transform="translate(60, 60)">
        <circle r="18" fill="#FAF6F0" stroke={soft} strokeWidth="1.5" />
        <path d="M0 -12 L5 4 L0 0 L-5 4 Z" fill={olive} />
        <text y="-24" fontSize="11" fill={soft} textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
