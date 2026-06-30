export default function MethodePage() {
  return (
    <div className="page-enter pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-coral text-xs font-bold tracking-[0.1em] uppercase mb-3">
          Notre philosophie
        </p>
        <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-8">
          Pourquoi LeProfNomade existe
        </h1>

        <div className="space-y-6 text-gray-600 text-base leading-relaxed">
          <p>
            J&apos;ai commencé à apprendre des langues avec les mêmes apps que tout le monde.
            Au bout de 200 jours de série, je me suis rendu compte que je ne savais toujours
            pas commander un café correctement ni comprendre pourquoi une phrase était
            construite de telle manière.
          </p>

          <p>
            Le problème n&apos;est pas le manque de ressources — c&apos;est le manque de sens.
            Traduire « le chat est sur la table » ne te prépare pas à survivre dans un pays.
            Et mémoriser une règle de grammaire sans comprendre sa logique, c&apos;est l&apos;oublier
            en deux semaines.
          </p>

          <h2 className="font-display text-2xl text-ink pt-4">
            L&apos;approche en 3 temps
          </h2>

          <p>
            Chaque leçon sur LeProfNomade suit le même schéma, inspiré de la vraie vie.
          </p>

          <div className="bg-white rounded-2xl p-8 border border-black/5">
            <div className="space-y-8">
              {[
                {
                  emoji: '🎙️',
                  title: 'Le Prof raconte',
                  desc: 'On pose le contexte avec une anecdote — un échange avec un natif, une situation culturelle, un moment de la vie quotidienne. Tu comprends le « pourquoi » avant le « comment ».',
                  color: 'text-coral',
                },
                {
                  emoji: '🗺️',
                  title: 'Tu es sur le terrain',
                  desc: 'Un dialogue réaliste, comme si tu y étais. Avec la prononciation, les expressions qu\'un natif utiliserait vraiment, et les notes culturelles qui font la différence.',
                  color: 'text-teal',
                },
                {
                  emoji: '🔍',
                  title: 'On décortique ensemble',
                  desc: "La grammaire n'est pas une corvée quand on comprend la logique. On t'explique le « pourquoi » derrière chaque règle, avec des exemples tirés du dialogue que tu viens de lire.",
                  color: 'text-korean',
                },
              ].map((step) => (
                <div key={step.title} className="flex gap-5">
                  <span className="text-2xl flex-shrink-0 mt-1">{step.emoji}</span>
                  <div>
                    <h3 className={`font-display text-lg mb-1 ${step.color}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-display text-2xl text-ink pt-4">
            Pourquoi c&apos;est gratuit
          </h2>

          <p>
            Parce que l&apos;accès aux langues ne devrait pas dépendre de ton portefeuille.
            LeProfNomade est un projet passion, construit avec du temps, de la conviction,
            et l&apos;aide de natifs généreux qui croient au projet. Les partenariats avec
            des agences de voyages et des écoles de langues nous permettent de maintenir
            cette promesse sans jamais demander un centime aux apprenants.
          </p>
        </div>
      </div>
    </div>
  );
}
