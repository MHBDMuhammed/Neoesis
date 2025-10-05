# Neosis App - AI İçin İşletim Kılavuzu

> Bu dizin, Neosis'in AI tarafından yönetilen Next.js uygulamasıdır.

## 📋 AI İçin Talimatlar

Bu uygulama **AI personaları tarafından otomatik olarak yönetilir**. Lütfen şu dosyaları okuyun:

### 🔴 Öncelikli Oku (Sırayla)
1. **[CLAUDE.md](./CLAUDE.md)** - Detaylı AI işletim kılavuzu
2. **[README-TEMPLATE.md](./README-TEMPLATE.md)** - Template teknik dokümantasyonu

### 📁 Dizin Yapısı

```
app/
├── src/                  # Kaynak kodlar
│   ├── app/             # Next.js App Router
│   ├── components/      # React bileşenleri
│   ├── lessons/         # Ders içerikleri (TSX)
│   ├── lib/             # Utilities
│   └── contracts/       # Zod schemas
├── scripts/             # Build ve otomasyon
├── public/              # Statik dosyalar
└── CLAUDE.md           # AI KILAVUZU - BURADAN BAŞLA
```

## 🤖 AI Workflow Komutları

```bash
# Yeni ders oluştur
pnpm gen:lesson

# Marka özelleştir
pnpm customize:brand

# Ders sırasını düzenle
pnpm reorder:lessons

# Tüm kalite kontrolleri
pnpm audit:all
```

## ⚠️ Önemli Kurallar

### ✅ Güvenli Alanlar (AI:SAFE-EDIT)
- `src/lessons/**/*.tsx` (içerik bölümleri)
- `src/lib/design-tokens.ts`
- `src/lib/animation-presets.ts`
- `src/lib/grid-presets.ts`
- `src/components/home/Hero.tsx` (marked sections)

### ❌ Korumalı Alanlar (AI:PROTECTED)
- `src/lessons/index.ts` (otomasyon tarafından yönetilir)
- `src/lib/curriculum.ts`
- `src/contracts/*.schema.ts`
- `src/lib/progress-store.ts`

## 🔄 Workflow Döngüsü

```
1. İçerik Araştır → /docs/[konu]/*.md
2. TSX Oluştur → /src/lessons/*.tsx
3. Test Et → pnpm lint && pnpm typecheck
4. Hata Varsa → Düzelt ve tekrarla
5. Başarılı → Sonraki sayfaya geç
```

## 📚 Daha Fazla Bilgi

**Tüm detaylar için [CLAUDE.md](./CLAUDE.md) dosyasını okuyun.**

---

*Bu README sadece AI referansı içindir. Kullanıcı dokümantasyonu için kök dizindeki README.md'ye bakın.*
