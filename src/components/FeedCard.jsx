import React from 'react';
import { T, TYPE_ART } from '../constants/theme';
import { fmtTR, daysLeft, timeAgo } from '../utils/helpers';
import Ring from './Ring';

/* ═══════════ Fırsat Kartı ═══════════ */
export default function FeedCard({ it, idx, src, isNew, isSaved, onSave, onOpen }) {
  const dl = daysLeft(it.deadline);
  const closed = dl < 0;
  const art = TYPE_ART[it.type] || TYPE_ART.Etkinlik;

  const DateCol = ({ l, v }) => (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 10.5, color: T.mut, fontWeight: 600, marginBottom: 3 }}>{l}</div>
      <div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.disp }}>{v}</div>
    </div>
  );

  return (
    <article onClick={onOpen} className="card-hover" style={{
      background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, overflow: 'visible',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
      animation: `fadeUp .35s ease ${Math.min(idx * 0.05, 0.4)}s both`,
    }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: 118, borderRadius: '15px 15px 0 0', background: art.g, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 15%, rgba(255,255,255,.28), transparent 45%), radial-gradient(circle at 10% 90%, rgba(0,0,0,.18), transparent 50%)' }} />
        <div style={{ position: 'absolute', right: 16, bottom: 8, fontSize: 52, opacity: .3, animation: 'floaty 5s ease-in-out infinite', filter: 'grayscale(.2)' }}>{art.icon}</div>
        <div style={{ position: 'absolute', left: 14, top: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,.22)', backdropFilter: 'blur(4px)', padding: '4px 11px', borderRadius: 12, letterSpacing: '.2px' }}>{src?.name}</span>
          {isNew && <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: T.red, padding: '3px 9px', borderRadius: 10, letterSpacing: '.5px', animation: 'pulse 1.6s infinite' }}>YENİ</span>}
        </div>
        <div style={{ position: 'absolute', left: 14, bottom: 12, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.9)' }}>
          {it.online ? '🌐 Online' : `📍 ${it.city}`} · <span className="hide-mobile">{timeAgo(it.mins)}</span>
        </div>
        {/* Kaydet düğmesi */}
        <button onClick={(e) => { e.stopPropagation(); onSave(); }} title={isSaved ? 'Takvimden çıkar' : 'Takvime ekle'} className="press" style={{
          position: 'absolute', right: 12, top: 12, width: 32, height: 32, borderRadius: 9, border: 'none',
          background: isSaved ? '#fff' : 'rgba(255,255,255,.22)', backdropFilter: 'blur(4px)',
          color: isSaved ? T.teal : '#fff', cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{isSaved ? '✓' : '📌'}</button>
      </div>

      {/* Uyum halkası — banner'ın üzerine taşan imza öğe */}
      <div style={{ position: 'relative', height: 0 }}>
        <div style={{ position: 'absolute', right: 14, top: -27, background: '#fff', borderRadius: '50%', padding: 3, boxShadow: '0 4px 14px rgba(23,26,33,.15)' }}>
          <Ring pct={it.pct} size={50} />
        </div>
      </div>

      {/* Gövde */}
      <div style={{ padding: '16px 18px 0', flex: 1 }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: T.violet, background: '#F4EBFA', padding: '4px 12px', borderRadius: 12, marginBottom: 9 }}>{it.type}</span>
        <h3 style={{ fontFamily: T.disp, fontSize: 16.5, margin: '0 0 6px', fontWeight: 700, letterSpacing: '-.2px', lineHeight: 1.3, paddingRight: 8 }}>{it.title}</h3>
        <p style={{ fontSize: 12.5, color: T.mut, margin: '0 0 14px', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{it.desc}</p>
        <div style={{ display: 'flex', gap: 6, borderTop: `1px solid ${T.line}`, paddingTop: 12 }}>
          <DateCol l="Son Başvuru" v={fmtTR(it.deadline)} />
          <div style={{ width: 1, background: T.line }} />
          <DateCol l="Başlangıç" v={fmtTR(it.date)} />
          {it.end && <><div style={{ width: 1, background: T.line }} /><DateCol l="Bitiş" v={fmtTR(it.end)} /></>}
        </div>
        {!closed && dl <= 7 && (
          <div style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: dl <= 3 ? T.red : T.amber, marginTop: 8 }}>
            ⏳ {dl === 0 ? 'Bugün son gün!' : `Son başvuruya ${dl} gün`}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '14px 18px 18px' }}>
        <button className="press" onClick={(e) => { e.stopPropagation(); onOpen(); }} style={{
          width: '100%', padding: '12px', borderRadius: 24, border: 'none', cursor: closed ? 'default' : 'pointer',
          fontSize: 14, fontWeight: 700, fontFamily: T.disp, letterSpacing: '.2px',
          background: closed ? '#E9E9E4' : art.g, color: closed ? '#9a9a92' : '#fff',
          boxShadow: closed ? 'none' : '0 4px 14px rgba(23,26,33,.18)',
        }}>
          {closed ? 'Başvurular Tamamlandı' : 'Detaylı Bilgi ›'}
        </button>
      </div>
    </article>
  );
}
