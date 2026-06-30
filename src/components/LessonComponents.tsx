'use client';

import { useState } from 'react';

/* ============================================
   PROF SAYS — Anecdote block
   ============================================ */
export function ProfSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-coral/5 border-l-4 border-coral rounded-r-xl p-6 my-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎙️</span>
        <span className="text-xs font-bold tracking-wider text-coral uppercase">
          Le Prof raconte
        </span>
      </div>
      <div className="font-display text-base italic leading-relaxed text-ink/80">
        {children}
      </div>
    </div>
  );
}

/* ============================================
   CULTURAL NOTE — Expandable tip
   ============================================ */
export function CulturalNote({
  children,
  title = 'Note culturelle',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-gold/10 border border-gold/30 rounded-lg p-3 my-2 cursor-pointer transition-colors hover:bg-gold/15"
    >
      <p className="text-sm font-semibold text-ink flex items-center gap-2">
        💡 {title} <span className="text-gray-400">{open ? '▾' : '▸'}</span>
      </p>
      {open && (
        <div className="text-sm text-ink/75 mt-2 leading-relaxed animate-reveal">
          {children}
        </div>
      )}
    </button>
  );
}

/* ============================================
   DIALOGUE — Interactive conversation
   ============================================ */
interface DialogueLine {
  speaker: string;
  text: string;
  phonetic?: string;
  translation: string;
  note?: string;
}

export function Dialogue({ lines }: { lines: DialogueLine[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [notesOpen, setNotesOpen] = useState<Set<number>>(new Set());

  const toggleReveal = (i: number) => {
    const next = new Set(revealed);
    next.has(i) ? next.delete(i) : next.add(i);
    setRevealed(next);
  };

  const toggleNote = (i: number) => {
    const next = new Set(notesOpen);
    next.has(i) ? next.delete(i) : next.add(i);
    setNotesOpen(next);
  };

  return (
    <div className="my-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🗺️</span>
        <span className="text-xs font-bold tracking-wider text-teal uppercase">
          Sur le terrain
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Clique sur chaque réplique pour révéler la traduction.
      </p>

      <div className="flex flex-col gap-4">
        {lines.map((line, i) => {
          const isUser = line.speaker.toLowerCase() === 'tu';
          return (
            <div key={i}>
              <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    isUser ? 'bg-teal/10' : 'bg-italian/10'
                  }`}
                >
                  {isUser ? '🙋' : '🗣️'}
                </div>
                <div className="max-w-[75%]">
                  <p
                    className={`text-xs font-semibold text-gray-400 mb-1 ${
                      isUser ? 'text-right' : ''
                    }`}
                  >
                    {line.speaker}
                  </p>
                  <div
                    onClick={() => toggleReveal(i)}
                    className={`p-4 cursor-pointer transition-shadow hover:shadow-sm border ${
                      isUser
                        ? 'bg-teal/5 border-teal/15 rounded-2xl rounded-br-sm'
                        : 'bg-white border-black/5 rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    <p className="text-base font-semibold text-ink">{line.text}</p>
                    {line.phonetic && (
                      <p className="text-xs text-gray-400 italic mt-1">
                        {line.phonetic}
                      </p>
                    )}
                    {revealed.has(i) && (
                      <p className="text-sm text-teal mt-2 pt-2 border-t border-black/5 animate-reveal">
                        🇫🇷 {line.translation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {line.note && (
                <div
                  className={`mt-2 ${isUser ? 'mr-12' : 'ml-12'}`}
                >
                  <CulturalNote>{line.note}</CulturalNote>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================
   GRAMMAR — Accordion-style explanations
   ============================================ */
interface GrammarPoint {
  title: string;
  explanation: string;
  examples: { target: string; french: string }[];
}

export function Grammar({ points }: { points: GrammarPoint[] }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="my-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🔍</span>
        <span className="text-xs font-bold tracking-wider text-korean uppercase">
          On décortique ensemble
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {points.map((point, i) => (
          <div
            key={i}
            className={`bg-white rounded-xl border transition-colors ${
              openIdx === i ? 'border-korean/30' : 'border-black/5'
            }`}
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              className="w-full text-left p-5 bg-transparent border-none cursor-pointer flex justify-between items-center"
            >
              <span className="font-display text-base text-ink">
                {point.title}
              </span>
              <span
                className={`text-gray-400 transition-transform ${
                  openIdx === i ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-5 animate-reveal">
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {point.explanation}
                </p>
                <div className="bg-cream rounded-lg p-4">
                  {point.examples.map((ex, j) => (
                    <div
                      key={j}
                      className={`grid grid-cols-[1fr_auto_1fr] gap-3 items-center py-2 ${
                        j < point.examples.length - 1
                          ? 'border-b border-black/5'
                          : ''
                      }`}
                    >
                      <span className="text-base font-semibold text-italian">
                        {ex.target}
                      </span>
                      <span className="text-xs text-gray-400">→</span>
                      <span className="text-sm text-ink">{ex.french}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   QUIZ — Interactive multiple choice
   ============================================ */
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExpl, setShowExpl] = useState<Record<number, boolean>>({});

  const handleAnswer = (qi: number, ai: number) => {
    if (answers[qi] !== undefined) return;
    setAnswers({ ...answers, [qi]: ai });
    setTimeout(() => setShowExpl({ ...showExpl, [qi]: true }), 400);
  };

  const allDone = Object.keys(answers).length === questions.length;
  const score = Object.entries(answers).filter(
    ([q, a]) => a === questions[Number(q)].correct
  ).length;

  return (
    <div className="my-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🎯</span>
        <span className="text-xs font-bold tracking-wider text-italian uppercase">
          À toi de jouer
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {questions.map((q, qi) => {
          const answered = answers[qi] !== undefined;
          const isCorrect = answers[qi] === q.correct;

          return (
            <div
              key={qi}
              className="bg-white rounded-xl p-6 border border-black/5"
            >
              <p className="text-sm font-semibold mb-4 leading-relaxed">
                <span className="text-italian mr-2">Q{qi + 1}.</span>
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  let classes =
                    'w-full text-left p-3 rounded-lg text-sm border-2 transition-all cursor-pointer ';
                  if (!answered) {
                    classes +=
                      'bg-cream border-black/5 hover:border-italian/40 hover:bg-italian/5';
                  } else if (oi === q.correct) {
                    classes += 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold';
                  } else if (oi === answers[qi] && !isCorrect) {
                    classes += 'bg-red-50 border-coral text-coral';
                  } else {
                    classes += 'bg-cream border-black/5 text-gray-400';
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleAnswer(qi, oi)}
                      className={classes}
                      disabled={answered}
                    >
                      {answered && oi === q.correct && '✓ '}
                      {answered && oi === answers[qi] && !isCorrect && '✕ '}
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showExpl[qi] && (
                <div
                  className={`mt-3 p-3 rounded-lg text-sm animate-reveal ${
                    isCorrect
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'bg-orange-50 border border-orange-200'
                  }`}
                >
                  <p
                    className={`font-semibold mb-1 ${
                      isCorrect ? 'text-emerald-600' : 'text-coral'
                    }`}
                  >
                    {isCorrect ? 'Bravo ! 🎉' : "Pas tout à fait — mais c'est comme ça qu'on apprend !"}
                  </p>
                  <p className="text-ink/70 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="mt-4 p-5 rounded-xl text-center bg-gold/10 border border-gold/30">
          <p className="text-xl font-bold">
            {score}/{questions.length}{' '}
            {score === questions.length ? '🏆 Parfait !' : '— Bien joué !'}
          </p>
        </div>
      )}
    </div>
  );
}
