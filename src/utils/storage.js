/* ═══════════ Kalıcı Depolama (localStorage) ═══════════ */

const STORE_KEY = 'firsat-akisi-state-v1';

/** Kaydedilmiş durumu yükle */
export async function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Durumu kaydet */
export async function saveState(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    // localStorage dolu veya erişilemez
  }
}
