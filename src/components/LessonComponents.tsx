'use client';

import { useState } from 'react';

// ============================================
// PROF SAYS — Point culturel
// ============================================
export function ProfSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream border-l-4 border-coral rounded-r-xl p-5 my-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl">👨‍🏫</span>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
            Point culturel
          </p>
          <div className="text-ink leading-relaxed text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DIALOGUE — Avec traduction cachée / révélable
// ============================================
interface DialogueLine {
  speaker: string;
  text: string;
  phonetic?: string;
  translation: string;
  note?: string;
}

export function Dialogue({ lines }: { lines: DialogueLine[] }) {
  const [showAll, setShowAll] = useState(false);
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());

  const toggleLine = (idx: number) => {
    const next = new Set(revealedLines);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setRevealedLines(next);
  };

  const toggleAll = () => {
    if (showAll) {
      setShowAll(false);
      setRevealedLines(new Set());
    } else {
      setShowAll(true);
      setRevealedLines(new Set(lines.map((_, i) => i)));
    }
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-wider uppercase text-teal">
          💬 Dialogue
        </p>
        <button
          onClick={toggleAll}
          className="text-xs font-medium text-gray-400 hover:text-ink transition-colors bg-transparent border-none cursor-pointer"
        >
          {showAll ? '🙈 Tout cacher' : '👁 Tout révéler'}
        </button>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        {lines.map((line, idx) => {
          const revealed = revealedLines.has(idx);
          return (
            <div key={idx} className="border-b border-black/5 last:border-b-0 pb-4 last:pb-0">
              {/* Speaker */}
              <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                {line.speaker}
              </p>

              {/* Texte en langue cible */}
              <p className="text-lg font-semibold text-ink leading-snug mb-1">
                {line.text}
              </p>

              {/* Phonétique */}
              {line.phonetic && (
                <p className="text-xs text-gray-400 italic mb-2 font-mono">
                  {line.phonetic}
                </p>
              )}

              {/* Traduction — cachée par défaut */}
              {revealed ? (
                <div className="mt-2 animate-reveal">
                  <p className="text-sm text-ink/70 italic leading-relaxed">
                    → {line.translation}
                  </p>
                  {line.note && (
                    <div className="mt-3 p-3 bg-gold/10 border-l-2 border-gold rounded-r-lg">
                      <p className="text-xs font-bold tracking-wider uppercase text-gold-dark mb-1">
                        💡 Note du prof
                      </p>
                      <p className="text-xs text-ink/80 leading-relaxed">
                        {line.note}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => toggleLine(idx)}
                    className="mt-2 text-xs text-gray-400 hover:text-ink transition-colors bg-transparent border-none cursor-pointer"
                  >
                    🙈 Cacher
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleLine(idx)}
                  className="mt-2 text-xs font-medium text-teal hover:text-teal-dark transition-colors bg-transparent border-none cursor-pointer"
                >
                  👁 Voir la traduction
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 italic mt-3 text-center">
        💡 Essaie de comprendre d'abord, puis révèle la traduction
      </p>
    </div>
  );
}

// ============================================
// GRAMMAR — Avec traduction cachée / révélable
// ============================================
interface GrammarExample {
  target: string;
  french: string;
}

interface GrammarPoint {
  title: string;
  explanation: string;
  examples?: GrammarExample[];
}

export function Grammar({ points }: { points: GrammarPoint[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [revealedExamples, setRevealedExamples] = useState<Set<string>>(new Set());

  const toggleExample = (key: string) => {
    const next = new Set(revealedExamples);
    next.has(key) ? next.delete(key) : next.add(key);
    setRevealedExamples(next);
  };

  return (
    <div className="my-8">
      <p className="text-xs font-bold tracking-wider uppercase text-purple-600 mb-4">
        📚 Grammaire
      </p>

      <div className="flex flex-col gap-3">
        {points.map((point, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white border border-black/5 rounded-xl overflow-hidden">
              {/* Title clickable */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 bg-transparent border-none cursor-pointer text-left hover:bg-gray-50/50 transition-colors"
              >
                <p className="font-semibold text-ink text-sm sm:text-base pr-3">
                  {point.title}
                </p>
                <span className={`text-gray-300 text-lg transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>

              {/* Content */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-black/5">
                  <p className="text-sm text-ink/70 leading-relaxed mb-4 mt-4">
                    {point.explanation}
                  </p>
                  {point.examples && point.examples.length > 0 && (
                    <div className="flex flex-col gap-2 mt-3">
                      {point.examples.map((ex, ei) => {
                        const key = `${idx}-${ei}`;
                        const revealed = revealedExamples.has(key);
                        return (
                          <div
                            key={ei}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <p className="text-sm font-semibold text-ink mb-1">
                              {ex.target}
                            </p>
                            {revealed ? (
                              <div className="animate-reveal flex items-center justify-between gap-2">
                                <p className="text-xs text-gray-500 italic">
                                  → {ex.french}
                                </p>
                                <button
                                  onClick={() => toggleExample(key)}
                                  className="text-xs text-gray-400 hover:text-ink transition-colors bg-transparent border-none cursor-pointer flex-shrink-0"
                                >
                                  🙈
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => toggleExample(key)}
                                className="text-xs font-medium text-teal hover:text-teal-dark transition-colors bg-transparent border-none cursor-pointer"
                              >
                                👁 Voir la traduction
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// QUIZ (inchangé)
// ============================================
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers({ ...answers, [qIdx]: optIdx });
  };

  return (
    <div className="my-8">
      <p className="text-xs font-bold tracking-wider uppercase text-coral mb-4">
        🎯 Petit quiz
      </p>

      <div className="flex flex-col gap-4">
        {questions.map((q, qi) => {
          const answered = answers[qi] !== undefined;
          const isCorrect = answers[qi] === q.correct;

          return (
            <div key={qi} className="bg-white border border-black/5 rounded-xl p-5">
              <p className="font-semibold text-ink text-sm mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2 mb-3">
                {q.options.map((opt, oi) => {
                  let classes =
                    'w-full text-left p-3 rounded-lg text-sm border-2 transition-all cursor-pointer ';
                  if (!answered) {
                    classes += 'bg-cream border-black/5 hover:bg-gray-50';
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

              {answered && (
                <div
                  className={`p-3 rounded-lg text-sm animate-reveal ${
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
                    {isCorrect ? '✅ Bien vu !' : '💡 Explication'}
                  </p>
                  <p className="text-ink/70 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// CULTURAL NOTE (inchangé)
// ============================================
export function CulturalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-5 my-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🌍</span>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wider uppercase text-gold-dark mb-2">
            Le code culturel
          </p>
          <div className="text-ink leading-relaxed text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
