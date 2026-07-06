import React, { useState, useEffect } from 'react';
import { T } from '../constants/theme';

/* ═══════════ Tam Ekran Link Yönetimi Sayfası ═══════════ */
export default function LinksPage({ sources, items, removeSource, onClose, addSource }) {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ['Sayfa taranıyor…', 'Etkinlikler ayrıştırılıyor…', 'Akışa ekleniyor…'];

  /* ESC ile kapat */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  /* Tarama adımı animasyonu */
  useEffect(() => {
    if (!scanning) return;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, 2)), 480);
    return () => clearInterval(t);
  }, [scanning]);

  const go = () => {
    if (!url.trim() || scanning) return;
    setScanning(true);
    addSource(url.trim(), () => {
      setScanning(false);
      setUrl('');
      setStep(0);
    });
  };

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
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: T.disp, fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>
            Takip Ettiğim Linkler
          </h2>
        </div>
        <span style={{
          fontSize: 13, color: T.mut, fontWeight: 600,
          background: T.card, border: `1px solid ${T.line}`,
          padding: '5px 14px', borderRadius: 20,
        }}>
          {sources.length} site
        </span>
      </div>

      {/* ── İçerik ── */}
      <div style={{ maxWidth: 820, width: '100%', margin: '0 auto', padding: '32px 24px 80px' }}>
        <div className="links-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

          {/* SOL — Site Listesi */}
          <div>
            <div style={{ fontSize: 11.5, color: T.mut, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 14 }}>
              Takip edilen siteler
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sources.map((s, i) => {
                const count = items.filter((it) => it.src === s.id).length;
                return (
                  <div key={s.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 18px', background: T.card,
                    border: `1px solid ${T.line}`, borderRadius: 14,
                    animation: `fadeUp .25s ease ${i * 0.05}s both`,
                    transition: 'box-shadow .15s, border-color .15s',
                  }}
                    className="card-hover"
                  >
                    {/* Logo */}
                    <div style={{
                      width: 46, height: 46, borderRadius: 12,
                      background: `${s.color}18`, color: s.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.disp, fontWeight: 800, fontSize: 20, flexShrink: 0,
                    }}>{s.name[0]}</div>

                    {/* Bilgi */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, fontFamily: T.disp, marginBottom: 2 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: T.mut, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.url}</div>
                    </div>

                    {/* Fırsat sayısı */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: T.mut, fontWeight: 600 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, display: 'inline-block', animation: 'pulse 2.5s infinite' }} />
                        {count} fırsat
                      </div>
                    </div>

                    {/* Sil */}
                    <button onClick={() => removeSource(s.id)} title="Takibi bırak" className="press" style={{
                      border: `1px solid ${T.line}`, background: T.paper, borderRadius: 10,
                      width: 34, height: 34, cursor: 'pointer', color: T.mut, fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'background .15s, color .15s, border-color .15s',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = T.redSoft; e.currentTarget.style.color = T.red; e.currentTarget.style.borderColor = T.red + '40'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = T.paper; e.currentTarget.style.color = T.mut; e.currentTarget.style.borderColor = T.line; }}
                    >×</button>
                  </div>
                );
              })}

              {sources.length === 0 && (
                <div style={{
                  background: T.card, border: `1.5px dashed ${T.line}`, borderRadius: 14,
                  padding: 40, textAlign: 'center', color: T.mut, fontSize: 14, lineHeight: 1.7,
                }}>
                  🔗<br />Henüz takip edilen site yok.<br />
                  <span style={{ fontSize: 12 }}>Sağdaki formdan ilk sitenizi ekleyin.</span>
                </div>
              )}
            </div>
          </div>

          {/* SAĞ — Yeni Site Ekle */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{
              background: T.card, border: `1px solid ${T.line}`, borderRadius: 16,
              padding: '24px 22px',
            }}>
              <div style={{ fontSize: 11.5, color: T.mut, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 14 }}>
                Yeni Site Ekle
              </div>

              {!scanning ? (
                <>
                  <p style={{ color: T.mut, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>
                    Sitedeki yeni etkinlik, yarışma ve stajlar otomatik taranıp akışınıza düşer; profilinize göre puanlanır.
                  </p>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && go()}
                    placeholder="ör. coderspace.io/etkinlikler"
                    autoFocus
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '12px 14px',
                      borderRadius: 10, border: `1px solid ${T.line}`, fontSize: 14,
                      marginBottom: 10, outline: 'none', background: T.paper,
                      transition: 'border-color .2s, box-shadow .2s',
                    }}
                  />
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    {['techcareer.net', 'topluluk.dev', 'univerlist.com'].map((s) => (
                      <button key={s} onClick={() => setUrl(s)} className="press" style={{
                        padding: '4px 11px', borderRadius: 14, fontSize: 11.5,
                        border: `1px solid ${T.line}`, background: T.paper, cursor: 'pointer', color: T.mut,
                      }}>{s}</button>
                    ))}
                  </div>
                  <button onClick={go} className="press" style={{
                    width: '100%', padding: '13px', borderRadius: 11, border: 'none',
                    background: T.violet, color: '#fff', cursor: 'pointer',
                    fontSize: 14, fontWeight: 700, fontFamily: T.disp,
                    boxShadow: `0 4px 14px ${T.violet}35`,
                  }}>
                    + Takibe Al
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
                  <div style={{
                    width: 40, height: 40, border: `3px solid ${T.line}`, borderTopColor: T.violet,
                    borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 16px',
                  }} />
                  <div style={{ fontSize: 14, fontWeight: 600, fontFamily: T.disp, animation: 'fadeIn .3s', marginBottom: 4 }} key={step}>{steps[step]}</div>
                  <div style={{ fontSize: 12, color: T.mut }}>{url}</div>
                </div>
              )}
            </div>

            {/* Bilgi Kutusu */}
            <div style={{ background: T.blueSoft, border: `1px solid ${T.blue}22`, borderRadius: 12, padding: '14px 16px', marginTop: 14 }}>
              <div style={{ fontSize: 12.5, color: T.blue, fontWeight: 600, lineHeight: 1.6 }}>
                💡 Takip ettiğiniz sitelerde yeni bir fırsat yayınlandığında akışınıza otomatik olarak düşer ve profilinize göre puanlanır.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
