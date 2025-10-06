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

## 📚 İçerik Bileşenleri Kullanım Kılavuzu

### Genel Bakış

Ders içeriklerini zenginleştirmek için 8 özel içerik bileşeni mevcuttur. Bu bileşenler, bilgiyi farklı formatlarda sunarak öğrenme deneyimini geliştirir.

**Bileşen lokasyonu:** `@/components/lesson/content`

**Import:**
```tsx
import {
  Callout,
  CodeBlock,
  KeyConcepts,
  KeyConcept,
  StepGuide,
  Step,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Figure,
  ComparisonTable,
} from '@/components/lesson/content';
```

### 1. Callout - Önemli Bilgileri Vurgulama

**Ne zaman kullan:**
- Önemli notlar ve uyarılar için
- İpuçları ve püf noktalar için
- Başarı mesajları ve hatırlatmalar için
- Hata senaryoları ve dikkat edilmesi gerekenler için

**5 varyant:**
- `info` - Bilgilendirme (mavi)
- `warning` - Uyarı (sarı)
- `success` - Başarı (yeşil)
- `error` - Hata (kırmızı)
- `tip` - İpucu (mor)

**Kullanım:**
```tsx
<Callout type="info" title="Bilgi">
  React bileşenleri fonksiyon veya class olarak tanımlanabilir.
</Callout>

<Callout type="warning">
  Props değiştirilemez! Mutlaka yeni bir obje oluşturun.
</Callout>

<Callout type="tip" title="Pro İpucu">
  useState hook'u ile component state'i yönetebilirsiniz.
</Callout>
```

**Props:**
- `type` (required): `'info' | 'warning' | 'success' | 'error' | 'tip'`
- `title` (optional): Başlık metni
- `children`: İçerik
- `icon` (optional): Özel ikon
- `className` (optional): CSS sınıfları

### 2. CodeBlock - Kod Örnekleri

**Ne zaman kullan:**
- Kod örnekleri göstermek için
- Syntax highlighting gerektiğinde
- Kullanıcının kopyalayabileceği kod parçaları için
- Belirli satırları vurgulamak istediğinde

**Özellikler:**
- Syntax highlighting (Prism.js)
- Kopyala butonu
- Satır numaraları
- Satır vurgulama
- Dosya adı gösterimi
- 30+ dil desteği

**Kullanım:**
```tsx
<CodeBlock language="tsx" filename="App.tsx">
{`function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
</CodeBlock>

<CodeBlock
  language="javascript"
  highlightLines={[2, 3, 4]}
  showLineNumbers={true}
>
{`function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}`}
</CodeBlock>
```

**Props:**
- `children` (required): Kod metni
- `language` (optional): Dil (default: `'typescript'`)
- `filename` (optional): Dosya adı
- `highlightLines` (optional): Vurgulanacak satırlar `[1, 2, 3]`
- `showLineNumbers` (optional): Satır numaraları (default: `true`)
- `className` (optional): CSS sınıfları

**Desteklenen diller:**
`typescript`, `javascript`, `tsx`, `jsx`, `python`, `rust`, `go`, `java`, `cpp`, `c`, `css`, `html`, `json`, `yaml`, `markdown`, `bash`, `sql`, ve daha fazlası.

### 3. KeyConcepts - Temel Kavramlar

**Ne zaman kullan:**
- Yeni terimleri tanımlarken
- Anahtar kavramları özetlerken
- Glossary benzeri yapılar için
- Karşılaştırma gerektirmeyen tanımlar için

**Kullanım:**
```tsx
<KeyConcepts title="React Temel Kavramları">
  <KeyConcept term="Component">
    React uygulamasının temel yapı taşı. UI'ı yeniden kullanılabilir
    parçalara böler.
  </KeyConcept>

  <KeyConcept term="Props">
    Parent bileşenden child bileşene veri aktarmak için kullanılan
    salt-okunur parametreler.
  </KeyConcept>

  <KeyConcept term="State">
    Bileşenin içinde tutulan ve değişebilen veriler. useState hook'u
    ile yönetilir.
  </KeyConcept>

  <KeyConcept term="Hook">
    React 16.8 ile gelen, fonksiyon bileşenlerinde state ve lifecycle
    kullanmayı sağlayan özel fonksiyonlar.
  </KeyConcept>
</KeyConcepts>
```

**Props (KeyConcepts):**
- `title` (optional): Başlık (default: `'Key Concepts'`)
- `children`: KeyConcept bileşenleri
- `className` (optional): CSS sınıfları

**Props (KeyConcept):**
- `term` (required): Terim/kavram adı
- `children`: Tanım/açıklama
- `className` (optional): CSS sınıfları

**Layout:**
- Desktop: 2 sütun grid
- Mobile: Tek sütun
- Her kavram ayrı kartda gösterilir

### 4. StepGuide - Adım Adım Talimatlar

**Ne zaman kullan:**
- Kurulum talimatları için
- Adım adım işlemler için
- Tutorial benzeri içerikler için
- Sıralı görevler için

**Kullanım:**
```tsx
<StepGuide title="React Projesine Başlama">
  <Step number={1} title="Proje Oluştur">
    <CodeBlock language="bash">
      npx create-react-app my-app
    </CodeBlock>
    <p>Create React App ile yeni bir proje oluşturun.</p>
  </Step>

  <Step number={2} title="Projeyi Başlat">
    <CodeBlock language="bash">
      cd my-app && npm start
    </CodeBlock>
    <p>Geliştirme sunucusunu başlatın.</p>
  </Step>

  <Step number={3} title="Tarayıcıda Aç">
    <p>
      <a href="http://localhost:3000">http://localhost:3000</a> adresine
      gidin ve uygulamanızı görün.
    </p>
  </Step>
</StepGuide>
```

**Props (StepGuide):**
- `title` (optional): Başlık (default: `'Step-by-Step Guide'`)
- `children`: Step bileşenleri
- `className` (optional): CSS sınıfları

**Props (Step):**
- `number` (required): Adım numarası
- `title` (required): Adım başlığı
- `children`: Adım içeriği
- `className` (optional): CSS sınıfları

**Özellikler:**
- Numaralı adım daireleri
- Bağlantı çizgisi (sol kenar)
- Kademeli animasyon (stagger effect)

### 5. Tabs - Sekmeli İçerik

**Ne zaman kullan:**
- Alternatif yaklaşımlar göstermek için
- Farklı dillerde kod örnekleri için
- İlişkili ama ayrı içerikler için
- Alan tasarrufu yapmak istediğinde

**Kullanım:**
```tsx
<Tabs defaultValue="function">
  <TabsList>
    <TabsTrigger value="function">Function Component</TabsTrigger>
    <TabsTrigger value="class">Class Component</TabsTrigger>
  </TabsList>

  <TabsContent value="function">
    <CodeBlock language="tsx">
{`function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}`}
    </CodeBlock>
  </TabsContent>

  <TabsContent value="class">
    <CodeBlock language="tsx">
{`class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`}
    </CodeBlock>
  </TabsContent>
</Tabs>
```

**Props:**
- `defaultValue` (required): Varsayılan aktif sekme
- `children`: TabsList ve TabsContent'ler

**Yaygın kullanım senaryoları:**
```tsx
// Farklı framework'ler
<Tabs defaultValue="react">
  <TabsList>
    <TabsTrigger value="react">React</TabsTrigger>
    <TabsTrigger value="vue">Vue</TabsTrigger>
    <TabsTrigger value="angular">Angular</TabsTrigger>
  </TabsList>
  {/* ... */}
</Tabs>

// Farklı diller
<Tabs defaultValue="js">
  <TabsList>
    <TabsTrigger value="js">JavaScript</TabsTrigger>
    <TabsTrigger value="ts">TypeScript</TabsTrigger>
  </TabsList>
  {/* ... */}
</Tabs>
```

### 6. Accordion - Katlanabilir Bölümler

**Ne zaman kullan:**
- FAQ'ler için
- İsteğe bağlı detaylar için
- Uzun içeriği organize etmek için
- İlermiş bilgileri gizlemek için

**Kullanım:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>useState hook'u ne yapar?</AccordionTrigger>
    <AccordionContent>
      <p>
        useState, fonksiyon bileşenlerinde state yönetimi sağlayan bir
        React hook'udur.
      </p>
      <CodeBlock language="tsx">
{`const [count, setCount] = useState(0);`}
      </CodeBlock>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>useEffect ne zaman kullanılır?</AccordionTrigger>
    <AccordionContent>
      <p>
        useEffect, side effect'leri yönetmek için kullanılır:
        API çağrıları, subscriptions, DOM manipülasyonu vb.
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Props:**
- `type`: `'single'` (tek açık) veya `'multiple'` (çok açık)
- `collapsible`: Tek tipte, açılanı tekrar kapatabilir mi?

**İpucu:** FAQ formatı için ideal. Kullanıcı sadece ilgilendikleri soruları açar.

### 7. Figure - Görseller ve Diyagramlar

**Ne zaman kullan:**
- Diyagram ve şemalar için
- Örnek ekran görüntüleri için
- Açıklama gerektiren görseller için
- Caption eklemek istediğinde

**Kullanım:**
```tsx
<Figure
  src="/images/react-component-tree.png"
  alt="React bileşen ağacı diyagramı"
  caption="Şekil 1: React bileşenlerinin hiyerarşik yapısı"
  width={800}
  height={600}
/>

{/* Responsive fill mode */}
<Figure
  src="/images/hero-diagram.jpg"
  alt="Hero bölümü"
  fill
  className="aspect-video"
  caption="Responsive görsel örneği"
/>
```

**Props:**
- `src` (required): Görsel URL'i
- `alt` (required): Erişilebilirlik metni
- `caption` (optional): Görsel açıklaması
- `width` (optional): Genişlik (fill=false ise gerekli)
- `height` (optional): Yükseklik (fill=false ise gerekli)
- `fill` (optional): Responsive fill mode (default: `false`)
- `className` (optional): CSS sınıfları

**Özellikler:**
- Next.js Image optimizasyonu
- Lazy loading
- Otomatik responsive sizes
- Caption ile figcaption elementi
- Smooth fade-in animasyonu

### 8. ComparisonTable - Karşılaştırma Tabloları

**Ne zaman kullan:**
- İki veya daha fazla yaklaşımı karşılaştırmak için
- Özellik listesi göstermek için
- Versiyonlar arası farkları belirtmek için
- Boolean özellikleri göstermek için (✓/✗)

**Kullanım:**
```tsx
<ComparisonTable
  title="Class vs Function Components"
  rowLabels={['Syntax', 'State Yönetimi', 'Lifecycle', 'Performans']}
  columns={[
    {
      header: 'Class Components',
      rows: [
        'class syntax kullanır',
        'this.state ve this.setState',
        'componentDidMount, componentDidUpdate vb.',
        'Biraz daha yavaş'
      ]
    },
    {
      header: 'Function Components',
      rows: [
        'function syntax kullanır',
        'useState hook',
        'useEffect hook',
        'Daha hızlı'
      ]
    }
  ]}
/>

{/* Boolean değerler ile */}
<ComparisonTable
  title="React Versiyonları"
  rowLabels={['Hooks', 'Concurrent Mode', 'Suspense', 'Server Components']}
  columns={[
    {
      header: 'React 17',
      rows: [true, false, true, false]
    },
    {
      header: 'React 18',
      rows: [true, true, true, true]
    }
  ]}
/>
```

**Props:**
- `title` (optional): Tablo başlığı
- `columns` (required): Sütun verileri
- `rowLabels` (optional): Satır etiketleri
- `className` (optional): CSS sınıfları

**Column Props:**
- `header`: Sütun başlığı
- `rows`: Satır verileri (string, boolean, veya ReactNode)

**Boolean rendering:**
- `true` → ✓ (yeşil check)
- `false` → ✗ (kırmızı X)

### En İyi Pratikler

#### 1. Bileşenleri Birleştirme

```tsx
// ✅ İyi: Birden fazla bileşeni birlikte kullan
<>
  <Callout type="info" title="Konu Hakkında">
    Bu bölümde React Hook'larını öğreneceğiz.
  </Callout>

  <KeyConcepts title="Temel Hook'lar">
    <KeyConcept term="useState">State yönetimi</KeyConcept>
    <KeyConcept term="useEffect">Side effects</KeyConcept>
  </KeyConcepts>

  <StepGuide title="İlk Hook'unuzu Kullanın">
    <Step number={1} title="Import edin">
      <CodeBlock language="tsx">
        {`import { useState } from 'react';`}
      </CodeBlock>
    </Step>
  </StepGuide>
</>
```

#### 2. Accessiblity

```tsx
// ✅ İyi: Her zaman alt text ekle
<Figure
  src="/diagram.png"
  alt="React component lifecycle diagram showing mount, update, and unmount phases"
  caption="Component yaşam döngüsü"
/>

// ❌ Kötü: Boş alt text
<Figure src="/diagram.png" alt="" />
```

#### 3. Code Blocks

```tsx
// ✅ İyi: Dil belirt, satır vurgula
<CodeBlock language="tsx" highlightLines={[3, 4]}>
{`function App() {
  const [count, setCount] = useState(0);
  // Bu satır vurgulanacak
  const increment = () => setCount(count + 1);
  return <button onClick={increment}>{count}</button>;
}`}
</CodeBlock>

// ❌ Kötü: Dil yok, formatting bozuk
<CodeBlock>
  {`function App(){return<div>Hello</div>}`}
</CodeBlock>
```

#### 4. İçerik Yapısı

```tsx
// ✅ İyi: Mantıksal akış
<>
  <h2>React Hooks</h2>

  {/* 1. Giriş/Genel Bakış */}
  <p>Hook'lar React 16.8 ile geldi...</p>

  {/* 2. Temel Kavramlar */}
  <KeyConcepts>...</KeyConcepts>

  {/* 3. Kod Örneği */}
  <CodeBlock>...</CodeBlock>

  {/* 4. Adım Adım Uygulama */}
  <StepGuide>...</StepGuide>

  {/* 5. Dikkat Edilmesi Gerekenler */}
  <Callout type="warning">...</Callout>

  {/* 6. İleri Seviye (Accordion'da) */}
  <Accordion>...</Accordion>
</>
```

### Markdown'dan React'e Dönüşüm Kuralları

**Callout:**
```markdown
> **Bilgi:** React bileşenleri yeniden kullanılabilir.
```
↓
```tsx
<Callout type="info" title="Bilgi">
  React bileşenleri yeniden kullanılabilir.
</Callout>
```

**Code Blocks:**
```markdown
```tsx
function App() {
  return <div>Hello</div>;
}
```
```
↓
```tsx
<CodeBlock language="tsx">
{`function App() {
  return <div>Hello</div>;
}`}
</CodeBlock>
```

**Tanımlar:**
```markdown
**Component**: React'in temel yapı taşı
**Props**: Bileşenler arası veri aktarımı
```
↓
```tsx
<KeyConcepts>
  <KeyConcept term="Component">React'in temel yapı taşı</KeyConcept>
  <KeyConcept term="Props">Bileşenler arası veri aktarımı</KeyConcept>
</KeyConcepts>
```

**Adım Adım:**
```markdown
1. Projeyi oluştur: `npx create-react-app`
2. Sunucuyu başlat: `npm start`
3. Tarayıcıda aç: http://localhost:3000
```
↓
```tsx
<StepGuide>
  <Step number={1} title="Projeyi Oluştur">
    <CodeBlock language="bash">npx create-react-app</CodeBlock>
  </Step>
  <Step number={2} title="Sunucuyu Başlat">
    <CodeBlock language="bash">npm start</CodeBlock>
  </Step>
  <Step number={3} title="Tarayıcıda Aç">
    <p>http://localhost:3000 adresine gidin.</p>
  </Step>
</StepGuide>
```

### Performans İpuçları

1. **Lazy Loading:** Ağır görseller için `Figure` bileşeni otomatik lazy loading yapar
2. **Code Splitting:** `CodeBlock` içindeki Prism temalarını dinamik import edilebilir
3. **Memoization:** Değişmeyen içerikler için `React.memo()` kullanılabilir

### Detaylı Dokümantasyon

Tüm bileşenlerin detaylı API dokümantasyonu için:
```
app/src/components/lesson/content/README.md
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
