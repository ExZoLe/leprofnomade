'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getUsername, setUsername as saveUsername } from '@/lib/supabase';

// ============================================================
// Réglage du pseudo — à placer dans la page profil / paramètres.
// Le pseudo est modifiable à tout moment et apparaît sur les
// cartes d'embarquement (champ "Passager").
//   <PseudoSetting />
// ============================================================

export function PseudoSetting({ accentColor = '#C86E46' }: { accentColor?: string }) {
  const { user } = useAuth();
  const [value, setValue] = useState('');
  const [initial, setInitial] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (user) {
      getUsername(user.id).then((name) => {
        setValue(name ?? '');
        setInitial(name ?? '');
      });
    }
  }, [user]);

  const changed = value.trim() !== initial.trim() && value.trim().length >= 2;

  const handleSave = async () => {
    if (!user || !changed) return;
    setStatus('saving');
    const { error } = await saveUsername(user.id, value);
    if (error) {
      setStatus('error');
    } else {
      setInitial(value.trim());
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🪪</span>
        <h3 className="font-display text-lg" style={{ color: '#3D3D3F' }}>Ton pseudo</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Il apparaît sur tes cartes d'embarquement. Modifiable à tout moment.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => { setValue(e.target.value); setStatus('idle'); }}
          maxLength={20}
          placeholder="Voyageur"
          className="flex-1 bg-white rounded-xl px-4 py-2.5 text-sm border outline-none transition-colors"
          style={{ borderColor: '#3D2D1418' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = accentColor; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#3D2D1418'; }}
        />
        <button
          onClick={handleSave}
          disabled={!changed || status === 'saving'}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white border-none cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: accentColor }}
        >
          {status === 'saving' ? '...' : status === 'saved' ? '✓ Enregistré' : 'Enregistrer'}
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-[11px] text-gray-400">{value.length}/20 caractères</p>
        {status === 'error' && <p className="text-[11px] text-red-500">Erreur — réessaie</p>}
        {status === 'saved' && <p className="text-[11px]" style={{ color: '#6B7B3E' }}>Pseudo mis à jour</p>}
      </div>
    </div>
  );
}
