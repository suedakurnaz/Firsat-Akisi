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
  /* Hackathonlar */
  { type: 'Hackathon', title: 'Sürdürülebilirlik Hackathonu', desc: 'İklim ve enerji verimliliği temalı 36 saatlik hackathon. Jüri önünde demo sunumu yapılır. Ödül havuzu 150.000₺.', tags: ['yazılım', 'sürdürülebilirlik', 'takım çalışması', 'sunum', 'hackathon'], date: '2026-08-08', end: '2026-08-09', deadline: '2026-07-28', online: false, city: 'İstanbul' },
  { type: 'Hackathon', title: 'Sağlık Teknolojileri Hackathonu', desc: 'Dijital sağlık çözümleri geliştirme yarışması. Doktor-mühendis takımları tercih edilir, tıp öğrencilerine açık.', tags: ['sağlık', 'yazılım', 'yapay zekâ', 'api', 'takım çalışması'], date: '2026-08-22', end: '2026-08-23', deadline: '2026-08-10', online: true },
  { type: 'Hackathon', title: 'Web3 & Blockchain Hackathonu', desc: 'DeFi, NFT ve akıllı kontrat geliştirme odaklı hackathon. Solidity ve Rust bilgisi avantaj sağlar.', tags: ['blockchain', 'web3', 'solidity', 'yazılım', 'javascript'], date: '2026-09-05', end: '2026-09-06', deadline: '2026-08-25', online: true },

  /* Stajlar */
  { type: 'Staj', title: 'Backend Geliştirme Stajı', desc: 'Mikroservis mimarisi üzerinde çalışan ekipte Node.js ve SQL odaklı uzun dönem staj.', tags: ['node', 'sql', 'backend', 'javascript', 'yazılım', 'api'], date: '2026-09-01', end: '2026-12-18', deadline: '2026-08-05', online: false, city: 'Ankara' },
  { type: 'Staj', title: 'Yapay Zekâ Araştırma Stajı', desc: 'NLP ve bilgisayarlı görü üzerine araştırma geliştirme stajı. Akademik yayın fırsatı mevcut.', tags: ['yapay zekâ', 'python', 'makine öğrenmesi', 'nlp', 'araştırma'], date: '2026-09-15', end: '2027-01-15', deadline: '2026-08-15', online: false, city: 'İstanbul' },
  { type: 'Staj', title: 'Mobil Geliştirme Stajı (iOS/Android)', desc: 'React Native ile cross-platform mobil uygulama geliştirme stajı. 3 ay süreli, ücretli.', tags: ['mobil', 'react', 'javascript', 'ios', 'android', 'arayüz'], date: '2026-08-18', end: '2026-11-18', deadline: '2026-08-08', online: false, city: 'İzmir' },
  { type: 'Staj', title: 'Veri Mühendisliği Stajı', desc: 'Büyük veri altyapısı ve ETL süreçleri üzerine odaklanan staj programı. Spark ve Kafka deneyimi beklenir.', tags: ['veri bilimi', 'python', 'sql', 'veri analizi', 'yazılım'], date: '2026-09-08', end: '2026-12-08', deadline: '2026-08-20', online: false, city: 'İstanbul' },

  /* Yarışmalar */
  { type: 'Yarışma', title: 'Siber Güvenlik CTF Turnuvası', desc: 'Bireysel veya takım halinde katılabileceğiniz bayrak yakalama yarışması. Başlangıç seviyesine uygun kategoriler mevcut.', tags: ['siber güvenlik', 'yazılım', 'linux', 'python'], date: '2026-08-20', end: '2026-08-21', deadline: '2026-08-12', online: true },
  { type: 'Yarışma', title: 'Ulusal Yapay Zekâ Yarışması', desc: 'Türkiye geneli üniversite öğrencilerine açık yapay zekâ problem çözme yarışması. Bireysel katılım.', tags: ['yapay zekâ', 'python', 'makine öğrenmesi', 'veri bilimi'], date: '2026-08-28', end: '2026-09-28', deadline: '2026-08-18', online: true },
  { type: 'Yarışma', title: 'Algoritma ve Kodlama Olimpiyatı', desc: 'ICPC tarzı algoritma yarışması. C++, Java veya Python ile katılabilirsiniz. Üniversite takım yarışması.', tags: ['algoritma', 'yazılım', 'c++', 'java', 'python', 'hackathon'], date: '2026-09-12', end: '2026-09-12', deadline: '2026-09-01', online: false, city: 'Ankara' },

  /* Etkinlikler */
  { type: 'Etkinlik', title: 'Ürün Yönetimi Buluşması', desc: 'Ürün yöneticileriyle vaka çalışması ve soru-cevap oturumu. Kontenjan sınırlı.', tags: ['ürün yönetimi', 'kariyer', 'iletişim', 'iş geliştirme', 'proje yönetimi'], date: '2026-07-23', end: null, deadline: '2026-07-21', online: true },
  { type: 'Etkinlik', title: 'Teknoloji Kariyer Fuarı 2026', desc: '50\'den fazla teknoloji şirketiyle buluşma fırsatı. Staj ve tam zamanlı pozisyonlar için CV teslimi yapılabilir.', tags: ['kariyer', 'networking', 'iletişim', 'yazılım', 'tasarım'], date: '2026-08-14', end: '2026-08-15', deadline: '2026-08-07', online: false, city: 'İstanbul' },
  { type: 'Etkinlik', title: 'Open Source Summit Türkiye', desc: 'Açık kaynak katkı kültürü, topluluk oluşturma ve GitHub projeleri üzerine bir günlük summit etkinliği.', tags: ['açık kaynak', 'yazılım', 'javascript', 'python', 'iletişim'], date: '2026-08-30', end: null, deadline: '2026-08-22', online: true },

  /* Bootcamp & Programlar */
  { type: 'Bootcamp', title: 'Full Stack Bootcamp — Next.js & Node', desc: 'Yoğun 12 haftalık full stack geliştirme programı. Proje tabanlı öğrenme, mentor desteği ve iş garantisi.', tags: ['react', 'javascript', 'node', 'sql', 'frontend', 'backend', 'yazılım'], date: '2026-09-01', end: '2026-11-21', deadline: '2026-08-22', online: true },
  { type: 'Bootcamp', title: 'Siber Güvenlik Uzmanlaşma Programı', desc: 'Penetrasyon testi, ağ güvenliği ve etik hacking üzerine 8 haftalık yoğun eğitim programı.', tags: ['siber güvenlik', 'linux', 'python', 'yazılım', 'ağ'], date: '2026-08-25', end: '2026-10-17', deadline: '2026-08-15', online: true },
  { type: 'Program', title: 'Google Developer Student Club Yaz Programı', desc: 'Google teknolojileri (Cloud, ML, Android) üzerine 6 haftalık mentorluk programı. Üniversite öğrencilerine ücretsiz.', tags: ['yazılım', 'yapay zekâ', 'cloud', 'android', 'javascript', 'python'], date: '2026-08-04', end: '2026-09-12', deadline: '2026-07-27', online: true },
  { type: 'Program', title: 'Sosyal Girişimcilik Hızlandırma Programı', desc: 'Sosyal etki odaklı girişimler için 8 haftalık kuluçka ve mentorluk programı. Tohum fonlama fırsatı mevcut.', tags: ['girişimcilik', 'startup', 'sunum', 'iş geliştirme', 'pazarlama'], date: '2026-09-01', end: '2026-10-24', deadline: '2026-08-18', online: false, city: 'İstanbul' },
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
