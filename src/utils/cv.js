/* ═══════════ CV Tarama Sistemi ═══════════ */

import mammoth from 'mammoth';
import { SKILL_DICT, INTEREST_DICT } from '../constants/dictionaries';
import { trLower } from './helpers';

/* ── PDF.js CDN lazy yükleme ── */
let pdfjsPromise = null;

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsPromise) return pdfjsPromise;
  pdfjsPromise = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      res(window.pdfjsLib);
    };
    s.onerror = () => rej(new Error('pdf.js yüklenemedi'));
    document.head.appendChild(s);
  });
  return pdfjsPromise;
}

/* ── Dosya metin çıkarma ── */
async function extractFileText(file) {
  const name = file.name.toLowerCase();

  if (name.endsWith('.pdf')) {
    const pdfjs = await loadPdfJs();
    const buf = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: buf }).promise;
    let out = '';
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      out += tc.items.map((i) => i.str).join(' ') + '\n';
    }
    return out;
  }

  if (name.endsWith('.docx')) {
    const buf = await file.arrayBuffer();
    const r = await mammoth.extractRawText({ arrayBuffer: buf });
    return r.value;
  }

  return await file.text();
}

/* ── Yapay zekâ ile CV analizi ── */
async function analyzeWithAI(cvText) {
  const prompt = `Aşağıda bir CV'nin ham metni var. Bu CV'yi detaylı analiz et ve SADECE geçerli bir JSON nesnesi döndür. Markdown, açıklama, kod bloğu KULLANMA — yalnızca ham JSON.

JSON şeması:
{
  "name": "kişinin tam adı",
  "title": "tek satırlık profesyonel unvan/tanım",
  "about": "CV'den çıkan 2-3 cümlelik özet (Türkçe, birinci ağızdan)",
  "edu": "üniversite — bölüm (yıllar)",
  "skills": ["teknik yetenekler; kısa etiketler halinde, Türkçe küçük harf tercih et; teknoloji adları orijinal kalsın (React, Python gibi). Programlama dilleri, framework'ler, araçlar, metodolojiler, AI/veri yetkinlikleri dahil. 15-30 adet, detaylı ol"],
  "interests": ["CV'deki deneyim, proje, sertifika ve topluluklardan ÇIKARIM yaparak ilgi alanları: örn. yapay zekâ, girişimcilik, hackathon, proje yönetimi, topluluk liderliği, ux tasarım... 6-12 adet"]
}

Kurallar:
- skills listesi geniş ve somut olsun: "LLM API entegrasyonu", "rag", "prompt mühendisliği", "web scraping" gibi çok kelimeli yetkinlikler ayrı etiket olabilir.
- interests, kişinin nelere BAŞVURMAK isteyeceğini yansıtsın (yarışma/etkinlik eşleştirmesi için kullanılacak).
- Bilgi yoksa alanı boş string veya boş dizi yap. Uydurma.

CV METNİ:
${cvText.slice(0, 14000)}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error('API hatası');

  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n');
  const clean = text.replace(/```json|```/g, '').trim();
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  return JSON.parse(clean.slice(start, end + 1));
}

/* ── Yerel (fallback) analiz ── */
function localExtract(text) {
  const t = trLower(text);
  const pick = (dict) => {
    const out = [];
    dict.forEach(([k, v]) => {
      if (t.includes(k) && !out.includes(v)) out.push(v);
    });
    return out;
  };

  const nameGuess = text.trim().split('\n')[0]?.trim().split(/\s{2,}|·|\|/)[0]?.slice(0, 40) || '';

  return {
    name:
      /^[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(\s[A-ZÇĞİÖŞÜ][A-Za-zçğıöşüÇĞİÖŞÜ]+)+$/.test(nameGuess) ||
      nameGuess === nameGuess.toUpperCase()
        ? nameGuess
        : '',
    title: '',
    about: '',
    edu: '',
    skills: pick(SKILL_DICT),
    interests: pick(INTEREST_DICT),
  };
}

/* ── Ana CV tarama fonksiyonu ── */
export async function scanCV(file, onStage) {
  onStage('Dosya okunuyor…');
  const text = await extractFileText(file);

  if (!text || text.trim().length < 40) {
    throw new Error('Dosyadan metin çıkarılamadı. Taranmış (görüntü) PDF olabilir.');
  }

  onStage('Yapay zekâ CV\'nizi analiz ediyor…');
  try {
    const ai = await analyzeWithAI(text);
    return { ...ai, _method: 'ai' };
  } catch {
    onStage('Yerel analiz yapılıyor…');
    return { ...localExtract(text), _method: 'local' };
  }
}
