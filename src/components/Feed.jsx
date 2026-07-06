import React, { useState, useEffect } from 'react';
import { T } from '../constants/theme';
import { daysLeft, trLower } from '../utils/helpers';
import FeedCard from './FeedCard';

/* ═══════════ Akış Sayfası ═══════════ */
export default function Feed({ scored, sources, saved, toggleSave, seen, setSeen, profile, setDetail, goProfile, onShowLinks }) {
  const [filter, setFilter] = useState('hepsi');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('uyum');

  useEffect(() => {
    const t = setTimeout(() => {
      const ids = scored.map((i) => i.id);
      setSeen((s) => [...new Set([...s, ...ids])]);
    }, 1500);
    return () => clearTimeout(t);
  }, [scored, setSeen]);

  const types = ['hepsi', 'yuksek', 'Hackathon', 'Yarışma', 'Staj', 'Etkinlik', 'Bootcamp', 'Program'];
  const label = { hepsi: 'Tümü', yuksek: '★ %70+ uyum' };
  const emptyProfile = profile.skills.length === 0 && profile.interests.length === 0 && !profile.about.trim();

  let feed = scored.filter((i) =>
    (filter === 'hepsi' || (filter === 'yuksek' ? (i.pct ?? 0) >= 70 : i.type === filter)) &&
    (q.trim() === '' || trLower(i.title + i.desc + i.tags.join(' ')).includes(trLower(q)))
  );
  feed = [...feed].sort((a, b) =>
    sort === 'uyum' ? (b.pct ?? -1) - (a.pct ?? -1)
    : sort === 'yeni' ? a.mins - b.mins
    : daysLeft(a.deadline) - daysLeft(b.deadline)
  );

  const high = scored.filter((i) => (i.pct ?? 0) >= 70).length;
  const urgent = scored.filter((i) => { const d = daysLeft(i.deadline); return d >= 0 && d <= 7; }).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* ── İstatistik Kartları ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
        {[
          [scored.length, 'aktif fırsat', T.blue, null],
          [high, 'size %70+ uygun', T.teal, null],
          [urgent, 'son 7 günde kapanıyor', T.red, null],
          [sources.length, 'takip edilen site', T.violet, onShowLinks],
        ].map(([n, l, c, onClick], i) => (
          <div
            key={i}
            onClick={onClick || undefined}
            style={{
              background: T.card, border: `1px solid ${onClick ? T.violet + '40' : T.line}`,
              borderRadius: 12, padding: '12px 16px',
              animation: `fadeUp .3s ease ${i * 0.05}s both`,
              cursor: onClick ? 'pointer' : 'default',
              transition: onClick ? 'box-shadow .15s, border-color .15s, transform .15s' : 'none',
              position: 'relative', overflow: 'hidden',
            }}
            className={onClick ? 'card-hover' : ''}
          >
            <div style={{ fontFamily: T.disp, fontSize: 24, fontWeight: 700, color: c }}>{n}</div>
            <div style={{ fontSize: 12, color: T.mut }}>{l}</div>
            {/* "+" butonu yalnızca "takip edilen site" kartında */}
            {onClick && (
              <div style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 28, height: 28, borderRadius: 8,
                background: T.violet, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, lineHeight: 1,
                boxShadow: `0 2px 8px ${T.violet}50`,
              }}>+</div>
            )}
          </div>
        ))}
      </div>

      {/* ── Profil Uyarısı ── */}
      {emptyProfile && (
        <button onClick={goProfile} className="press" style={{ textAlign: 'left', background: T.blueSoft, border: `1px solid ${T.blue}33`, borderRadius: 12, padding: '13px 16px', fontSize: 13.5, cursor: 'pointer', color: T.ink }}>
          💡 Uyum yüzdelerini görmek için <b style={{ color: T.blue }}>profilinizi doldurun veya CV'nizi yükleyin</b> — her fırsat size göre anında puanlanır. →
        </button>
      )}

      {/* ── Arama + Sıralama ── */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍  Fırsat ara…"
          style={{ flex: 1, minWidth: 200, padding: '10px 14px', borderRadius: 10, border: `1px solid ${T.line}`, fontSize: 13.5, outline: 'none', background: T.card, transition: 'border-color .2s, box-shadow .2s' }} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.line}`, fontSize: 13, background: T.card, cursor: 'pointer', fontFamily: T.body }}>
          <option value="uyum">Uyuma göre</option>
          <option value="yeni">En yeni</option>
          <option value="son">Son başvuruya göre</option>
        </select>
      </div>

      {/* ── Filtre Çipleri ── */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)} className="press" style={{
            padding: '6px 13px', borderRadius: 18, fontSize: 12.5, cursor: 'pointer', fontWeight: 500,
            border: `1px solid ${filter === t ? T.blue : T.line}`, background: filter === t ? T.blueSoft : 'transparent',
            color: filter === t ? T.blue : T.ink, transition: 'all .15s',
          }}>{label[t] || t}</button>
        ))}
      </div>

      {/* ── Kart Izgarası ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>
        {feed.map((it, idx) => (
          <FeedCard key={it.id} it={it} idx={idx} src={sources.find((s) => s.id === it.src)}
            isNew={!seen.includes(it.id)} isSaved={saved.includes(it.id)}
            onSave={() => toggleSave(it.id)} onOpen={() => setDetail(it.id)} />
        ))}
      </div>

      {feed.length === 0 && (
        <div style={{ textAlign: 'center', padding: 50, color: T.mut, animation: 'fadeIn .3s' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔎</div>
          Bu aramaya uyan fırsat yok. Filtreleri temizlemeyi deneyin.
        </div>
      )}
    </div>
  );
}
