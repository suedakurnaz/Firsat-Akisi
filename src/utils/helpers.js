/* ═══════════ Yardımcı Fonksiyonlar ═══════════ */

export const TODAY = new Date('2026-07-04T09:00:00');

/** Tarih formatlama: ISO → "18 Temmuz" */
export const fmtTR = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });

/** Kalan gün hesabı */
export const daysLeft = (iso) =>
  Math.ceil((new Date(iso + 'T23:59:00') - TODAY) / 86400000);

/** Zaman farkı (dakika → insan okunur) */
export const timeAgo = (m) =>
  m < 60 ? `${m} dk önce` : m < 1440 ? `${Math.floor(m / 60)} sa önce` : `${Math.floor(m / 1440)} gün önce`;

/** Benzersiz ID üretici */
export const uid = () =>
  Date.now() + Math.floor(Math.random() * 1e4);

/** Türkçe-uyumlu küçük harf */
export const trLower = (s) =>
  s.toLocaleLowerCase('tr-TR');
