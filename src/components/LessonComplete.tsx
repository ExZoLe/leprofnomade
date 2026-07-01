'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { saveProgress } from '@/lib/supabase';
import Link from 'next/link';

interface LessonCompleteProps {
  lang: string;
  lessonSlug: string;
  score: number;
  totalQuestions: number;
}

export function LessonComplete({ lang, lessonSlug, score, totalQuestions }: LessonCompleteProps) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await saveProgress(user.id, lang, lessonSlug, score);
    setSaved(true);
    setSaving(false);
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl border border-black/5 text-center">
      <p className="text-4xl mb-3">
        {percentage === 100 ? '🏆' : percentage >= 60 ? '🎉' : '💪'}
      </p>
      <p className="font-display text-2xl text-ink mb-1">
        {score}/{totalQuestions}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        {percentage === 100
          ? 'Parfait ! Tu maîtrises cette leçon.'
          : percentage >= 60
          ? 'Bien joué ! Continue comme ça.'
          : "C'est un début — reviens-y pour t'améliorer !"}
      </p>

      {user ? (
        saved ? (
          <div className="flex items-center justify-center gap-2 text-teal text-sm font-semibold">
            <span>✓</span> Progression sauvegardée
          </div>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-teal text-white font-semibold rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : '💾 Sauvegarder ma progression'}
          </button>
        )
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            Connecte-toi pour sauvegarder ta progression
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 bg-coral text-white font-semibold rounded-xl no-underline hover:bg-coral-dark transition-colors"
          >
            Créer un compte gratuit
          </Link>
        </div>
      )}
    </div>
  );
}
