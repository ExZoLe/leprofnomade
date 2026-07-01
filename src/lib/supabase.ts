import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// AUTH
// ============================================

export async function signUpWithEmail(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/login?callback=true`,
    },
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ============================================
// PROGRESSION
// ============================================

export async function saveProgress(
  userId: string, lang: string, lessonSlug: string, score: number
) {
  return await supabase.from('progress').upsert(
    {
      user_id: userId,
      lang,
      lesson_slug: lessonSlug,
      completed: true,
      score,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_slug' }
  );
}

export async function getProgress(userId: string, lang?: string) {
  let query = supabase.from('progress').select('*').eq('user_id', userId);
  if (lang) query = query.eq('lang', lang);
  return await query.order('completed_at', { ascending: false });
}

export async function getLessonProgress(userId: string, lessonSlug: string) {
  return await supabase.from('progress').select('*')
    .eq('user_id', userId).eq('lesson_slug', lessonSlug).single();
}

export async function getProfileStats(userId: string) {
  const { data, error } = await supabase.from('progress').select('lang, score, completed')
    .eq('user_id', userId).eq('completed', true);

  if (error || !data) return { stats: null, error };

  return {
    stats: {
      totalLessons: data.length,
      totalScore: data.reduce((sum, p) => sum + (p.score || 0), 0),
      byLang: {
        anglais: data.filter(p => p.lang === 'anglais').length,
        coreen: data.filter(p => p.lang === 'coreen').length,
        italien: data.filter(p => p.lang === 'italien').length,
      },
    },
    error: null,
  };
}
