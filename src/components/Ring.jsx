import React from 'react';
import { T } from '../constants/theme';
import { pctColor } from '../utils/matching';

/* ═══════════ Uyum Halkası ═══════════ */
export default function Ring({ pct, size = 54, bg = T.line }) {
  const col = pctColor(pct);
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const off = pct == null ? c : c - (c * pct) / 100;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }} title="Profilinizle uyum">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth="4.5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth="4.5"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .7s cubic-bezier(.22,1,.36,1), stroke .3s' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.disp, fontWeight: 700, fontSize: size * 0.23, color: col,
      }}>
        {pct == null ? '—' : `%${pct}`}
      </div>
    </div>
  );
}
