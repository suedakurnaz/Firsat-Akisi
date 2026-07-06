import React, { useState } from 'react';
import { T, TYPE_ART } from '../constants/theme';
import { fmtTR, daysLeft } from '../utils/helpers';
import { pctColor } from '../utils/matching';
import Ring from './Ring';

/* ═══════════ Kaydedilenler Sayfası ═══════════ */
export default function SavedPage({ items, sources, setDetail, toggleSave }) {
  const [filter, setFilter] = useState('hepsi');

  const filterMap = {
    hepsi: () => true,
    aktif: (it) => daysLeft(it.deadline) >= 0,
    kapaniyor: (it) => { const d = daysLeft(it.deadline); return d >= 0 && d <= 7; },
    kapandi: (it) => daysLeft(it.deadline) < 0,
  };

  const filtered = [...items]
    .filter(filterMap[filter] || (() => true))
    .sort((a, b) => daysLeft(a.deadline) - daysLeft(b.deadline));

  const tabs = [
    { key: 'hepsi', label: 'Tümü', count: items.length },
    { key: 'aktif', label: 'Aktif', count: items.filter(filterMap.aktif).length },
    { key: 'kapaniyor', label: '⏳ Kapanıyor', count: items.filter(filterMap.kapaniyor).length },
    { key: 'kapandi', label: 'Kapandı', count: items.filter(filterMap.kapandi).length },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ── Başlık + Filtreler ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontFamily: T.disp, fontSize: 22, fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.3px' }}>
            Kaydedilenler
          </h2>
          <p style={{ fontSize: 13, color: T.mut, margin: 0 }}>
            Takvime eklediğiniz tüm fırsatlar
          </p>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tabs.map(({ key, label, count }) => (
            <button key={key} onClick={() => setFilter(key)} className="press" style={{
              padding: '7px 14px', borderRadius: 20, fontSize: 12.5, cursor: 'pointer', fontWeight: 600,
              border: `1px solid ${filter === key ? T.blue : T.line}`,
              background: filter === key ? T.blueSoft : 'transparent',
              color: filter === key ? T.blue : T.ink, transition: 'all .15s',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              {label}
              <span style={{
                background: filter === key ? T.blue : T.line,
                color: filter === key ? '#fff' : T.mut,
                borderRadius: 10, fontSize: 10.5, fontWeight: 700,
                padding: '1px 7px', minWidth: 18, textAlign: 'center',
              }}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Kart Izgarası ── */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map((it, i) => {
            const src = sources.find((s) => s.id === it.src);
            const dl = daysLeft(it.deadline);
            const closed = dl < 0;
            const art = TYPE_ART[it.type] || TYPE_ART.Etkinlik;

            return (
              <div key={it.id} className="card-hover" style={{
                background: T.card, border: `1px solid ${T.line}`,
                borderRadius: 16, overflow: 'hidden',
                animation: `fadeUp .3s ease ${Math.min(i * 0.05, 0.35)}s both`,
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                opacity: closed ? 0.72 : 1,
              }}
                onClick={() => setDetail(it.id)}
              >
                {/* Mini Banner */}
                <div style={{ height: 6, background: art.g }} />

                <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Üst Satır */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: src?.color || T.mut, flex: 1 }}>{src?.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.violet, background: '#F4EBFA', padding: '3px 10px', borderRadius: 10 }}>{it.type}</span>
                    {it.pct != null && <span style={{ fontSize: 12, fontWeight: 800, color: pctColor(it.pct) }}>%{it.pct}</span>}
                  </div>

                  {/* Başlık */}
                  <h3 style={{ fontFamily: T.disp, fontSize: 15.5, fontWeight: 700, margin: 0, lineHeight: 1.3, letterSpacing: '-0.2px' }}>
                    {it.title}
                  </h3>

                  {/* Tarihler */}
                  <div style={{ display: 'flex', gap: 1, background: T.line, borderRadius: 10, overflow: 'hidden', marginTop: 'auto' }}>
                    {[['Son Başvuru', fmtTR(it.deadline), dl >= 0 && dl <= 3],
                      ['Başlangıç', fmtTR(it.date), false]
                    ].map(([l, v, hot]) => (
                      <div key={l} style={{ flex: 1, background: T.paper, padding: '9px 10px', textAlign: 'center' }}>
                        <div style={{ fontSize: 9.5, color: T.mut, fontWeight: 700, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '.3px' }}>{l}</div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, fontFamily: T.disp, color: hot ? T.red : T.ink }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Durum */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: closed ? T.mut : dl <= 3 ? T.red : dl <= 7 ? T.amber : T.teal }}>
                      {closed ? '🔒 Kapandı' : dl === 0 ? '⚠ Bugün son gün!' : dl <= 7 ? `⏳ ${dl} gün kaldı` : `✓ ${dl} gün kaldı`}
                    </div>
                    {/* Takvimden Çıkar */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSave(it.id); }}
                      className="press"
                      title="Takvimden çıkar"
                      style={{
                        border: `1px solid ${T.line}`, background: 'transparent',
                        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                        fontSize: 11.5, color: T.mut, fontWeight: 600,
                      }}
                    >
                      × Çıkar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          background: T.card, border: `1.5px dashed ${T.line}`, borderRadius: 16,
          padding: '60px 20px', textAlign: 'center', color: T.mut,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📌</div>
          <div style={{ fontFamily: T.disp, fontWeight: 700, fontSize: 16, marginBottom: 6, color: T.ink }}>
            {filter === 'hepsi' ? 'Henüz kayıt yok' : 'Bu filtreye uyan kayıt yok'}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            {filter === 'hepsi'
              ? 'Akışta bir fırsatın kartında 📌 simgesine tıklayarak takvime ekleyebilirsiniz.'
              : 'Farklı bir filtre deneyin.'}
          </div>
        </div>
      )}
    </div>
  );
}
