import React from 'react';
import { T } from '../constants/theme';

/* ═══════════ Linklerim Modalı ═══════════ */
export default function LinksModal({ sources, items, removeSource, onClose, onAddNew }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(23,26,33,.5)', zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn .2s',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.card, borderRadius: 18, padding: 26, width: '100%', maxWidth: 460,
        maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        animation: 'popIn .28s cubic-bezier(.22,1,.36,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3 style={{ fontFamily: T.disp, fontSize: 20, margin: 0 }}>Takip ettiğim linkler</h3>
          <button onClick={onClose} className="press" style={{
            border: 'none', background: T.paper, borderRadius: 8, width: 30, height: 30, cursor: 'pointer', fontSize: 15,
          }}>✕</button>
        </div>
        <p style={{ color: T.mut, fontSize: 13, margin: '0 0 16px' }}>
          Bu sitelerdeki yeni fırsatlar otomatik olarak akışınıza düşer.
        </p>
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {sources.map((s, i) => {
            const count = items.filter((it) => it.src === s.id).length;
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12,
                animation: `fadeUp .25s ease ${i * 0.04}s both`,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, background: `${s.color}18`, color: s.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: T.disp, fontWeight: 700, fontSize: 16, flexShrink: 0,
                }}>
                  {s.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, fontFamily: T.disp }}>{s.name}</div>
                  <div style={{ fontSize: 11.5, color: T.mut, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.url}</div>
                </div>
                <span style={{ fontSize: 11.5, color: T.mut, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: s.color,
                    display: 'inline-block', marginRight: 5, animation: 'pulse 2.5s infinite',
                  }} />
                  {count} fırsat
                </span>
                <button onClick={() => removeSource(s.id)} title="Takibi bırak" className="press" style={{
                  border: `1px solid ${T.line}`, background: '#fff', borderRadius: 8,
                  width: 30, height: 30, cursor: 'pointer', color: T.mut, fontSize: 14, flexShrink: 0,
                }}>×</button>
              </div>
            );
          })}
          {sources.length === 0 && (
            <div style={{ textAlign: 'center', padding: 30, color: T.mut, fontSize: 13 }}>Henüz takip edilen link yok.</div>
          )}
        </div>
        <button onClick={onAddNew} className="press" style={{
          padding: '12px', borderRadius: 11, border: `1.5px dashed ${T.blue}66`,
          background: T.blueSoft, color: T.blue, cursor: 'pointer', fontSize: 14, fontWeight: 700, fontFamily: T.disp,
        }}>
          + Yeni link ekle
        </button>
      </div>
    </div>
  );
}
