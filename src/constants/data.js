/* ═══════════ Başlangıç Verileri ═══════════ */

export const SEED_SOURCES = [
  { id: 1, name: 'Coderspace', url: 'coderspace.io', color: '#3B5BDB' },
  { id: 2, name: 'Youthall', url: 'youthall.com', color: '#0CA678' },
  { id: 3, name: 'Kariyer.net', url: 'kariyer.net/etkinlik', color: '#E8930C' },
];

export const SEED_ITEMS = [
  { id: 1, src: 1, type: 'Hackathon', title: 'FinTech Hackathon 2026', desc: '48 saatlik finans teknolojileri hackathonu. React, Node.js ve API geliştirme üzerine takım yarışması. Ödül havuzu 250.000₺.', tags: ['react', 'javascript', 'api', 'fintech', 'yazılım', 'takım çalışması', 'hackathon'], date: '2026-07-18', end: '2026-07-19', deadline: '2026-07-12', mins: 12, online: false, city: 'İstanbul' },
  { id: 2, src: 2, type: 'Staj', title: 'Yaz Dönemi UX Tasarım Stajı', desc: 'Ürün ekibi içinde kullanıcı araştırması ve arayüz tasarımı odaklı 8 haftalık staj programı. Figma deneyimi beklenir.', tags: ['ux', 'tasarım', 'figma', 'kullanıcı araştırması', 'arayüz'], date: '2026-08-03', end: '2026-09-25', deadline: '2026-07-20', mins: 47, online: false, city: 'Ankara' },
  { id: 3, src: 1, type: 'Yarışma', title: 'Veri Bilimi Tahmin Yarışması', desc: "Türkiye e-ticaret verisiyle talep tahmini modeli geliştirme yarışması. Python, pandas ve makine öğrenmesi gerektirir.", tags: ['python', 'veri bilimi', 'makine öğrenmesi', 'pandas', 'veri analizi'], date: '2026-07-25', end: '2026-08-08', deadline: '2026-07-22', mins: 180, online: true },
  { id: 4, src: 3, type: 'Etkinlik', title: 'Genç Yetenek Kariyer Zirvesi', desc: 'Teknoloji şirketleriyle birebir görüşme, CV atölyesi ve networking oturumları. Tüm bölümlere açık, katılım ücretsiz.', tags: ['kariyer', 'networking', 'iletişim'], date: '2026-07-09', end: null, deadline: '2026-07-08', mins: 320, online: false, city: 'İstanbul' },
  { id: 5, src: 2, type: 'Program', title: 'Girişimcilik Hızlandırma Programı', desc: 'Erken aşama fikirler için 6 haftalık mentorluk ve ön kuluçka programı. İş modeli, sunum ve pazarlama eğitimleri.', tags: ['girişimcilik', 'pazarlama', 'sunum', 'iş geliştirme', 'proje yönetimi', 'startup'], date: '2026-08-10', end: '2026-09-21', deadline: '2026-07-30', mins: 520, online: true },
  { id: 6, src: 1, type: 'Bootcamp', title: 'Frontend Bootcamp — React & TypeScript', desc: 'Başarılı katılımcılara partner şirketlerde işe alım süreci önceliği.', tags: ['react', 'typescript', 'frontend', 'javascript', 'css', 'arayüz'], date: '2026-07-27', end: '2026-09-07', deadline: '2026-07-15', mins: 95, online: true },
  { id: 7, src: 3, type: 'Yarışma', title: 'Mobil Uygulama Fikir Maratonu', desc: 'Sosyal fayda odaklı mobil uygulama fikirleri yarışması. Prototip zorunlu değil; sunum ve fikir değerlendirilir.', tags: ['mobil', 'tasarım', 'sunum', 'sosyal fayda', 'girişimcilik', 'mvp'], date: '2026-08-15', end: '2026-08-16', deadline: '2026-08-01', mins: 1600, online: true },
  { id: 8, src: 2, type: 'Etkinlik', title: 'Yapay Zekâ Günleri', desc: "LLM'ler, üretken yapay zekâ ve sektör uygulamaları üzerine iki günlük konferans. Öğrencilere ücretsiz.", tags: ['yapay zekâ', 'llm', 'makine öğrenmesi', 'python', 'yazılım'], date: '2026-07-16', end: '2026-07-17', deadline: '2026-07-14', mins: 2900, online: false, city: 'İzmir' },
  { id: 9, src: 1, type: 'Hackathon', title: 'AI Agent Hackathonu', desc: 'Otonom ajan sistemleri ve LLM API entegrasyonlarıyla gerçek problem çözen ürünler geliştirme yarışması. RAG ve prompt mühendisliği bilgisi avantaj.', tags: ['yapay zekâ', 'llm', 'agent', 'rag', 'prompt mühendisliği', 'api', 'python'], date: '2026-07-31', end: '2026-08-02', deadline: '2026-07-19', mins: 30, online: true },
];

export const DISCOVER_POOL = [
  { type: 'Hackathon', title: 'Sürdürülebilirlik Hackathonu', desc: 'İklim ve enerji verimliliği temalı 36 saatlik hackathon. Jüri önünde demo sunumu yapılır.', tags: ['yazılım', 'sürdürülebilirlik', 'takım çalışması', 'sunum', 'hackathon'], date: '2026-08-08', end: '2026-08-09', deadline: '2026-07-28', online: false, city: 'İstanbul' },
  { type: 'Staj', title: 'Backend Geliştirme Stajı', desc: 'Mikroservis mimarisi üzerinde çalışan ekipte Node.js ve SQL odaklı uzun dönem staj.', tags: ['node', 'sql', 'backend', 'javascript', 'yazılım', 'api'], date: '2026-09-01', end: '2026-12-18', deadline: '2026-08-05', online: false, city: 'Ankara' },
  { type: 'Yarışma', title: 'Siber Güvenlik CTF Turnuvası', desc: 'Bireysel veya takım halinde katılabileceğiniz bayrak yakalama yarışması. Başlangıç seviyesine uygun kategoriler mevcut.', tags: ['siber güvenlik', 'yazılım', 'linux', 'python'], date: '2026-08-20', end: '2026-08-21', deadline: '2026-08-12', online: true },
  { type: 'Etkinlik', title: 'Ürün Yönetimi Buluşması', desc: 'Ürün yöneticileriyle vaka çalışması ve soru-cevap oturumu. Kontenjan sınırlı.', tags: ['ürün yönetimi', 'kariyer', 'iletişim', 'iş geliştirme', 'proje yönetimi'], date: '2026-07-23', end: null, deadline: '2026-07-21', online: true },
];

export const DEFAULT_PROFILE = {
  name: '',
  title: '',
  about: '',
  edu: '',
  cvName: null,
  skills: [],
  interests: [],
};
