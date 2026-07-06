import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { T } from './constants/theme';
import { SEED_SOURCES, SEED_ITEMS, DISCOVER_POOL, DEFAULT_PROFILE } from './constants/data';
import { uid } from './utils/helpers';
import { matchScore } from './utils/matching';
import { loadState, saveState } from './utils/storage';

/* ── Bileşenler ── */
import Feed from './components/Feed';
import CalendarPage from './components/CalendarPage';
import ProfilePage from './components/ProfilePage';
import SavedPage from './components/SavedPage';
import LinksPage from './components/LinksPage';
import AddModal from './components/AddModal';
import DetailPage from './components/DetailPage';
import Toasts from './components/Toasts';

/* ═══════════ ANA UYGULAMA ═══════════ */
export default function App() {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState('akis');
  const [sources, setSources] = useState(SEED_SOURCES);
  const [items, setItems] = useState(SEED_ITEMS);
  const [saved, setSaved] = useState([]);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [seen, setSeen] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [showLinks, setShowLinks] = useState(false);
  const [detail, setDetail] = useState(null);
  const firstSave = useRef(true);

  /* ── Kalıcı veri yükleme ── */
  useEffect(() => {
    loadState().then((s) => {
      if (s) {
        setSources(s.sources ?? SEED_SOURCES);
        const base = s.items ?? [];
        const merged = [...base];
        SEED_ITEMS.forEach((si) => { if (!merged.some((m) => m.title === si.title)) merged.push(si); });
        setItems(merged.length ? merged : SEED_ITEMS);
        setSaved(s.saved ?? []);
        setProfile({ ...DEFAULT_PROFILE, ...(s.profile ?? {}) });
        setSeen(s.seen ?? []);
      }
      setReady(true);
    });
  }, []);

  /* ── Otomatik kayıt ── */
  useEffect(() => {
    if (!ready) return;
    if (firstSave.current) { firstSave.current = false; return; }
    const t = setTimeout(() => saveState({ sources, items, saved, profile, seen }), 400);
    return () => clearTimeout(t);
  }, [sources, items, saved, profile, seen, ready]);

  /* ── Toast sistemi ── */
  const toast = useCallback((msg, icon = '✓') => {
    const id = uid();
    setToasts((p) => [...p, { id, msg, icon }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3200);
  }, []);

  /* ── Uyum skoru hesaplama ── */
  const scored = useMemo(() => items.map((it) => ({ ...it, pct: matchScore(it, profile) })), [items, profile]);
  const newCount = items.filter((i) => !seen.includes(i.id)).length;

  /* ── Kaydet/kaldır ── */
  const toggleSave = (id) => {
    const on = saved.includes(id);
    setSaved(on ? saved.filter((x) => x !== id) : [...saved, id]);
    toast(on ? 'Takvimden çıkarıldı' : 'Takvime eklendi', on ? '🗑' : '📌');
  };

  /* ── Kaynak ekleme ── */
  const addSource = (url, done) => {
    const clean = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    const name = clean.split(/[/.]/)[0];
    const cap = name.charAt(0).toUpperCase() + name.slice(1);
    const color = ['#3B5BDB', '#0CA678', '#E8930C', '#9C36B5', '#E03131', '#0E7490', '#7C3AED'][sources.length % 7];
    const src = { id: uid(), name: cap, url: clean, color };
    setTimeout(() => {
      const found = DISCOVER_POOL
        .filter((p) => !items.some((i) => i.title === p.title))
        .slice(0, 2)
        .map((p) => ({ ...p, id: uid(), src: src.id, mins: Math.floor(Math.random() * 20) + 2 }));
      setSources((s) => [...s, src]);
      setItems((it) => [...found, ...it]);
      done();
      toast(found.length ? `${cap} takibe alındı — ${found.length} yeni fırsat bulundu` : `${cap} takibe alındı`, '🔗');
    }, 1400);
  };

  /* ── Kaynak kaldırma ── */
  const removeSource = (id) => {
    setSources(sources.filter((s) => s.id !== id));
    setItems(items.filter((i) => i.src !== id));
    toast('Kaynak takipten çıkarıldı', '🗑');
  };

  /* ── Yükleniyor durumu ── */
  if (!ready) return (
    <div style={{ minHeight: '100vh', background: T.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: `3px solid ${T.line}`, borderTopColor: T.blue, borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
    </div>
  );

  /* ── Navigasyon butonu ── */
  const navBtn = (k, l, badge) => (
    <button key={k} onClick={() => setPage(k)} className="press" style={{
      position: 'relative', padding: '7px 15px', borderRadius: 20, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
      border: 'none', background: page === k ? T.ink : 'transparent', color: page === k ? '#fff' : T.ink, transition: 'background .2s, color .2s',
    }}>
      {l}
      {badge > 0 && <span style={{ position: 'absolute', top: -3, right: -3, minWidth: 16, height: 16, borderRadius: 9, background: T.red, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{badge}</span>}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.paper, fontFamily: T.body, color: T.ink }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(246,246,242,.92)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '13px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontFamily: T.disp, fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            fırsat<span style={{ color: T.blue }}>/akışı</span>
          </div>
          <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
            {navBtn('akis', 'Akış', newCount)}
            {navBtn('takvim', 'Takvim', 0)}
            {navBtn('kaydedilenler', 'Kaydedilenler', 0)}
          </nav>
          {/* Profil butonu — sağ üstte sabit */}
          <button onClick={() => setPage('profil')} className="press" style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20,
            background: page === 'profil' ? T.ink : T.card, color: page === 'profil' ? '#fff' : T.ink,
            border: `1px solid ${page === 'profil' ? T.ink : T.line}`, cursor: 'pointer', fontWeight: 600, fontSize: 13.5, transition: 'all .2s',
            flexShrink: 0,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg, ${T.blue}, ${T.violet})`,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.disp, fontSize: 10, fontWeight: 700,
            }}>
              {(profile?.name?.trim() || '?').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            Profil
          </button>
        </div>
      </header>

      <main key={page} style={{ maxWidth: 1120, margin: '0 auto', padding: '24px 20px 70px', animation: 'fadeUp .3s ease' }}>
        {page === 'akis' && (
          <Feed
            scored={scored} sources={sources} saved={saved} toggleSave={toggleSave}
            seen={seen} setSeen={setSeen} profile={profile} setDetail={setDetail}
            goProfile={() => setPage('profil')}
            onShowLinks={() => setShowLinks(true)}
          />
        )}
        {page === 'takvim' && (
          <CalendarPage items={scored.filter((i) => saved.includes(i.id))} sources={sources} setDetail={setDetail} />
        )}
        {page === 'kaydedilenler' && (
          <SavedPage
            items={scored.filter((i) => saved.includes(i.id))}
            sources={sources}
            setDetail={setDetail}
            toggleSave={toggleSave}
          />
        )}
        {page === 'profil' && <ProfilePage profile={profile} setProfile={setProfile} toast={toast} />}
      </main>

      {/* ── Tam ekran katmanlar ── */}
      {showLinks && (
        <LinksPage
          sources={sources}
          items={items}
          removeSource={removeSource}
          onClose={() => setShowLinks(false)}
          addSource={addSource}
        />
      )}
      {detail && (
        <DetailPage
          item={scored.find((i) => i.id === detail)}
          src={sources.find((s) => s.id === scored.find((i) => i.id === detail)?.src)}
          saved={saved.includes(detail)}
          toggleSave={() => toggleSave(detail)}
          onClose={() => setDetail(null)}
          profile={profile}
        />
      )}
      <Toasts toasts={toasts} />
    </div>
  );
}
