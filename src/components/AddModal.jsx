import React, { useState, useEffect } from 'react';
import { T } from '../constants/theme';

/* ═══════════ Link Ekleme Modalı ═══════════ */
export default function AddModal({ onClose, onAdd }) {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ['Sayfa taranıyor…', 'Etkinlikler ayrıştırılıyor…', 'Akışa ekleniyor…'];

  useEffect(() => {
    if (!scanning) return;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, 2)), 480);
    return () => clearInterval(t);
  }, [scanning]);

  const go = () => {
    if (!url.trim() || scanning) return;
    setScanning(true);
    onAdd(url.trim(), onClose);
  };

  return (
    <div onClick={() => !scanning && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(23,26,33,.5)', zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn .2s',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.card, borderRadius: 18, padding: 28, width: '100%', maxWidth: 440,
        animation: 'popIn .28s cubic-bezier(.22,1,.36,1)',
      }}>
        <h3 style={{ fontFamily: T.disp, fontSize: 20, margin: '0 0 6px' }}>Takip edilecek site ekle</h3>
        <p style={{ color: T.mut, fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
          Sitedeki yeni etkinlik, yarışma ve stajlar otomatik taranıp akışınıza düşer; profilinize göre puanlanır.
        </p>
        {!scanning ? (
          <>
            <input value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && go()}
              placeholder="ör. coderspace.io/etkinlikler" autoFocus
              style={{
                width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 10,
                border: `1px solid ${T.line}`, fontSize: 14, marginBottom: 8, outline: 'none',
                transition: 'border-color .2s, box-shadow .2s',
              }} />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {['techcareer.net', 'topluluk.dev', 'univerlist.com'].map((s) => (
                <button key={s} onClick={() => setUrl(s)} className="press" style={{
                  padding: '4px 11px', borderRadius: 14, fontSize: 11.5,
                  border: `1px solid ${T.line}`, background: T.paper, cursor: 'pointer', color: T.mut,
                }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={onClose} className="press" style={{
                padding: '10px 18px', borderRadius: 10, border: `1px solid ${T.line}`,
                background: 'transparent', cursor: 'pointer', fontSize: 13.5, fontWeight: 500,
              }}>Vazgeç</button>
              <button onClick={go} className="press" style={{
                padding: '10px 20px', borderRadius: 10, border: 'none', background: T.blue,
                color: '#fff', cursor: 'pointer', fontSize: 13.5, fontWeight: 600, fontFamily: T.disp,
              }}>Takibe al</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0 6px' }}>
            <div style={{
              width: 36, height: 36, border: `3px solid ${T.line}`, borderTopColor: T.blue,
              borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 14px',
            }} />
            <div style={{ fontSize: 14, fontWeight: 600, fontFamily: T.disp, animation: 'fadeIn .3s' }} key={step}>{steps[step]}</div>
            <div style={{ fontSize: 12, color: T.mut, marginTop: 4 }}>{url}</div>
          </div>
        )}
      </div>
    </div>
  );
}
