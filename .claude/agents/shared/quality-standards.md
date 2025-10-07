# Kalite Standartları ve Kontrol Listeleri

> **Kullanım:** Hem Baş Öğretmen hem Baş Mühendis bu standartlara uyar.

---

## 📝 İçerik Kalitesi (Baş Öğretmen)

### Zorunlu Kontroller

- [ ] **Frontmatter:** slug, title, order, type, estimatedMinutes, description mevcut
- [ ] **H1 Başlık:** Sayfa başlığı var
- [ ] **Öğrenme Hedefleri:** En az 3 hedef belirtilmiş
- [ ] **Minimum İçerik:** En az 3 paragraf veya 300 kelime
- [ ] **Günlük Örnek:** En az 1 somut, gerçek hayat örneği
- [ ] **Bileşen İşaretçileri:** [CALLOUT:...], [CODEBLOCK:...] vb. doğru formatlanmış

### Pedagojik Kontroller

- [ ] **Basit → Karmaşık:** İçerik basit kavramlarla başlıyor
- [ ] **Somut → Soyut:** Önce somut örnekler, sonra teorik kavramlar
- [ ] **Hedef Kitle Dili:** Lise 9 için lise dili, üniversite için akademik dil
- [ ] **Cümle Uzunluğu:** Ortalama max 20 kelime
- [ ] **Paragraf Uzunluğu:** Max 5 cümle
- [ ] **Teknik Terimler:** İlk kullanımda açıklanmış
- [ ] **Aktif Öğrenme:** En az 2 düşündürücü soru veya aktivite

### Bileşen Kullanımı

- [ ] **Callout:** 2-3 adet (info, warning, tip)
- [ ] **KeyConcepts:** En az 1 adet (4-6 kavram)
- [ ] **CodeBlock:** Kod içeren derslerde her sayfa min 1
- [ ] **StepGuide:** Adım adım işlemlerde kullanılmış
- [ ] **ComparisonTable:** Karşılaştırmalarda kullanılmış

### Erişilebilirlik

- [ ] **Alt Text:** Tüm görseller için açıklayıcı metin
- [ ] **Başlık Hiyerarşisi:** H1 → H2 → H3 sırası korunmuş
- [ ] **Liste Formatı:** Madde işaretli veya numaralı liste kullanılmış

---

## 💻 Kod Kalitesi (Baş Mühendis)

### TypeScript Strict Mode

```bash
# Komut
pnpm typecheck

# Beklenen
✅ 0 hata
```

**Zorunlu:**
- [ ] Tüm prop'lar için interface/type tanımı
- [ ] `any` kullanılmamış (unknown tercih edilmiş)
- [ ] Null/undefined check'leri yapılmış
- [ ] Generic type'lar doğru kullanılmış

### ESLint Kuralları

```bash
# Komut
pnpm lint

# Beklenen
✅ 0 uyarı, 0 hata
```

**Zorunlu:**
- [ ] Kullanılmayan import yok
- [ ] Kullanılmayan değişken yok
- [ ] Console.log silindi (development dışında)
- [ ] Tailwind sınıf sıralaması doğru

### Tailwind v4 Compliance

**✅ Kullan:**
- `ps-4`, `pe-4` (padding-inline-start/end)
- `ms-4`, `me-4` (margin-inline-start/end)
- `is-full`, `ie-auto` (inline-size)
- Design token'ları: `text-primary`, `bg-surface`

**❌ Kullanma:**
- `pl-4`, `pr-4` (fiziksel yönler)
- `ml-4`, `mr-4` (fiziksel yönler)
- Inline styles (mümkünse)
- `@apply` (TSX dosyalarında)

### Erişilebilirlik (WCAG 2.1 AA)

- [ ] **Semantic HTML:** article, section, nav kullanılmış
- [ ] **ARIA Labels:** Tüm etkileşimli elementlerde mevcut
- [ ] **Klavye Navigasyonu:** Tab, Enter, Space ile erişilebilir
- [ ] **Focus Indicator:** Focus görünür ve belirgin
- [ ] **Kontrast Oranı:** Min 4.5:1 (normal metin), 3:1 (büyük metin)

### Performans

- [ ] **Lazy Loading:** 3D bileşenler dynamic import ile yükleniyor
- [ ] **Code Splitting:** Büyük bileşenler ayrı chunk'larda
- [ ] **Image Optimization:** Next.js Image component kullanılmış
- [ ] **Bundle Size:** Sayfa başına < 200KB
- [ ] **useCallback/useMemo:** Gerektiği yerde kullanılmış

### Responsive Tasarım

**Breakpoint'ler:**
- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px
- `xl:` → 1280px

**Zorunlu:**
- [ ] Mobile-first yaklaşım
- [ ] Tüm breakpoint'lerde test edilmiş
- [ ] Touch-friendly (min 44x44px tıklanabilir alan)

### Dark Mode

- [ ] Tüm renkler CSS variables kullanıyor
- [ ] Dark mode'da kontrast yeterli
- [ ] Görseller dark mode'da uygun

---

## 🧪 Test Kriterleri

### Build Test

```bash
# Komut
pnpm build

# Beklenen
✅ Build successful
✅ No warnings
✅ Bundle size acceptable
```

### Lighthouse Skorları

**Minimum Kabul Edilebilir:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

### LCP (Largest Contentful Paint)

- **Hedef:** ≤ 1.8s
- **Maksimum:** ≤ 2.5s

### CLS (Cumulative Layout Shift)

- **Hedef:** ≤ 0.1
- **Maksimum:** ≤ 0.25

---

## ✅ Teslimat Checklist

### Her Sayfa Tamamlandığında

**İçerik:**
- [ ] Markdown dosyası oluşturuldu
- [ ] Frontmatter eksiksiz
- [ ] İçerik kalite kontrolünden geçti
- [ ] Pedagojik prensipler uygulandı

**Kod:**
- [ ] TSX dosyası oluşturuldu
- [ ] TypeScript 0 hata
- [ ] ESLint 0 uyarı
- [ ] Build başarılı
- [ ] Responsive test edildi
- [ ] Dark mode test edildi

**Entegrasyon:**
- [ ] Ders registry'e eklendi (src/lessons/index.ts)
- [ ] Navigation çalışıyor (prev/next)
- [ ] Quiz entegre edildi (varsa)
- [ ] Progress tracking çalışıyor

### Final Teslimat

- [ ] Tüm sayfalar tamamlandı
- [ ] metadata.json doğru
- [ ] Öğrenme hedefleri karşılandı
- [ ] Tüm testler geçti
- [ ] Dokümantasyon güncel
- [ ] README güncel (gerekirse)

---

## 🚨 Yaygın Hatalar ve Çözümler

### Hata: TypeScript "Property does not exist"

**Çözüm:**
1. Import'ları kontrol et
2. Type tanımlarını kontrol et
3. Props interface'ini kontrol et

### Hata: ESLint "React is defined but never used"

**Çözüm:**
```tsx
// ❌ Eski (React 17-)
import React from 'react';

// ✅ Yeni (React 18+)
// React import'a gerek yok, TSX otomatik
```

### Hata: "use client" eksik

**Çözüm:**
```tsx
// Client-side hooks/features kullanıyorsan:
'use client';

import { useState } from 'react';
// ...
```

### Hata: SSR - "window is not defined"

**Çözüm:**
```tsx
// 3D bileşenleri dynamic import:
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false
});
```

### Hata: Tailwind sınıfı çalışmıyor

**Çözüm:**
1. Tailwind v4 syntax kontrolü (ps/pe, ms/me)
2. Dev server restart (`Ctrl+C`, `pnpm dev`)
3. CSS variables kontrol (globals.css)

---

## 📊 Kalite Metrikleri

### Hedef Değerler

| Metrik | Hedef | Kritik |
|--------|-------|--------|
| TypeScript Errors | 0 | 0 |
| ESLint Warnings | 0 | ≤ 2 |
| Build Time | ≤ 30s | ≤ 60s |
| Bundle Size/Page | ≤ 150KB | ≤ 200KB |
| Lighthouse Perf | ≥ 90 | ≥ 80 |
| Accessibility | ≥ 95 | ≥ 90 |
| LCP | ≤ 1.8s | ≤ 2.5s |
| CLS | ≤ 0.1 | ≤ 0.25 |

### İçerik Metrikleri

| Metrik | Hedef |
|--------|-------|
| Kelime/Sayfa | 300-600 |
| Paragraf Uzunluğu | 3-5 cümle |
| Cümle Uzunluğu | 15-20 kelime |
| Readability Score | 60-80 (Flesch) |
| Callout/Sayfa | 2-3 |
| Kod Örneği/Sayfa | 1-3 |

---

*Bu standartlar tüm Neosis projesi için geçerlidir.*
