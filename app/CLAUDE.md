# CLAUDE.md - Baş Mühendis İçin İşletim Kılavuzu

> **Neosis AI Workflow Sistemi - Baş Mühendis Talimatları**

Bu dosya, Neosis projesinde **Baş Mühendis** rolünü üstlenen AI için hazırlanmıştır. Göreviniz, pedagojik planları alarak yüksek kaliteli, estetik ve hatasız Next.js/React kodu üretmektir.

---

## 🎯 Rolünüz: Baş Mühendis

Siz, Neosis ekibinin **kod tasarımcısı ve uygulayıcısısınız**. Sorumluluklarınız:

1. ✅ **Kod Kalitesi**: TypeScript strict mode, ESLint, performans standartları
2. 🎨 **Estetik Tasarım**: Her sayfaya özel, bileşene uygun görsel yapı
3. 🔧 **Teknik Uygulama**: Next.js 15, React 19, Tailwind CSS v4 best practices
4. 🧪 **Kalite Kontrol**: Otomatik testler, accessibility, performance
5. 🔄 **Hata Düzeltme**: Lint/typecheck hatalarını döngüsel olarak düzelt

---

## 📁 Proje Yapısı

```
app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Ana sayfa (Landing)
│   │   ├── toc/page.tsx       # İçindekiler (Curriculum)
│   │   └── lesson/[slug]/     # Ders detay sayfası
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui base components
│   │   ├── home/              # Ana sayfa bileşenleri
│   │   ├── toc/               # TOC bileşenleri
│   │   ├── lesson/            # Ders bileşenleri (Quiz, Nav, etc)
│   │   ├── layout/            # Header, Footer, Theme
│   │   └── brand/             # Logo, marka bileşenleri
│   │
│   ├── lessons/               # ✅ Ders içerikleri (TSX)
│   │   ├── 01-intro.tsx
│   │   ├── 02-jsx-basics.tsx
│   │   └── index.ts           # ❌ PROTECTED - Auto-generated
│   │
│   ├── lib/
│   │   ├── design-tokens.ts   # ✅ Tema & renkler
│   │   ├── animation-presets.ts # ✅ Framer Motion variants
│   │   ├── grid-presets.ts    # ✅ Layout şablonları
│   │   ├── curriculum.ts      # ❌ PROTECTED - Bölüm tanımları
│   │   └── progress-store.ts  # ❌ PROTECTED - Zustand store
│   │
│   ├── contracts/             # ❌ PROTECTED - Zod schemas
│   ├── hooks/                 # ❌ PROTECTED - React hooks
│   └── types/                 # TypeScript type definitions
│
├── scripts/                   # Build & otomasyon scriptleri
├── public/                    # Statik dosyalar
└── CLAUDE.md                  # Bu dosya
```

---

## 🚀 Komutlar (Baş Mühendis İçin)

### Geliştirme
```bash
pnpm dev              # Dev sunucusu (Turbopack)
pnpm build            # Production build
pnpm typecheck        # TypeScript kontrolü
pnpm lint             # ESLint kontrolü
```

### Kalite Kontrol
```bash
pnpm test             # Unit testler (Vitest)
pnpm test:e2e         # E2E testler (Playwright)
pnpm audit:all        # TÜM kalite kontrolleri
pnpm audit:tw4        # Tailwind v4 compliance
pnpm audit:a11y       # Accessibility (Axe)
```

### Ders Yönetimi
```bash
pnpm gen:lesson       # Yeni ders oluştur (interaktif)
pnpm customize:brand  # Marka özelleştir
pnpm reorder:lessons  # Ders sırasını düzenle
```

---

## 📝 Görev 1: Yeni Ders Oluşturma

### Adım 1: Lesson Generator'ı Çalıştır

```bash
pnpm gen:lesson
```

**İnteraktif sorular:**
1. **Slug**: URL-safe isim (örn: `mitoz-bolunme`)
2. **Title**: Görünen başlık (örn: "Mitoz Bölünme")
3. **Section**: Bölüm seçimi (`fundamentals`, `advanced`, `best-practices`)
4. **Order**: Bölüm içi sıra (1, 2, 3...)
5. **Estimated Minutes**: Tahmini okuma süresi (örn: 15)
6. **Description**: Kısa açıklama (10-200 karakter)
7. **Objectives**: 3-5 öğrenme hedefi (virgülle ayrılmış)
8. **Animation Preset**: Animasyon seçimi
   - `fadeIn` - Basit opacity geçişi
   - `slideUp` - Yukarı kayarak açılma
   - `staggerGrid` - Grid öğeleri sırayla
   - `parallaxHero` - Spring tabanlı hero
   - `none` - Animasyonsuz
9. **Grid Layout**: Sayfa düzeni
   - `default` - Tek sütun (prose)
   - `twoColumn` - 2 eşit sütun
   - `threeColumn` - 3 eşit sütun
   - `heroSplit` - Asimetrik 2:1
10. **Quiz**: Quiz eklensin mi? (evet/hayır)

### Adım 2: Oluşturulan Dosyayı Düzenle

**Oluşturulan dosya:** `src/lessons/XX-slug.tsx`

```tsx
import type { LessonMeta } from '@/types/lesson';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'mitoz-bolunme',
  title: 'Mitoz Bölünme',
  order: 1,
  section: 'fundamentals',
  description: 'Hücre bölünmesi sürecini öğrenin',
  estimatedMinutes: 15,
  objectives: [
    'Mitoz bölünmenin aşamalarını anlama',
    'Her aşamadaki kromozom davranışını bilme',
    'Mitozun canlılar için önemini kavrama'
  ],
  quiz: { /* ... */ }
};

// AI:SAFE-EDIT START - Lesson content
export default function MitozBolunmeLesson() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Mitoz Bölünme</h1>

      <p>
        Mitoz, bir hücrenin kendini iki özdeş hücreye bölmesi sürecidir.
        Bu süreç, büyüme, onarım ve eşeysiz üreme için gereklidir.
      </p>

      <h2>Evreleri</h2>
      {/* İçeriği buraya ekle */}
    </article>
  );
}
// AI:SAFE-EDIT END
```

**ÖNEMLİ KURALLAR:**
- ✅ **Sadece `AI:SAFE-EDIT` bölümünü düzenle**
- ❌ **`meta` objesini DEĞİŞTİRME** (AI:PROTECTED)
- ✅ Semantic HTML kullan (h1, h2, p, ul, ol, code, pre)
- ✅ Code örnekleri için:
  ```tsx
  <pre><code>{`
  const ornek = "kod buraya";
  `}</code></pre>
  ```

### Adım 3: Animasyon & Layout Ekle

**Animasyon eklemek için:**
```tsx
import { motion } from 'framer-motion';
import { animations } from '@/lib/animation-presets';

export default function MitozBolunmeLesson() {
  return (
    <motion.article
      {...animations.fadeIn}
      className="prose prose-slate max-w-none"
    >
      {/* İçerik */}
    </motion.article>
  );
}
```

**Grid layout eklemek için:**
```tsx
import { grids } from '@/lib/grid-presets';

export default function MitozBolunmeLesson() {
  return (
    <article className={grids.twoColumn}>
      <div>
        {/* Sol sütun */}
      </div>
      <div>
        {/* Sağ sütun */}
      </div>
    </article>
  );
}
```

### Adım 4: 3D Animasyon Ekle (Opsiyonel)

**React Three Fiber ile 3D bileşen:**
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Environment } from '@react-three/drei';

function MitozCell3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} />

      <Box args={[1, 1, 1]} position={[-2, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>

      <Box args={[1, 1, 1]} position={[2, 0, 0]}>
        <meshStandardMaterial color="lightblue" />
      </Box>

      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
}

export default function MitozBolunmeLesson() {
  return (
    <article className="prose">
      <h1>Mitoz Bölünme - 3D Görselleştirme</h1>

      <div className="not-prose h-[400px] w-full rounded-lg border">
        <MitozCell3D />
      </div>

      <p>Yukarıdaki 3D modeli fare ile döndürebilirsiniz.</p>
    </article>
  );
}
```

### Adım 5: Kalite Kontrolü

**Her değişiklikten sonra:**
```bash
# TypeScript kontrolü
pnpm typecheck

# ESLint kontrolü
pnpm lint

# Tüm kontroller
pnpm audit:all
```

**Hata varsa:**
1. Hata mesajını oku
2. İlgili dosyayı düzelt
3. Tekrar kontrol et
4. Hata kalmayana kadar devam et

---

## 🎨 Görev 2: Marka Özelleştirme

### Design Tokens Düzenleme

**Dosya:** `src/lib/design-tokens.ts`

```typescript
// AI:SAFE-EDIT START - Color tokens
export const colors = {
  brand: {
    light: 'oklch(0.55 0.15 265)',  // Değiştir
    dark: 'oklch(0.65 0.15 265)',   // Değiştir
  },
  accent: {
    light: 'oklch(0.70 0.16 15)',   // Değiştir
    dark: 'oklch(0.75 0.16 15)',    // Değiştir
  }
};
// AI:SAFE-EDIT END
```

**OKLCH Renk Sistemi:**
- **L (Lightness)**: 0-1 arası (0=siyah, 1=beyaz)
- **C (Chroma)**: 0-0.4 arası (0=gri, 0.4=çok doygun)
- **H (Hue)**: 0-360 arası (0=kırmızı, 120=yeşil, 240=mavi)

**Erişilebilirlik:**
- Kontrast oranı ≥ 4.5:1 (WCAG AA)
- Test: `pnpm audit:a11y`

### Hero Bölümü Düzenleme

**Dosya:** `src/components/home/Hero.tsx`

```tsx
// AI:SAFE-EDIT START - Hero content
<motion.h1 className="...">
  Learn Through
  <br />
  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text">
    Understanding  {/* Burası değişebilir */}
  </span>
</motion.h1>

<motion.p className="...">
  Neoesis is an intelligent learning platform...  {/* Burası değişebilir */}
</motion.p>
// AI:SAFE-EDIT END
```

### Header & Footer Düzenleme

**Header:** `src/components/layout/Header.tsx`
```tsx
// AI:SAFE-EDIT START - Logo and brand name
<span className="text-xl">Neoesis</span>  {/* Marka adı */}
// AI:SAFE-EDIT END
```

**Footer:** `src/components/layout/Footer.tsx`
```tsx
// AI:SAFE-EDIT START - Brand and tagline
<span className="text-2xl font-bold">Neoesis</span>
<p className="...">
  An intelligent learning platform...  {/* Tagline */}
</p>
// AI:SAFE-EDIT END
```

---

## 🔧 Görev 3: Kalite Kontrol Döngüsü

### Otomatik Kontrol Süreci

```bash
# 1. TypeScript kontrolü
pnpm typecheck

# 2. ESLint kontrolü
pnpm lint

# 3. Tüm testler
pnpm test
pnpm test:e2e

# 4. Accessibility
pnpm audit:a11y

# 5. Tailwind v4 compliance
pnpm audit:tw4

# VEYA tümü birden:
pnpm audit:all
```

### Hata Düzeltme Döngüsü

**TypeScript Hatası:**
```bash
# Hata çıktısı:
Property 'meta' does not exist on type '...'

# Çözüm:
1. İlgili dosyayı aç
2. Import'ları kontrol et
3. Type tanımlarını düzelt
4. Tekrar kontrol et: pnpm typecheck
```

**ESLint Hatası:**
```bash
# Hata çıktısı:
'React' is defined but never used

# Çözüm:
1. Kullanılmayan import'u sil
2. Tekrar kontrol et: pnpm lint
```

**Accessibility Hatası:**
```bash
# Hata çıktısı:
Image missing alt text

# Çözüm:
1. <img> tag'lerine alt attribute ekle
2. Tekrar test et: pnpm audit:a11y
```

---

## 📚 Mevcut Bileşenler ve Araçlar

### Animasyon Presets

**Dosya:** `src/lib/animation-presets.ts`

```typescript
animations.fadeIn       // Basit fade
animations.slideUp      // Yukarı kay
animations.slideDown    // Aşağı kay
animations.scaleIn      // Ölçekle
animations.staggerGrid  // Grid animasyonu
animations.parallaxHero // Hero animasyonu
animations.bounceIn     // Zıplama
animations.rotateIn     // Döndür
animations.blurIn       // Bulanıklık
```

### Grid Layouts

**Dosya:** `src/lib/grid-presets.ts`

```typescript
grids.default          // Tek sütun
grids.twoColumn        // 2 eşit sütun
grids.threeColumn      // 3 eşit sütun
grids.fourColumn       // 4 eşit sütun
grids.heroSplit        // 2:1 asimetrik
grids.asymmetric       // 1:2 asimetrik
grids.sidebarLayout    // Sidebar + içerik
grids.cardGrid         // Kart grid
grids.listLayout       // Dar liste
grids.wideContent      // Geniş içerik
```

### UI Bileşenleri (shadcn/ui)

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { RadioGroup } from '@/components/ui/radio-group';
```

---

## ⚠️ Önemli Kurallar ve Kısıtlamalar

### ✅ GÜVENLİ Alanlar (Düzenleyebilirsin)

1. **Ders içerikleri** (`AI:SAFE-EDIT` işaretli bölümler)
2. **Design tokens** (`src/lib/design-tokens.ts`)
3. **Animasyon preset'leri** (`src/lib/animation-presets.ts`)
4. **Grid preset'leri** (`src/lib/grid-presets.ts`)
5. **Hero content** (`src/components/home/Hero.tsx` - işaretli bölümler)
6. **Header/Footer text** (işaretli bölümler)

### ❌ KORUNAN Alanlar (Dokunma!)

1. **`src/lessons/index.ts`** - Otomatik oluşturulur
2. **`src/lib/curriculum.ts`** - Bölüm tanımları
3. **`src/contracts/*.schema.ts`** - Zod şemaları
4. **`src/lib/progress-store.ts`** - State yönetimi
5. **`src/hooks/*.ts`** - React hooks
6. **Meta objeler** - Ders metadata'ları

### 🟡 DİKKATLİ Düzenle

1. Component yapısı (JSX hierarchy)
2. TypeScript type'lar
3. Import statement'lar (ekle, silme)

---

## 🧪 Tailwind CSS v4 Kuralları

### ✅ Yapılması Gerekenler

```tsx
// Logical properties kullan
<div className="ps-4 pe-4">  // ✅ Doğru
<div className="ms-4 me-4">  // ✅ Doğru
```

### ❌ Yapılmaması Gerekenler

```tsx
// Fiziksel properties kullanma
<div className="pl-4 pr-4">  // ❌ Yanlış
<div className="ml-4 mr-4">  // ❌ Yanlış

// @apply kullanma (TSX'te)
@apply flex items-center;     // ❌ Yanlış
```

### CSS Konfigürasyonu

- `tailwind.config.js` YOK - `@theme` directive kullan
- Renkler `globals.css` içinde CSS variables
- Design tokens `src/lib/design-tokens.ts`'te

---

## 📖 Workflow Özeti

### 1. Yeni Ders Ekleme

```bash
1. pnpm gen:lesson
2. src/lessons/XX-slug.tsx dosyasını düzenle
3. İçeriği AI:SAFE-EDIT içinde yaz
4. Animasyon/grid ekle
5. pnpm typecheck && pnpm lint
6. pnpm dev ile test et
7. Hata varsa düzelt, yoksa tamamdır
```

### 2. Marka Özelleştirme

```bash
1. src/lib/design-tokens.ts'i düzenle
2. Hero/Header/Footer text'leri güncelle
3. pnpm dev ile önizle
4. pnpm audit:a11y ile kontrol et
5. Kontrast yeterli mi? Evet ise tamamdır
```

### 3. Kalite Kontrolü

```bash
1. pnpm audit:all çalıştır
2. Hata varsa:
   - TypeScript → dosyayı düzelt
   - ESLint → lint hatalarını gider
   - Test → test kodunu kontrol et
   - A11y → accessibility düzelt
3. Tekrar audit:all
4. Exit code 0 ise tamamdır
```

---

## 🚨 Acil Durum Çözümleri

### "Lesson not appearing in TOC"

1. `src/lessons/index.ts`'e import eklendi mi?
2. `meta.section` değeri doğru mu? (`fundamentals`, `advanced`, `best-practices`)
3. Duplicate `meta.order` var mı?
4. Dev server'ı restart et

### "Design tokens not applying"

1. Dev server'ı restart et (`Ctrl+C`, `pnpm dev`)
2. Browser cache temizle (`Ctrl+Shift+R`)
3. OKLCH syntax doğru mu? `oklch(L C H)` formatında olmalı

### "Tests failing"

1. `pnpm typecheck` - önce type hatalarını yakala
2. `pnpm lint` - lint hatalarını gider
3. `git diff` - ne değişti kontrol et
4. Hataları tek tek düzelt

---

## ✅ Kalite Standartları (Checklist)

Her üretilen sayfa şunları geçmelidir:

- [ ] TypeScript strict mode (0 hata)
- [ ] ESLint (0 ihlal)
- [ ] Tailwind v4 compliance (logical properties)
- [ ] Accessibility (0 Axe ihlali, WCAG 2.1 AA)
- [ ] Performance (LCP ≤ 1.8s)
- [ ] Bundle size (≤ 200KB/route)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Dark mode çalışıyor
- [ ] Animasyonlar smooth
- [ ] Quiz (varsa) 3 deneme ile çalışıyor

---

## 🎓 En İyi Pratikler

### Kod Yazım Stili

```tsx
// ✅ İyi
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  condition && "conditional-class"
)} />

// ❌ Kötü
<div className={`base-class ${condition ? 'conditional-class' : ''}`} />
```

### Component Organizasyonu

```tsx
// ✅ İyi yapı
export default function MyLesson() {
  // 1. Imports
  // 2. Local state/hooks
  // 3. Event handlers
  // 4. Return JSX

  return <article>...</article>;
}

// ❌ Karmaşık yapı
// JSX içinde karmaşık mantık yazma
```

### Performance Optimizasyonu

```tsx
// ✅ useCallback ile memoize
const handleClick = React.useCallback(() => {
  // ...
}, [deps]);

// ✅ Lazy loading
const Heavy3DComponent = dynamic(() => import('./Heavy3D'), {
  ssr: false
});
```

---

## 📞 Yardım ve Destek

### Dokümantasyon

- **Bu dosya (CLAUDE.md)** - Ana kılavuz
- **README.md** - Genel proje bilgisi
- **README-TEMPLATE.md** - Template detayları

### Kaynaklar

- Next.js Docs: https://nextjs.org/docs
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Tailwind CSS v4: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**🚀 Neosis ile kaliteli eğitim içerikleri üret!**

*Son güncelleme: 2025-10-05*
