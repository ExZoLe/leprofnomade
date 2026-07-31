import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Suppression de compte (charte Article 11) : efface la progression,
// le profil (pseudo) puis le compte auth. Irréversible.
// Nécessite SUPABASE_SERVICE_ROLE_KEY côté serveur (jamais exposée au client).

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "La suppression de compte n'est pas encore configurée côté serveur." },
      { status: 503 }
    );
  }

  // 1) Identifier l'utilisateur via son token de session
  const authHeader = request.headers.get('authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Session invalide.' }, { status: 401 });
  }
  const userId = userData.user.id;

  // 2) Effacer les données applicatives puis le compte
  const { error: progressError } = await admin.from('progress').delete().eq('user_id', userId);
  if (progressError) {
    return NextResponse.json({ error: 'Échec de la suppression de la progression.' }, { status: 500 });
  }

  const { error: profileError } = await admin.from('profiles').delete().eq('id', userId);
  if (profileError) {
    return NextResponse.json({ error: 'Échec de la suppression du profil.' }, { status: 500 });
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    return NextResponse.json({ error: 'Échec de la suppression du compte.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
