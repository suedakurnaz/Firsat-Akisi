# 🚀 Fırsat Akışı

Öğrenciler ve genç profesyoneller için hackathon, yarışma, staj, etkinlik ve bootcamp fırsatlarını takip eden akıllı platform.

## ✨ Özellikler

- **Akıllı Eşleştirme**: Profilinize göre her fırsat için uyum yüzdesi hesaplanır
- **CV Tarama**: PDF/DOCX/TXT formatında CV yükleyin, yapay zekâ otomatik olarak yeteneklerinizi ve ilgi alanlarınızı çıkarsın
- **Takvim Görünümü**: Kaydedilen fırsatları takvimde takip edin
- **Kaynak Takibi**: Farklı platformlardan fırsatları tek yerden izleyin
- **Gelişmiş Filtreleme**: Tür, arama ve sıralama ile fırsatları keşfedin

## 🛠️ Teknoloji

- **React 18** — Arayüz
- **Vite** — Geliştirme ortamı ve build
- **mammoth** — DOCX dosya okuma
- **PDF.js** — PDF metin çıkarma (CDN)

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── main.jsx                  # React DOM render
├── App.jsx                   # Ana uygulama bileşeni
├── index.css                 # Global stiller ve animasyonlar
├── constants/
│   ├── theme.js              # Renk paleti, fontlar, tip görselleri
│   ├── data.js               # Başlangıç verileri
│   └── dictionaries.js       # CV analiz sözlükleri
├── utils/
│   ├── helpers.js            # Tarih, format, ID yardımcıları
│   ├── matching.js           # Uyum skoru hesaplama
│   ├── storage.js            # LocalStorage yönetimi
│   └── cv.js                 # CV okuma ve analiz
└── components/
    ├── Ring.jsx              # SVG uyum halkası
    ├── Toasts.jsx            # Toast bildirimleri
    ├── Feed.jsx              # Ana akış sayfası
    ├── FeedCard.jsx          # Fırsat kartı
    ├── CalendarPage.jsx      # Takvim sayfası
    ├── ProfilePage.jsx       # Profil sayfası
    ├── DetailModal.jsx       # Fırsat detay modalı
    ├── LinksModal.jsx        # Linklerim modalı
    └── AddModal.jsx          # Link ekleme modalı
```

## 📄 Lisans

MIT
# Firsat-Akisi
