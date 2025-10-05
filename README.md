# Neosis - AI Destekli Otonom Eğitim Tasarımcısı

> Herhangi bir konu için pedagojik olarak en uygun, interaktif ve kişiselleştirilmiş eğitim materyallerini otonom olarak üreten AI sistemi

## 🎯 Neosis Nedir?

Neosis, **statik şablonları dolduran bir sistem değildir**. Her eğitim materyalini, belirli bir konunun gerektirdiği en iyi öğretim metodolojisine göre **sıfırdan tasarlayan ve kodlayan** bir dijital proje ekibi gibi çalışır.

### Temel Felsefe

- **Pedagojik Öncelik**: Her konu için en uygun öğretim metodolojisi seçilir
- **Dinamik Tasarım**: Şablonlar değil, her sayfaya özel tasarım
- **Kalite Odaklı**: Otomatik kod kontrolü ve hata düzeltme
- **Esneklik**: 3D animasyonlardan quiz'lere kadar geniş araç yelpazesi

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 20.x veya üstü
- pnpm 9.x veya üstü
- Git

### Kurulum

```bash
# Projeyi klonla
git clone <repo-url>
cd Neoesis

# App dizinine geç
cd app

# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
Neoesis/
├── app/                    # Ana Next.js uygulaması
│   ├── src/
│   │   ├── app/           # Next.js App Router sayfaları
│   │   ├── components/    # React bileşenleri
│   │   ├── lessons/       # Ders içerikleri (TSX)
│   │   ├── lib/           # Utilities ve konfigürasyonlar
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript tipleri
│   │   └── contracts/     # Zod validation şemaları
│   ├── scripts/           # Yardımcı scriptler
│   └── public/            # Statik dosyalar
└── README.md              # Bu dosya
```

## 🤖 AI Workflow - 5 Aşamalı Süreç

### 1️⃣ Başlatma ve Brifing
Kullanıcı konuyu ve hedef kitleyi belirtir:
```
Konu: "Mitoz Bölünme"
Hedef Kitle: "Lise 9. Sınıf Biyoloji"
```

### 2️⃣ Pedagojik Planlama
**Baş Öğretmen** (AI Persona):
- Konuyu analiz eder (görsel mi, kavramsal mı, tarihsel mi?)
- Güvenilir kaynaklardan bilgi toplar
- En etkili öğretim akışını tasarlar
- Sayfa yapısını ve interaktif bileşenleri planlar

**Çıktı**: Site Planı Özeti (JSON)

### 3️⃣ Genel Tasarım ve Kişiselleştirme
**Baş Mühendis** (AI Persona):
- Marka renkleri ve tema ayarları
- Logo ve genel tasarım
- Landing page ve navigasyon yapısı

### 4️⃣ Aşamalı Sayfa Üretimi
Her sayfa için döngüsel süreç:

```
1. İçerik Üretimi → Markdown dosyası oluştur
2. Kod Üretimi → TSX sayfası yaz
3. Kalite Kontrolü → lint + typecheck
4. Hata Varsa → Düzelt ve tekrar kontrol
5. İlerleme Bildirimi → Kullanıcıya bildir
```

### 5️⃣ Teslimat
- Son kontroller (audit:all)
- Proje teslimi
- `pnpm dev` ile başlatma talimatı

## 🛠️ Teknoloji Stack

### Core
- **Next.js 15.5.4** - React framework (App Router)
- **React 19** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS v4** - Utility-first CSS

### UI & Animasyon
- **shadcn/ui** - Komponent kütüphanesi
- **Framer Motion** - 2D animasyonlar
- **React Three Fiber** - 3D animasyonlar (R3F + Drei)
- **Lucide React** - İkon seti

### State & Data
- **Zustand** - State management + localStorage
- **Zod** - Schema validation
- **Fuse.js** - Fuzzy search

### Testing & Quality
- **Playwright** - E2E testler
- **Vitest** - Unit testler
- **Axe** - Accessibility testleri
- **Lighthouse CI** - Performance

## 🎨 Özellikler

### ✨ AI Destekli İçerik Üretimi
- Konu analizi ve pedagojik planlama
- Otomatik sayfa oluşturma
- Dinamik bileşen seçimi

### 🎬 Zengin İnteraktif Bileşenler
- **3D Animasyonlar**: React Three Fiber ile
- **2D Animasyonlar**: Framer Motion ile
- **Quiz Sistemi**: 3 denemeli testler
- **İlerleme Takibi**: Gerçek zamanlı progress

### 🎯 Kişiselleştirme
- Marka renkleri (OKLCH color space)
- Custom logo ve tema
- Animasyon preset'leri
- Grid layout şablonları

### ⚡ Performans & Kalite
- LCP < 1.8s (Lighthouse Mobile)
- Bundle size ≤ 200KB/route
- WCAG 2.1 AA uyumlu
- TypeScript strict mode

## 📚 Komutlar

### Geliştirme
```bash
cd app

pnpm dev              # Dev sunucusu başlat
pnpm build            # Production build
pnpm start            # Production sunucusu
pnpm lint             # ESLint kontrolü
pnpm typecheck        # TypeScript kontrolü
```

### Testing
```bash
pnpm test             # Unit testler
pnpm test:e2e         # E2E testler (headless)
pnpm test:e2e:ui      # E2E testler (UI)
pnpm audit:all        # Tüm kalite kontrolleri
pnpm audit:a11y       # Accessibility testi
pnpm audit:tw4        # Tailwind v4 uyumluluk
```

### Ders Yönetimi
```bash
pnpm gen:lesson       # Yeni ders oluştur
pnpm reorder:lessons  # Ders sırasını düzenle
pnpm customize:brand  # Marka özelleştir
```

## 🎓 Kullanım Senaryosu

### Örnek: "Mitoz Bölünme" Dersi

1. **Başlat**
```bash
pnpm neosis:start
```

2. **Bilgileri Gir**
```
Konu: Mitoz Bölünme
Hedef: Lise 9. Sınıf
```

3. **AI Planı Oluşturur**
```json
{
  "pages": [
    { "title": "Giriş", "type": "text" },
    { "title": "Evreler", "type": "3d-animation" },
    { "title": "Test", "type": "quiz" }
  ]
}
```

4. **Onayla ve İzle**
AI otomatik olarak:
- İçerikleri araştırır
- Sayfaları kodlar
- Testleri geçirir
- Teslim eder

## 🔒 Kalite Standartları

Her üretilen sayfa şunları geçmeli:
- ✅ TypeScript strict mode (0 hata)
- ✅ ESLint (0 ihlal)
- ✅ Tailwind v4 compliance
- ✅ Accessibility (0 Axe ihlali)
- ✅ Performance (LCP ≤1.8s)
- ✅ Bundle size (≤200KB)

## 📖 Dokümantasyon

- **CLAUDE.md** (app/) - AI için detaylı işletim kılavuzu
- **README-TEMPLATE.md** (app/) - Template kullanım kılavuzu

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

## 📝 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- Next.js Team - Harika framework
- Vercel - Hosting ve deployment
- shadcn - Mükemmel UI komponentleri
- React Three Fiber - 3D için

---

**Neosis ile öğrenme deneyimini AI ile yeniden tasarlayın** 🚀

### İletişim

- 🌐 Website: [neoesis.dev](#)
- 📧 Email: hello@neoesis.dev
- 🐦 Twitter: [@neoesis](#)
- 💬 Discord: [Join our community](#)
