// Carte SVG stylisée de Séoul — quartiers, fleuve Han, métro simplifié.
// Statique et décorative : la légende interactive vit dans la page /carte.

const ink = '#3D2D14';
const soft = '#8B7355';
const terracotta = '#C86E46';
const line2 = '#5C9E4F'; // ligne 2 (verte)
const line4 = '#4A90B8'; // ligne 4 (bleue)
const arex = '#D6A23D';  // AREX aéroport

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={terracotta} />
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

export function SeoulMap() {
  return (
    <svg viewBox="0 0 800 620" role="img" aria-label="Carte simplifiée de Séoul avec ses quartiers, le fleuve Han et le métro" className="w-full h-auto">
      {/* Fond */}
      <rect width="800" height="620" fill="#F5EDE3" rx="16" />

      {/* Montagnes au nord (Bukhansan) */}
      <path d="M40 90 L90 40 L140 90 Z" fill="#E8DDD0" stroke={soft} strokeWidth="1.5" />
      <path d="M110 95 L150 55 L190 95 Z" fill="#E8DDD0" stroke={soft} strokeWidth="1.5" />
      <text x="115" y="118" fontSize="12" fill={soft} textAnchor="middle">Bukhansan</text>

      {/* Fleuve Han */}
      <path
        d="M-10 420 C 150 400, 260 460, 400 450 C 540 440, 620 380, 810 400 L 810 460 C 620 440, 540 500, 400 510 C 260 520, 150 460, -10 480 Z"
        fill="#D8E4E8"
        stroke="#B8CDD4"
        strokeWidth="1.5"
      />
      <text x="395" y="487" fontSize="13" fontStyle="italic" fill="#7A98A3" textAnchor="middle">
        Fleuve Han (한강)
      </text>

      {/* Yeouido (île) */}
      <ellipse cx="185" cy="447" rx="48" ry="16" fill="#EDE4D6" stroke="#B8CDD4" strokeWidth="1" />
      <text x="185" y="451" fontSize="10" fill={soft} textAnchor="middle">Yeouido</text>

      {/* AREX vers Incheon */}
      <path d="M30 320 C 120 330, 190 300, 280 255" stroke={arex} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
      <text x="42" y="305" fontSize="11" fill={arex} fontWeight="700">✈ AREX → Incheon</text>

      {/* Ligne 2 (boucle verte simplifiée) */}
      <path
        d="M210 240 C 300 200, 500 200, 590 250 C 640 290, 640 350, 580 385 C 470 420, 330 420, 240 380 C 190 350, 175 285, 210 240 Z"
        stroke={line2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ligne 4 (diagonale bleue) */}
      <path d="M300 80 C 340 160, 380 240, 420 300 C 455 350, 500 420, 540 560" stroke={line4} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Stations clés */}
      {[
        [210, 240], [420, 205], [590, 250], [580, 385], [240, 380], [420, 300],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={6} fill="#FAF6F0" stroke={ink} strokeWidth="2" />
        </g>
      ))}

      {/* Quartiers + escales */}
      <Spot x={385} y={155} label="Gyeongbokgung · Bukchon" />
      <Badge x={465} y={148} n={8} />

      <Spot x={420} y={205} label="Insadong" dy={22} />
      <Badge x={472} y={210} n={2} />

      <Spot x={430} y={265} label="Myeongdong" dy={-12} />
      <Badge x={492} y={262} n={6} />

      <Spot x={520} y={230} label="Gwangjang" dy={-12} />
      <Badge x={575} y={227} n={7} />

      <Spot x={210} y={240} label="Hongdae" dy={-12} />
      <Badge x={258} y={237} n={11} />

      <Spot x={480} y={330} label="Namsan 🗼" dy={22} />
      <Badge x={540} y={335} n={10} />

      <Spot x={590} y={250} label="Dongdaemun" dy={-12} />

      <Spot x={560} y={545} label="Gangnam" dy={22} />
      <Badge x={615} y={550} n={4} />

      <Spot x={330} y={355} label="Itaewon" dy={22} />
      <Badge x={382} y={360} n={9} />

      {/* Légende lignes */}
      <g transform="translate(590, 60)">
        <rect x="-14" y="-20" width="200" height="92" rx="10" fill="#FAF6F0" stroke="rgba(61,45,20,0.12)" />
        <line x1="0" y1="0" x2="30" y2="0" stroke={line2} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="4" fontSize="12" fill={ink}>Ligne 2 · circulaire</text>
        <line x1="0" y1="24" x2="30" y2="24" stroke={line4} strokeWidth="4" strokeLinecap="round" />
        <text x="40" y="28" fontSize="12" fill={ink}>Ligne 4</text>
        <line x1="0" y1="48" x2="30" y2="48" stroke={arex} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
        <text x="40" y="52" fontSize="12" fill={ink}>AREX · aéroport</text>
      </g>

      {/* Boussole */}
      <g transform="translate(50, 560)">
        <circle r="18" fill="#FAF6F0" stroke={soft} strokeWidth="1.5" />
        <path d="M0 -12 L5 4 L0 0 L-5 4 Z" fill={terracotta} />
        <text y="-24" fontSize="11" fill={soft} textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
