import React, { useState } from 'react';
import { T } from '../constants/theme';
import { daysLeft } from '../utils/helpers';
import { pctColor } from '../utils/matching';

/* ═══════════ Takvim Sayfası ═══════════ */
export default function CalendarPage({ items, sources, setDetail }) {
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2026);
  const [selDay, setSelDay] = useState(null);
  const monthNames = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const startDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(startDow).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  const nav = (d) => {
    let m = month + d, y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m); setYear(y); setSelDay(null);
  };

  const byDay = {};
  items.forEach((it) => {
    [['deadline', it.deadline], ['date', it.date]].forEach(([kind, iso]) => {
      const d = new Date(iso + 'T00:00:00');
      if (d.getFullYear() === year && d.getMonth() === month) (byDay[d.getDate()] ||= []).push({ ...it, kind });
    });
  });
  const isToday = (d) => year === 2026 && month === 6 && d === 4;
  const navB = { width: 34, height: 34, borderRadius: 9, border: `1px solid ${T.line}`, background: '#fff', cursor: 'pointer', fontSize: 17 };

  return (
    <div>
      {/* Boş durum */}
      {items.length === 0 && (
        <div style={{
          background: T.card, border: `1.5px dashed ${T.line}`, borderRadius: 14,
          padding: '20px 22px', marginBottom: 18, textAlign: 'center',
          color: T.mut, fontSize: 13, lineHeight: 1.6,
        }}>
          📌 Henüz takvime eklenmiş fırsat yok. Akıştan fırsatları kaydedin — burada görünür.
        </div>
      )}

      <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button onClick={() => nav(-1)} className="press" style={navB}>‹</button>
          <h2 style={{ fontFamily: T.disp, fontSize: 20, margin: 0, letterSpacing: '-.3px' }}>{monthNames[month]} {year}</h2>
          <button onClick={() => nav(1)} className="press" style={navB}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
          {['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'].map((d) => (
            <div key={d} style={{ fontSize: 11, color: T.mut, fontWeight: 700, textAlign: 'center', padding: 4, letterSpacing: '.3px' }}>{d}</div>
          ))}
          {cells.map((d, i) => {
            const has = d && byDay[d];
            return (
              <div key={i} onClick={() => has && setSelDay(selDay === d ? null : d)} style={{
                minHeight: 64, borderRadius: 9, padding: 6, fontSize: 12, cursor: has ? 'pointer' : 'default',
                background: selDay === d ? T.blueSoft : has ? '#F3F5FD' : d ? '#FAFAF8' : 'transparent',
                border: d ? `1.5px solid ${selDay === d ? T.blue : isToday(d) ? T.ink : has ? T.blue + '30' : T.line}` : 'none',
                transition: 'all .15s',
              }}>
                {d && <div style={{ fontWeight: isToday(d) ? 800 : 600, marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{d}</span>{isToday(d) && <span style={{ fontSize: 8.5, color: T.blue, fontWeight: 700 }}>BUGÜN</span>}
                </div>}
                {has && byDay[d].slice(0, 2).map((e, j) => (
                  <div key={j} title={e.title} style={{
                    fontSize: 9.5, padding: '2px 5px', borderRadius: 4, marginBottom: 2,
                    background: e.kind === 'deadline' ? T.redSoft : T.tealSoft,
                    color: e.kind === 'deadline' ? T.red : T.teal,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600,
                  }}>
                    {e.kind === 'deadline' ? '⏳' : '📅'} {e.title}
                  </div>
                ))}
                {has && byDay[d].length > 2 && <div style={{ fontSize: 9, color: T.mut }}>+{byDay[d].length - 2} daha</div>}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12, color: T.mut }}>
          <span><span style={{ color: T.red }}>⏳</span> Son başvuru</span>
          <span><span style={{ color: T.teal }}>📅</span> Etkinlik günü</span>
        </div>
        {selDay && byDay[selDay] && (
          <div style={{ marginTop: 14, borderTop: `1px solid ${T.line}`, paddingTop: 14, animation: 'fadeUp .25s ease' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.mut, marginBottom: 8 }}>{selDay} {monthNames[month]}</div>
            {byDay[selDay].map((e, j) => (
              <button key={j} onClick={() => setDetail(e.id)} className="press" style={{
                display: 'block', width: '100%', textAlign: 'left', background: T.paper,
                border: `1px solid ${T.line}`, borderRadius: 10, padding: '10px 13px', marginBottom: 6,
                cursor: 'pointer', fontSize: 13,
              }}>
                <b>{e.kind === 'deadline' ? '⏳ Son başvuru: ' : '📅 '}</b>{e.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
