import React from 'react';
import { T, TYPE_ART } from '../constants/theme';
import { fmtTR, daysLeft, trLower } from '../utils/helpers';
import Ring from './Ring';

/* ═══════════ Detay Modalı ═══════════ */
export default function DetailModal({ item, src, saved, toggleSave, onClose, profile }) {
  if (!item) return null;
  const mine = [...profile.skills, ...profile.interests].map(trLower);
  const dl = daysLeft(item.deadline);
  const art = TYPE_ART[item.type] || TYPE_ART.Etkinlik;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(23,26,33,.5)', zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn .2s',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.card, borderRadius: 18, width: '100%', maxWidth: 540, maxHeight: '88vh',
        overflowY: 'auto', animation: 'popIn .28s cubic-bezier(.22,1,.36,1)',
      }}>
        {/* Banner */}
        <div style={{
          position: 'relative', height: 110, background: art.g, borderRadius: '18px 18px 0 0', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 15%, rgba(255,255,255,.28), transparent 45%)' }} />
          <div style={{ position: 'absolute', right: 20, bottom: 6, fontSize: 56, opacity: .3 }}>{art.icon}</div>
          <span style={{
            position: 'absolute', left: 18, top: 16, fontSize: 11, fontWeight: 700, color: '#fff',
            background: 'rgba(255,255,255,.22)', padding: '4px 11px', borderRadius: 12,
          }}>{src?.name} · {item.type}</span>
          <button onClick={onClose} className="press" style={{
            position: 'absolute', right: 14, top: 14, border: 'none',
            background: 'rgba(255,255,255,.25)', color: '#fff', borderRadius: 8,
            width: 30, height: 30, cursor: 'pointer', fontSize: 15,
          }}>✕</button>
        </div>
        <div style={{ padding: '0 26px 26px' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', marginTop: -26 }}>
            <div style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 4px 14px rgba(23,26,33,.15)' }}>
              <Ring pct={item.pct} size={62} />
            </div>
            <div style={{ paddingBottom: 4, fontSize: 12, color: T.mut, fontWeight: 600 }}>
              {item.online ? '🌐 Online' : `📍 ${item.city}`}
            </div>
          </div>
          <h2 style={{ fontFamily: T.disp, fontSize: 21, margin: '12px 0 8px', letterSpacing: '-.3px' }}>{item.title}</h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#3a3e48', margin: '0 0 16px' }}>{item.desc}</p>

          <div style={{ display: 'flex', gap: 6, background: T.paper, borderRadius: 12, padding: '12px 8px', marginBottom: 16 }}>
            {[['Son Başvuru', fmtTR(item.deadline), dl >= 0 && dl <= 3], ['Başlangıç', fmtTR(item.date), false], ...(item.end ? [['Bitiş', fmtTR(item.end), false]] : [])].map(([l, v, hot], i, arr) => (
              <React.Fragment key={l}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 10.5, color: T.mut, fontWeight: 600, marginBottom: 3 }}>{l}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, fontFamily: T.disp, color: hot ? T.red : T.ink }}>{v}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, background: T.line }} />}
              </React.Fragment>
            ))}
          </div>
          {dl >= 0 && dl <= 7 && (
            <div style={{ textAlign: 'center', fontSize: 12.5, fontWeight: 700, color: dl <= 3 ? T.red : T.amber, marginBottom: 14, marginTop: -6 }}>
              ⏳ {dl === 0 ? 'Bugün son gün!' : `Son başvuruya ${dl} gün kaldı`}
            </div>
          )}

          <div style={{ fontSize: 11.5, color: T.mut, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>
            Aranan yetkinlikler {item.pct != null && '— yeşiller profilinizle eşleşiyor'}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {item.tags.map((t) => {
              const tl = trLower(t);
              const hit = mine.some((m) => m === tl || tl.includes(m) || m.includes(tl));
              return (
                <span key={t} style={{
                  padding: '5px 12px', borderRadius: 16, fontSize: 12.5, fontWeight: 500,
                  background: hit ? T.tealSoft : T.paper, color: hit ? T.teal : T.mut,
                  border: `1px solid ${hit ? T.teal + '50' : T.line}`,
                }}>
                  {hit ? '✓ ' : ''}{t}
                </span>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={toggleSave} className="press" style={{
              flex: 1, padding: '12px', borderRadius: 24, cursor: 'pointer', fontSize: 14, fontWeight: 700, fontFamily: T.disp,
              border: `1px solid ${saved ? T.teal : T.line}`, background: saved ? T.tealSoft : 'transparent',
              color: saved ? T.teal : T.ink,
            }}>
              {saved ? '✓ Takvimde' : '📌 Takvime ekle'}
            </button>
            <button className="press" style={{
              flex: 1, padding: '12px', borderRadius: 24, cursor: dl < 0 ? 'default' : 'pointer',
              fontSize: 14, fontWeight: 700, fontFamily: T.disp, border: 'none',
              background: dl < 0 ? '#E9E9E4' : art.g, color: dl < 0 ? '#9a9a92' : '#fff',
            }}
              onClick={() => dl >= 0 && alert(`Gerçek uygulamada bu buton sizi ${src?.url} üzerindeki başvuru sayfasına götürür.`)}>
              {dl < 0 ? 'Başvurular Tamamlandı' : 'Başvuruya git ↗'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
