// Carte SVG stylisée de Londres — quartiers, Tamise, Tube simplifié.

const ink = '#3D2D14';
const soft = '#8B7355';
const mustard = '#D6A23D';
const central = '#C0392B';    // Central line (rouge)
const piccadilly = '#2C4A8A'; // Piccadilly line (bleu)
const circle = '#E8B93A';     // Circle line (jaune)

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={mustard} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3D2D14">
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

export function LondonMap() {
  return (
    <svg viewBox="0 0 800 620" role="img" aria-label="Carte simplifiée de Londres avec ses quartiers, la Tamise et le Tube" className="w-full h-auto">
      <rect width="800" height="620" fill="#F5EDE3" rx="16" />

      {/* Tamise — méandre caractéristique */}
      <path
        d="M-10 340 C 120 330, 200 360, 280 400 C 340 430, 380 430, 430 395 C 480 360, 520 350, 590 370 C 660 390, 720 380, 810 350 L 810 410 C 720 440, 660 450, 590 430 C 520 410, 485 420, 440 455 C 385 495, 330 495, 265 460 C 195 425, 120 390, -10 400 Z"
        fill="#D8E4E8"
        stroke="#B8CDD4"
        strokeWidth="1.5"
      />
      <text x="150" y="378" fontSize="13" fontStyle="italic" fill="#7A98A3">La Tamise</text>

      {/* Vers Heathrow */}
      <path d="M25 250 C 90 260, 140 270, 210 280" stroke={piccadilly} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
      <text x="30" y="238" fontSize="11" fill={piccadilly} fontWeight="700">✈ → Heathrow</text>

      {/* Central line (rouge, ouest-est) */}
      <path d="M120 300 C 260 285, 420 270, 560 275 C 630 278, 690 285, 760 295" stroke={central} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Piccadilly line (bleu, diagonale) */}
      <path d="M210 280 C 300 285, 370 300, 430 330 C 480 355, 540 380, 600 430" stroke={piccadilly} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Circle line (boucle jaune) */}
      <path
        d="M280 230 C 380 205, 520 210, 590 245 C 630 270, 630 320, 580 345 C 500 380, 380 380, 310 350 C 260 325, 245 265, 280 230 Z"
        stroke={circle}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Stations */}
      {[
        [280, 230], [430, 330], [560, 275], [310, 350], [590, 245], [430, 273],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill="#FAF6F0" stroke={ink} strokeWidth="2" />
      ))}

      {/* Quartiers + escales */}
      <Spot x={300} y={180} label="Camden" dy={-12} />
      <Badge x={352} y={177} n={11} />

      <Spot x={280} y={230} label="Baker Street" dy={22} />
      <Badge x={355} y={235} n={4} />

      <Spot x={430} y={273} label="Soho · West End" dy={-14} />
      <Badge x={520} y={270} n={10} />

      <Spot x={390} y={330} label="Westminster 🕰" dy={24} />
      <Badge x={465} y={335} n={2} />

      <Spot x={560} y={275} label="La City · St Paul's" dy={-14} />
      <Badge x={655} y={272} n={6} />

      <Spot x={620} y={355} label="Tower Bridge" dy={-12} />
      <Badge x={695} y={352} n={8} />

      <Spot x={500} y={430} label="Borough Market" dy={24} />
      <Badge x={585} y={435} n={7} />

      <Spot x={150} y={300} label="Notting Hill" dy={-12} />
      <Badge x={218} y={297} n={5} />

      <Spot x={670} y={470} label="Greenwich" dy={22} />

      {/* Légende lignes */}
      <g transform="translate(580, 60)">
        <rect x="-14" y="-20" width="210" height="92" rx="10" fill="#FAF6F0" stroke="rgba(61,45,20,0.12)" />
        <line x1="0" y1="0" x2="30" y2="0" stroke={central} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="4" fontSize="12" fill={ink}>Central line</text>
        <line x1="0" y1="24" x2="30" y2="24" stroke={piccadilly} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="28" fontSize="12" fill={ink}>Piccadilly · aéroport</text>
        <line x1="0" y1="48" x2="30" y2="48" stroke={circle} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="52" fontSize="12" fill={ink}>Circle line</text>
      </g>

      {/* Boussole */}
      <g transform="translate(50, 560)">
        <circle r="18" fill="#FAF6F0" stroke={soft} strokeWidth="1.5" />
        <path d="M0 -12 L5 4 L0 0 L-5 4 Z" fill={mustard} />
        <text y="-24" fontSize="11" fill={soft} textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
