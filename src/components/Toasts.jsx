import React from 'react';
import { T } from '../constants/theme';

/* ═══════════ Toast Bildirimleri ═══════════ */
export default function Toasts({ toasts }) {
  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, display: 'flex', flexDirection: 'column', gap: 8,
      alignItems: 'center', pointerEvents: 'none', width: 'min(92vw, 440px)',
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: T.ink, color: '#fff', padding: '11px 18px', borderRadius: 12,
          fontSize: 13.5, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,.25)',
          animation: 'popIn .25s ease', display: 'flex', gap: 8, alignItems: 'center', maxWidth: '100%',
        }}>
          <span>{t.icon}</span><span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
