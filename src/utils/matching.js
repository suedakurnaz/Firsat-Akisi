/* ═══════════ Uyum Skoru Hesaplama ═══════════ */

import { T } from '../constants/theme';
import { trLower } from './helpers';

/**
 * Profil-fırsat uyum skoru hesaplar.
 * Profildeki skill+interest+about anahtar kelimeleri ile
 * fırsatın tag'lerini karşılaştırır.
 */
export function matchScore(item, profile) {
  const mine = [
    ...profile.skills,
    ...profile.interests,
    ...profile.about.split(/[\s,.;!?()\u00b7|]+/),
  ]
    .map((s) => trLower(s).trim())
    .filter((s) => s.length > 2);

  if (mine.length === 0) return null;

  let hit = 0;
  item.tags.forEach((t) => {
    const tl = trLower(t);
    if (mine.some((m) => m === tl || tl.includes(m) || m.includes(tl))) hit++;
  });

  if (hit === 0) return Math.max(4, Math.round(8 - item.tags.length));
  return Math.min(98, Math.round((hit / item.tags.length) * 86 + 12));
}

/** Yüzdeye göre renk döndürür */
export const pctColor = (p) =>
  p == null ? T.mut : p >= 70 ? T.teal : p >= 40 ? T.amber : T.red;
