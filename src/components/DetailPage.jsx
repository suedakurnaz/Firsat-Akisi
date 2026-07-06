import React, { useEffect } from 'react';
import { T, TYPE_ART } from '../constants/theme';
import { fmtTR, daysLeft, trLower } from '../utils/helpers';
import Ring from './Ring';

/* ═══════════ Tam Ekran Detay Sayfası ═══════════ */
export default function DetailPage({ item, src, saved, toggleSave, onClose, profile }) {
  if (!item) return null;

  const mine = [...profile.skills, ...profile.interests].map(trLower);
  const dl = daysLeft(item.deadline);
  const art = TYPE_ART[item.type] || TYPE_ART.Etkinlik;
  const closed = dl < 0;

  /* ESC tuşuyla kapat */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const applyUrl = src?.url
    ? `https://${src.url.replace(/^https?:\/\//, '')}`
    : '#';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 60,
      background: T.paper, overflowY: 'auto',
      animation: 'detailIn .32s cubic-bezier(.22,1,.36,1)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* ── Üst Bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(246,246,242,.94)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.line}`,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 28px',
      }}>
        <button onClick={onClose} className="press" style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '8px 16px', borderRadius: 20, border: `1px solid ${T.line}`,
          background: T.card, cursor: 'pointer', fontSize: 13.5, fontWeight: 600,
          color: T.ink,
        }}>
          ← Geri
        </button>
        <div style={{ flex: 1 }} />
        <span style={{
          fontSize: 12, fontWeight: 700, color: src?.color || T.violet,
          background: (src?.color || T.violet) + '18',
          padding: '5px 14px', borderRadius: 20,
        }}>{src?.name}</span>
        <span style={{
          fontSize: 12, fontWeight: 700, color: T.violet,
          background: '#F4EBFA', padding: '5px 14px', borderRadius: 20,
        }}>{item.type}</span>
      </div>

      {/* ── İçerik ── */}
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Hero Banner ── */}
        <div style={{
          position: 'relative', height: 260, background: art.g,
          borderRadius: '0 0 24px 24px', overflow: 'hidden', marginBottom: 0,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,.22), transparent 55%), radial-gradient(circle at 5% 90%, rgba(0,0,0,.25), transparent 50%)' }} />
          <div style={{ position: 'absolute', right: 40, bottom: 10, fontSize: 120, opacity: .2, animation: 'floaty 6s ease-in-out infinite' }}>{art.icon}</div>

          {/* Online / Şehir */}
          <div style={{ position: 'absolute', left: 32, bottom: 28, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', gap: 8 }}>
            {item.online ? '🌐 Online' : `📍 ${item.city}`}
          </div>

          {/* Uyum halkası */}
          <div style={{ position: 'absolute', right: 32, bottom: -30, background: '#fff', borderRadius: '50%', padding: 5, boxShadow: '0 8px 28px rgba(23,26,33,.18)' }}>
            <Ring pct={item.pct} size={78} />
          </div>
        </div>

        {/* ── Ana İçerik ── */}
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, marginTop: 48, alignItems: 'start' }}>

          {/* SOL KOLON */}
          <div>
            {/* Aciliyet uyarısı */}
            {dl >= 0 && dl <= 7 && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: dl <= 3 ? T.redSoft : T.amberSoft,
                border: `1px solid ${dl <= 3 ? T.red + '40' : T.amber + '40'}`,
                color: dl <= 3 ? T.red : T.amber,
                borderRadius: 20, padding: '6px 14px', fontSize: 12.5, fontWeight: 700,
                marginBottom: 16,
              }}>
                ⏳ {dl === 0 ? 'Bugün son gün!' : `Son başvuruya ${dl} gün kaldı`}
              </div>
            )}
            {closed && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#F0F0EE', borderRadius: 20, padding: '6px 14px',
                fontSize: 12.5, fontWeight: 700, color: T.mut, marginBottom: 16,
              }}>
                🔒 Başvuru süresi doldu
              </div>
            )}

            <h1 style={{ fontFamily: T.disp, fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2, margin: '0 0 16px', color: T.ink }}>
              {item.title}
            </h1>

            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#3a3e48', margin: '0 0 28px' }}>
              {item.desc}
            </p>

            {/* Tarih Kutuları */}
            <div style={{ display: 'flex', gap: 1, background: T.line, borderRadius: 14, overflow: 'hidden', marginBottom: 28 }}>
              {[
                ['📅 Son Başvuru', fmtTR(item.deadline), dl >= 0 && dl <= 3],
                ['🚀 Başlangıç', fmtTR(item.date), false],
                ...(item.end ? [['🏁 Bitiş', fmtTR(item.end), false]] : []),
              ].map(([l, v, hot], i) => (
                <div key={i} style={{ flex: 1, background: T.card, padding: '16px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: T.mut, fontWeight: 700, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.4px' }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, fontFamily: T.disp, color: hot ? T.red : T.ink }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Aranan Yetkinlikler */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11.5, color: T.mut, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>
                Aranan Yetkinlikler{item.pct != null && ' — yeşiller profilinizle eşleşiyor'}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {item.tags.map((t) => {
                  const tl = trLower(t);
                  const hit = mine.some((m) => m === tl || tl.includes(m) || m.includes(tl));
                  return (
                    <span key={t} style={{
                      padding: '7px 15px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                      background: hit ? T.tealSoft : T.card,
                      color: hit ? T.teal : T.mut,
                      border: `1.5px solid ${hit ? T.teal + '60' : T.line}`,
                    }}>
                      {hit ? '✓ ' : ''}{t}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Kaynak Bilgisi */}
            {src && (
              <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `${src.color}18`,
                  color: src.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: T.disp, fontWeight: 800, fontSize: 18, flexShrink: 0,
                }}>{src.name[0]}</div>
                <div>
                  <div style={{ fontFamily: T.disp, fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{src.name}</div>
                  <div style={{ fontSize: 12, color: T.mut }}>{src.url}</div>
                </div>
              </div>
            )}
          </div>

          {/* SAĞ KOLON — Aksiyonlar */}
          <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Uyum Kartı */}
            {item.pct != null && (
              <div style={{
                background: T.card, border: `1px solid ${T.line}`, borderRadius: 16,
                padding: '20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11.5, color: T.mut, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 12 }}>Profil Uyumu</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                  <Ring pct={item.pct} size={80} />
                </div>
                <div style={{ fontSize: 13, color: T.mut, lineHeight: 1.5 }}>
                  {item.pct >= 80 ? 'Profilinizle çok yüksek uyum!' : item.pct >= 60 ? 'Profilinizle iyi uyum' : 'Profilinize kısmen uyuyor'}
                </div>
              </div>
            )}

            {/* Takvime Ekle */}
            <button onClick={toggleSave} className="press" style={{
              padding: '14px', borderRadius: 14, cursor: 'pointer',
              fontSize: 14.5, fontWeight: 700, fontFamily: T.disp,
              border: `1.5px solid ${saved ? T.teal : T.line}`,
              background: saved ? T.tealSoft : T.card,
              color: saved ? T.teal : T.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {saved ? '✓ Takvimde' : '📌 Takvime Ekle'}
            </button>

            {/* Başvuruya Git */}
            <a
              href={closed ? undefined : applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => closed && e.preventDefault()}
              style={{
                padding: '16px', borderRadius: 14, border: 'none',
                fontSize: 15, fontWeight: 800, fontFamily: T.disp,
                background: closed ? '#E9E9E4' : art.g,
                color: closed ? '#9a9a92' : '#fff',
                cursor: closed ? 'default' : 'pointer',
                boxShadow: closed ? 'none' : '0 6px 20px rgba(23,26,33,.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                textDecoration: 'none',
                letterSpacing: '.2px',
              }}
            >
              {closed ? '🔒 Başvurular Kapandı' : 'Başvuruya Git ↗'}
            </a>

            {/* Hızlı Bilgiler */}
            <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 11.5, color: T.mut, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 12 }}>Özet</div>
              {[
                ['Tür', item.type],
                ['Format', item.online ? 'Online' : `Yüz yüze — ${item.city}`],
                ['Son Başvuru', fmtTR(item.deadline)],
                ['Başlangıç', fmtTR(item.date)],
                ...(item.end ? [['Bitiş', fmtTR(item.end)]] : []),
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${T.line}` }}>
                  <span style={{ fontSize: 12.5, color: T.mut }}>{k}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
