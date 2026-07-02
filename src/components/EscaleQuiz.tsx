'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { saveProgress } from '@/lib/supabase';
import Link from 'next/link';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface EscaleQuizProps {
  lang: string;
  slug: string;
  title: string;
  escaleNum: number;
  color: string;
  questions: QuizQuestion[];
  nextEscaleSlug?: string;
}

export function EscaleQuiz({
  lang,
  slug,
  title,
  escaleNum,
  color,
  questions,
  nextEscaleSlug,
}: EscaleQuizProps) {
  const { user } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAnswer = (answerIdx: number) => {
    if (answers[currentQ] !== undefined) return;
    setAnswers({ ...answers, [currentQ]: answerIdx });
  };

  const goNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = Object.entries(answers).filter(
    ([q, a]) => a === questions[Number(q)].correct
  ).length;
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= 70;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await saveProgress(user.id, lang, slug, score);
    setSaved(true);
    setSaving(false);
  };

  // Écran final
  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-black/5 text-center shadow-sm">
          <p className="text-6xl mb-4">
            {passed ? (percent === 100 ? '🏆' : '🎉') : '💪'}
          </p>
          <h2 className="font-display text-3xl text-ink mb-2">
            {passed ? 'Escale validée !' : 'Presque !'}
          </h2>
          <p className="text-4xl font-display mb-2" style={{ color }}>
            {score}/{questions.length}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {percent}% de bonnes réponses
            {passed ? ' — bravo, tu maîtrises cette escale.' : ' — il te faut 70% pour valider.'}
          </p>

          {user ? (
            saved ? (
              <div className="flex items-center justify-center gap-2 text-teal text-sm font-semibold mb-6">
                <span>✓</span> Résultat sauvegardé
              </div>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="mb-6 px-6 py-3 bg-teal text-white font-semibold rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : '💾 Sauvegarder mon score'}
              </button>
            )
          ) : (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-3">
                Connecte-toi pour sauvegarder ton score
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-3 bg-coral text-white font-semibold rounded-xl no-underline hover:bg-coral-dark transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setCurrentQ(0);
                setAnswers({});
                setShowResult(false);
                setSaved(false);
              }}
              className="flex-1 py-3 border-2 border-black/10 rounded-xl font-semibold text-ink hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Recommencer
            </button>
            {passed && nextEscaleSlug ? (
              <Link
                href={`/lecon/${nextEscaleSlug}`}
                className="flex-1 py-3 text-white font-semibold rounded-xl no-underline text-center transition-opacity hover:opacity-90"
                style={{ background: color }}
              >
                Escale suivante →
              </Link>
            ) : (
              <Link
                href={`/${lang}`}
                className="flex-1 py-3 text-white font-semibold rounded-xl no-underline text-center transition-opacity hover:opacity-90"
                style={{ background: color }}
              >
                Retour au parcours
              </Link>
            )}
          </div>
        </div>

        {/* Récapitulatif des questions */}
        <div className="mt-8">
          <h3 className="font-display text-xl text-ink mb-4">Correction</h3>
          <div className="flex flex-col gap-3">
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correct;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-4 border ${
                    correct ? 'border-emerald-200' : 'border-red-200'
                  }`}
                >
                  <p className="text-sm font-semibold text-ink mb-2">
                    <span className={correct ? 'text-emerald-600' : 'text-coral'}>
                      {correct ? '✓' : '✕'} Q{i + 1}.
                    </span>{' '}
                    {q.question}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    Bonne réponse : <span className="text-emerald-600 font-semibold">{q.options[q.correct]}</span>
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Écran de question
  const q = questions[currentQ];
  const answered = answers[currentQ] !== undefined;
  const isCorrect = answers[currentQ] === q.correct;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color }}>
          Quiz final — Escale {escaleNum}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl text-ink mb-4">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQ + 1) / questions.length) * 100}%`,
                background: color,
              }}
            />
          </div>
          <span className="text-sm text-gray-400 font-mono">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/5 shadow-sm">
        <p className="text-lg font-semibold text-ink mb-6 leading-relaxed">
          {q.question}
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {q.options.map((opt, oi) => {
            let classes =
              'w-full text-left p-4 rounded-xl text-sm border-2 transition-all cursor-pointer ';
            if (!answered) {
              classes += 'bg-cream border-black/5 hover:bg-gray-50';
            } else if (oi === q.correct) {
              classes += 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold';
            } else if (oi === answers[currentQ] && !isCorrect) {
              classes += 'bg-red-50 border-coral text-coral';
            } else {
              classes += 'bg-cream border-black/5 text-gray-400';
            }

            return (
              <button
                key={oi}
                onClick={() => handleAnswer(oi)}
                className={classes}
                disabled={answered}
              >
                {answered && oi === q.correct && '✓ '}
                {answered && oi === answers[currentQ] && !isCorrect && '✕ '}
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`p-4 rounded-xl text-sm animate-reveal mb-6 ${
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
              {isCorrect ? 'Correct !' : "Pas tout à fait..."}
            </p>
            <p className="text-ink/70 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={goNext}
            className="w-full py-4 text-white font-bold rounded-xl transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: color }}
          >
            {currentQ < questions.length - 1 ? 'Question suivante →' : 'Voir mon résultat 🎯'}
          </button>
        )}
      </div>
    </div>
  );
}
