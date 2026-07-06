import React, { useState } from 'react';
import { T } from '../constants/theme';
import { trLower } from '../utils/helpers';
import { scanCV } from '../utils/cv';
import Ring from './Ring';

/* ═══════════ Profil Sayfası ═══════════ */
export default function ProfilePage({ profile, setProfile, toast }) {
  const [skillIn, setSkillIn] = useState('');
  const [intIn, setIntIn] = useState('');
  const [scanStage, setScanStage] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [review, setReview] = useState(null);
  const set = (k, v) => setProfile({ ...profile, [k]: v });

  const fields = [profile.name, profile.title, profile.about, profile.edu];
  const done = fields.filter((f) => f.trim()).length + (profile.skills.length ? 1 : 0) + (profile.interests.length ? 1 : 0);
  const completeness = Math.round((done / 6) * 100);

  const addChip = (k, val, setVal) => {
    const v = val.trim();
    if (!v) return;
    if (profile[k].some((s) => trLower(s) === trLower(v))) { setVal(''); return; }
    set(k, [...profile[k], v]); setVal('');
  };

  const onCV = async (f) => {
    if (!f) return;
    setScanError(null); setReview(null);
    try {
      const res = await scanCV(f, setScanStage);
      setScanStage(null);
      const newSkills = (res.skills || []).filter((s) => !profile.skills.some((x) => trLower(x) === trLower(s)));
      const newInterests = (res.interests || []).filter((s) => !profile.interests.some((x) => trLower(x) === trLower(s)));
      setReview({ ...res, skills: newSkills, interests: newInterests, fileName: f.name });
    } catch (e) {
      setScanStage(null);
      setScanError(e.message || 'CV taranamadı.');
    }
  };

  const applyReview = () => {
    setProfile({
      ...profile,
      cvName: review.fileName,
      name: profile.name.trim() || review.name || profile.name,
      title: profile.title.trim() || review.title || profile.title,
      about: profile.about.trim() || review.about || profile.about,
      edu: profile.edu.trim() || review.edu || profile.edu,
      skills: [...profile.skills, ...review.skills],
      interests: [...profile.interests, ...review.interests],
    });
    toast(`CV işlendi — ${review.skills.length} yetenek, ${review.interests.length} ilgi alanı eklendi`, '📄');
    setReview(null);
  };

  const input = {
    width: '100%', boxSizing: 'border-box', padding: '10px 13px', borderRadius: 10,
    border: `1px solid ${T.line}`, fontSize: 13.5, outline: 'none',
    transition: 'border-color .2s, box-shadow .2s', background: '#fff',
  };
  const lab = {
    fontSize: 11.5, fontWeight: 700, color: T.mut, textTransform: 'uppercase',
    letterSpacing: '.6px', display: 'block', marginBottom: 6,
  };

  const ChipRow = ({ k, color, txtColor }) => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
      {profile[k].map((s) => (
        <span key={s} style={{
          padding: '5px 8px 5px 12px', borderRadius: 16, fontSize: 12.5, fontWeight: 500,
          background: color, color: txtColor, display: 'inline-flex', gap: 6, alignItems: 'center',
          animation: 'popIn .2s ease',
        }}>
          {s}
          <button onClick={() => set(k, profile[k].filter((x) => x !== s))} className="press" style={{
            border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, padding: 0,
            lineHeight: 1, color: 'inherit', opacity: .6,
          }}>×</button>
        </span>
      ))}
      {profile[k].length === 0 && <span style={{ fontSize: 12, color: T.mut, padding: '5px 0' }}>Henüz eklenmedi</span>}
    </div>
  );

  return (
    <div style={{ maxWidth: 660, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* CV yükleme */}
      <div style={{ background: T.card, border: `1.5px dashed ${T.blue}55`, borderRadius: 16, padding: 22 }}>
        {scanStage ? (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{
              width: 34, height: 34, border: `3px solid ${T.line}`, borderTopColor: T.blue,
              borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 12px',
            }} />
            <div style={{ fontFamily: T.disp, fontWeight: 600, fontSize: 14 }}>{scanStage}</div>
            <div style={{ fontSize: 12, color: T.mut, marginTop: 4 }}>PDF metni çıkarılıp yapay zekâ ile analiz ediliyor</div>
          </div>
        ) : review ? (
          <div style={{ animation: 'fadeUp .3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>📄</span>
              <div style={{ fontFamily: T.disp, fontWeight: 700, fontSize: 15 }}>CV analizi tamam — {review.fileName}</div>
            </div>
            <div style={{ fontSize: 12, color: review._method === 'ai' ? T.teal : T.amber, fontWeight: 600, marginBottom: 12 }}>
              {review._method === 'ai' ? '✓ Yapay zekâ ile detaylı analiz' : '⚡ Yerel analiz (AI erişilemedi — sözlük tabanlı)'}
            </div>
            {review.name && <div style={{ fontSize: 13, marginBottom: 3 }}><b>Ad:</b> {review.name}</div>}
            {review.title && <div style={{ fontSize: 13, marginBottom: 3 }}><b>Unvan:</b> {review.title}</div>}
            {review.edu && <div style={{ fontSize: 13, marginBottom: 10 }}><b>Eğitim:</b> {review.edu}</div>}
            <div style={{ ...lab, marginTop: 6 }}>Bulunan yetenekler ({review.skills.length})</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
              {review.skills.map((s) => <span key={s} style={{ padding: '4px 11px', borderRadius: 14, fontSize: 12, background: T.blueSoft, color: T.blue, fontWeight: 500 }}>{s}</span>)}
              {review.skills.length === 0 && <span style={{ fontSize: 12, color: T.mut }}>Yeni yetenek bulunamadı</span>}
            </div>
            <div style={lab}>Çıkarılan ilgi alanları ({review.interests.length})</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
              {review.interests.map((s) => <span key={s} style={{ padding: '4px 11px', borderRadius: 14, fontSize: 12, background: T.tealSoft, color: T.teal, fontWeight: 500 }}>{s}</span>)}
              {review.interests.length === 0 && <span style={{ fontSize: 12, color: T.mut }}>Yeni ilgi alanı bulunamadı</span>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setReview(null)} className="press" style={{
                padding: '10px 18px', borderRadius: 10, border: `1px solid ${T.line}`,
                background: 'transparent', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              }}>Vazgeç</button>
              <button onClick={applyReview} className="press" style={{
                flex: 1, padding: '10px 18px', borderRadius: 10, border: 'none',
                background: T.teal, color: '#fff', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, fontFamily: T.disp,
              }}>
                ✓ Profile aktar — skorlar güncellensin
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: T.disp, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
              {profile.cvName ? `📄 ${profile.cvName}` : 'CV yükle, profil saniyeler içinde dolsun'}
            </div>
            <p style={{ fontSize: 12.5, color: T.mut, margin: '0 0 14px', lineHeight: 1.5 }}>
              PDF / DOCX / TXT desteklenir. Metin çıkarılır, yapay zekâ yetenek ve ilgi alanlarını detaylıca ayrıştırır; siz onaylayınca profile eklenir. Ücretsizdir.
            </p>
            {scanError && <p style={{ fontSize: 12.5, color: T.red, margin: '0 0 12px', fontWeight: 600 }}>⚠ {scanError}</p>}
            <label className="press" style={{
              display: 'inline-block', padding: '10px 22px', borderRadius: 10,
              background: T.blue, color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: T.disp,
            }}>
              {profile.cvName ? 'Yeni CV yükle' : 'CV seç ve tara'}
              <input type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={(e) => { onCV(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
          </div>
        )}
      </div>

      <div style={{
        background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Ring pct={completeness} size={56} />
        <div>
          <div style={{ fontFamily: T.disp, fontWeight: 600, fontSize: 15 }}>Profil tamamlanma</div>
          <div style={{ fontSize: 12.5, color: T.mut }}>
            {completeness === 100 ? 'Harika! Uyum skorlarınız en isabetli halinde.' : 'Profil doldukça akıştaki uyum yüzdeleri isabetli hale gelir.'}
          </div>
        </div>
      </div>

      <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: 24 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${T.blue}, ${T.violet})`,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.disp, fontSize: 24, fontWeight: 700, flexShrink: 0,
          }}>
            {(profile.name.trim() || '?').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input value={profile.name} onChange={(e) => set('name', e.target.value)} placeholder="Adınız Soyadınız"
              style={{ ...input, fontFamily: T.disp, fontSize: 17, fontWeight: 600 }} />
            <input value={profile.title} onChange={(e) => set('title', e.target.value)} placeholder="Unvan / bölüm" style={input} />
          </div>
        </div>

        <label style={lab}>Hakkımda</label>
        <textarea value={profile.about} onChange={(e) => set('about', e.target.value)} rows={3}
          placeholder="Kendinizden ve hedeflerinizden bahsedin — buradaki anahtar kelimeler de uyum skoruna katılır."
          style={{ ...input, resize: 'vertical', marginBottom: 18, lineHeight: 1.5 }} />

        <label style={lab}>Eğitim</label>
        <input value={profile.edu} onChange={(e) => set('edu', e.target.value)} placeholder="Üniversite — Bölüm (yıllar)" style={{ ...input, marginBottom: 18 }} />

        <label style={lab}>Yetenekler ({profile.skills.length})</label>
        <input value={skillIn} onChange={(e) => setSkillIn(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addChip('skills', skillIn, setSkillIn)}
          placeholder="Yaz ve Enter'a bas — ör. React, RAG, prompt mühendisliği…" style={input} />
        <ChipRow k="skills" color={T.blueSoft} txtColor={T.blue} />

        <div style={{ height: 18 }} />
        <label style={lab}>İlgi alanları ({profile.interests.length})</label>
        <input value={intIn} onChange={(e) => setIntIn(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addChip('interests', intIn, setIntIn)}
          placeholder="ör. yapay zekâ, girişimcilik, hackathon…" style={input} />
        <ChipRow k="interests" color={T.tealSoft} txtColor={T.teal} />
      </div>

      <p style={{ fontSize: 12.5, color: T.mut, textAlign: 'center', lineHeight: 1.6 }}>
        Tüm bilgileriniz cihazınıza kaydedilir ve uygulamayı tekrar açtığınızda korunur.<br />
        Profildeki her değişiklik akıştaki uyum yüzdelerini anında yeniden hesaplar.
      </p>
    </div>
  );
}
