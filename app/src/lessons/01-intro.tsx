import type { LessonMeta } from '@/types/lesson';
import {
  Callout,
  CodeBlock,
  KeyConcepts,
  KeyConcept,
  StepGuide,
  Step,
  ComparisonTable,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/lesson/content';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'intro-to-react',
  title: 'Next.js, Tailwind ve shadcn ile Modern Web Tasarımı',
  order: 1,
  section: 'fundamentals',
  description: 'Next.js 15, Tailwind CSS v4 ve shadcn/ui kullanarak profesyonel, performanslı ve erişilebilir web uygulamaları nasıl tasarlanır öğrenin.',
  estimatedMinutes: 25,
  objectives: [
    'Modern web tasarım stack\'ini (Next.js + Tailwind + shadcn) anlama ve neden kullanıldığını kavrama',
    'Server Components ve Client Components arasındaki farkları öğrenme',
    'Tailwind utility-first yaklaşımı ile hızlı ve tutarlı UI geliştirme',
    'shadcn/ui composition pattern\'i ile özelleştirilebilir componentler oluşturma',
    'Production-ready bir Next.js projesi kurulumu ve best practices'
  ],
  quiz: {
    id: 'quiz-modern-web-design',
    prompt: 'Next.js Server Components\'in ana avantajı nedir?',
    type: 'single-choice',
    options: [
      'Tarayıcıda daha hızlı çalışır',
      'Sunucuda render edilir ve JavaScript bundle\'ı küçültür',
      'Daha fazla state yönetimi sunar',
      'Otomatik caching yapar'
    ],
    correctAnswer: 1,
    explanation: 'Server Components sunucuda render edilir, bu da JavaScript bundle boyutunu küçültür ve ilk sayfa yükleme süresini iyileştirir. Client-side JavaScript sadece interaktif component\'ler için kullanılır.',
    maxAttempts: 3
  }
};

// AI:SAFE-EDIT START - Lesson content
export default function ModernWebDesignLesson() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Next.js, Tailwind CSS ve shadcn/ui ile Modern Web Tasarımı</h1>

      <Callout type="info" title="Modern Web Tasarım Stack'i">
        2025 yılında profesyonel web uygulamaları geliştirmek için en popüler ve güçlü araçlar:
        **Next.js 15** (React framework), **Tailwind CSS v4** (utility-first CSS), ve **shadcn/ui**
        (composition-based UI component library). Bu üçlü, hız, performans ve geliştirici deneyimini bir araya getirir.
      </Callout>

      <p>
        Netflix, Vercel, TikTok, Twitch ve binlerce büyük ölçekli uygulama bu teknolojileri kullanıyor.
        Bu derste, neden bu stack\'in bu kadar popüler olduğunu ve nasıl kullanılacağını öğreneceksiniz.
      </p>

      <h2>🚀 Stack Bileşenleri</h2>

      <KeyConcepts title="Modern Stack\'in Temel Kavramları">
        <KeyConcept term="Next.js 15 (React Framework)">
          React üzerine kurulu, production-ready özellikler sunan full-stack framework.
          Server Components, App Router, Server Actions, Image Optimization ve daha fazlası içerir.
          SEO-friendly, performanslı ve developer experience odaklı.
        </KeyConcept>

        <KeyConcept term="Tailwind CSS v4 (Utility-First CSS)">
          Utility-first yaklaşımıyla CSS yazmayı hızlandıran modern CSS framework.
          JIT (Just-In-Time) compiler ile sadece kullandığınız class\'ları bundle\'a dahil eder.
          Responsive, dark mode, animations - hepsi built-in.
        </KeyConcept>

        <KeyConcept term="shadcn/ui (Composition Pattern)">
          Kopyala-yapıştır UI component library. npm package değil, kod ownership prensibi.
          Radix UI üzerine kurulu, accessible, customizable ve Tailwind ile styling.
          İstediğiniz component\'i projenize kopyalar, tamamen sahiplenirsiniz.
        </KeyConcept>

        <KeyConcept term="TypeScript (Type Safety)">
          JavaScript\'e tip güvenliği ekler. Büyük projelerde hataları erkenden yakalar,
          IDE auto-complete ile geliştirme hızını artırır. Next.js ile mükemmel entegrasyon.
        </KeyConcept>
      </KeyConcepts>

      <h2>⚡ Neden Bu Stack?</h2>

      <ComparisonTable
        title="Geleneksel vs Modern Web Geliştirme"
        rowLabels={[
          'İlk Yükleme Hızı',
          'SEO Performansı',
          'Development Speed',
          'Bundle Boyutu',
          'Type Safety',
          'UI Consistency'
        ]}
        columns={[
          {
            header: 'Geleneksel (CRA + CSS)',
            rows: [
              '⚠️ Yavaş (client-side render)',
              '❌ Zayıf (SPA sorunları)',
              '🐌 Orta (manuel CSS yazımı)',
              '📦 Büyük (tüm kod client\'ta)',
              '❓ Opsiyonel (JavaScript)',
              '🎨 Tutarsız (manuel styling)'
            ]
          },
          {
            header: 'Modern (Next.js + Tailwind + shadcn)',
            rows: [
              '✅ Hızlı (SSR/SSG)',
              '✅ Mükemmel (meta tags, static)',
              '⚡ Çok Hızlı (utility classes)',
              '📦 Küçük (tree-shaking)',
              '✅ Built-in (TypeScript)',
              '🎨 Tutarlı (design system)'
            ]
          }
        ]}
      />

      <Callout type="tip" title="Production-Ready Stack">
        Bu stack, büyük şirketlerin tercih ettiği araçları kullanmanızı sağlar. Öğrendiğinizde,
        aynı zamanda iş piyasasında en çok aranan becerilere sahip olursunuz!
      </Callout>

      <h2>🏗️ Proje Kurulumu (Adım Adım)</h2>

      <StepGuide title="Sıfırdan Production-Ready Next.js Projesi">
        <Step number={1} title="Next.js Projesini Oluşturun">
          <p>
            Next.js 15 ile yeni bir proje oluşturun. <code>create-next-app</code> otomatik olarak
            TypeScript, ESLint ve Tailwind kurulumunu yapacak:
          </p>
          <CodeBlock language="bash">
{`npx create-next-app@latest my-app

# İnteraktif sorular:
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use \`src/\` directory? Yes
✔ Would you like to use App Router? Yes
✔ Would you like to customize the default import alias? No`}
          </CodeBlock>
          <Callout type="info">
            **App Router**: Next.js 13+ ile gelen yeni routing sistemi. Server Components,
            layouts, nested routes gibi modern özellikleri destekler.
          </Callout>
        </Step>

        <Step number={2} title="shadcn/ui Kurulumu">
          <p>
            shadcn/ui CLI ile component library\'yi projenize entegre edin:
          </p>
          <CodeBlock language="bash">
{`cd my-app

# shadcn/ui initialize
npx shadcn@latest init

# İnteraktif sorular:
✔ Which style would you like to use? Default
✔ Which color would you like to use as base color? Slate
✔ Would you like to use CSS variables for colors? Yes`}
          </CodeBlock>
          <p>
            Bu komut, <code>components/ui</code> klasörünü oluşturur ve Tailwind config\'i günceller.
          </p>
        </Step>

        <Step number={3} title="İlk Component\'leri Ekleyin">
          <p>
            Sık kullanılan component\'leri projenize ekleyin:
          </p>
          <CodeBlock language="bash">
{`# Button, Card, Dialog gibi temel component'ler
npx shadcn@latest add button card dialog input label

# Tüm component'ler src/components/ui/ klasörüne kopyalanacak
# Artık bunları istediğiniz gibi özelleştirebilirsiniz!`}
          </CodeBlock>
          <Callout type="success" title="Code Ownership">
            shadcn/ui, component\'leri npm package olarak değil, doğrudan kodunuza kopyalar.
            Bu sayede %100 kontrole sahip olursunuz - istediğiniz değişikliği yapabilirsiniz!
          </Callout>
        </Step>

        <Step number={4} title="Development Server\'ı Başlatın">
          <p>
            Projenizi çalıştırın ve tarayıcıda görün:
          </p>
          <CodeBlock language="bash">
{`npm run dev

# ✓ Ready in 1.2s
# ○ Local: http://localhost:3000

# Tarayıcınızda açın: http://localhost:3000`}
          </CodeBlock>
          <p>
            Next.js Turbopack ile super hızlı hot-reload. Kod değişikliklerinizi anında göreceksiniz!
          </p>
        </Step>
      </StepGuide>

      <h2>💻 İlk Component\'inizi Oluşturun</h2>

      <p>
        Şimdi öğrendiklerinizi pratiğe dökelim! shadcn button ve card component\'lerini
        kullanarak basit bir hero section oluşturalım:
      </p>

      <Tabs defaultValue="component">
        <TabsList>
          <TabsTrigger value="component">Hero Component</TabsTrigger>
          <TabsTrigger value="page">Page Kullanımı</TabsTrigger>
          <TabsTrigger value="result">Sonuç</TabsTrigger>
        </TabsList>

        <TabsContent value="component">
          <CodeBlock language="tsx" filename="components/HeroSection.tsx" highlightLines={[8, 9, 10]}>
{`import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Gradient başlık - Tailwind utilities */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Modern Web Tasarımına Hoş Geldiniz
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Next.js, Tailwind CSS ve shadcn/ui ile profesyonel, performanslı
          ve güzel web uygulamaları oluşturun.
        </p>

        {/* shadcn Button component'i */}
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="text-lg">
            Hemen Başla
          </Button>
          <Button size="lg" variant="outline" className="text-lg">
            Daha Fazla Öğren
          </Button>
        </div>

        {/* shadcn Card component'i */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Super Hızlı</CardTitle>
              <CardDescription>
                Server Components ile lightning-fast yükleme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Next.js optimizasyonları sayesinde kullanıcılarınız
                anında içeriğe ulaşır.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Güzel Tasarım</CardTitle>
              <CardDescription>
                Tailwind ile pixel-perfect UI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Utility-first yaklaşım ile hızlı ve tutarlı
                tasarım sistemi.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>♿ Erişilebilir</CardTitle>
              <CardDescription>
                WCAG 2.1 AA standardında
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                shadcn/ui Radix primitives kullanır, tüm
                accessibility standartları built-in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="page">
          <CodeBlock language="tsx" filename="app/page.tsx">
{`import { HeroSection } from '@/components/HeroSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
    </main>
  );
}`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="result">
          <Callout type="success" title="Sonuç">
            <ul className="space-y-2 text-sm">
              <li>✅ Responsive tasarım (mobile, tablet, desktop)</li>
              <li>✅ Dark mode desteği (otomatik)</li>
              <li>✅ Smooth gradients ve transitions</li>
              <li>✅ Accessible components (keyboard navigation, ARIA)</li>
              <li>✅ Production-ready kod</li>
            </ul>
          </Callout>
        </TabsContent>
      </Tabs>

      <h2>🎨 Tailwind CSS Utility-First Yaklaşımı</h2>

      <p>
        Tailwind CSS, geleneksel CSS yazımından farklı bir yaklaşım sunar. Stil yazmak yerine,
        önceden tanımlanmış utility class\'ları kullanırsınız:
      </p>

      <Tabs defaultValue="tailwind">
        <TabsList>
          <TabsTrigger value="tailwind">Tailwind Yolu</TabsTrigger>
          <TabsTrigger value="traditional">Geleneksel CSS</TabsTrigger>
        </TabsList>

        <TabsContent value="tailwind">
          <CodeBlock language="tsx" highlightLines={[3, 4, 5]}>
{`// Tailwind ile (önerilen)
function Card() {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Başlık
      </h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        İçerik buraya gelecek...
      </p>
    </div>
  );
}

// Avantajlar:
// ✅ Hızlı geliştirme (class ismi düşünmeye gerek yok)
// ✅ Tutarlı design system (spacing, colors standardize)
// ✅ Responsive built-in (md:, lg: prefix'leri)
// ✅ Dark mode built-in (dark: prefix)
// ✅ Tree-shaking (kullanılmayan CSS bundle'a dahil edilmez)`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="traditional">
          <CodeBlock language="css" filename="Card.module.css">
{`/* Geleneksel CSS ile (eskimiş yöntem) */
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.card p {
  color: #475569;
  line-height: 1.625;
}

/* Dark mode için ayrı medya query */
@media (prefers-color-scheme: dark) {
  .card {
    background-color: #1e293b;
  }
  .card h2 {
    color: white;
  }
  .card p {
    color: #cbd5e1;
  }
}

/* Responsive için ayrı medya query */
@media (min-width: 768px) {
  .card {
    padding: 2rem;
  }
}

// Dezavantajlar:
// ❌ Yavaş (CSS dosyası oluştur, class ismi bul)
// ❌ İsimlendirme zorluğu (BEM, OOCSS, SMACSS?)
// ❌ CSS dosyası şişiyor (her component için stil)
// ❌ Media query'ler dağınık
// ❌ Dark mode manuel yönetim`}
          </CodeBlock>
        </TabsContent>
      </Tabs>

      <Callout type="tip" title="Pro İpucu: Tailwind Intellisense">
        VS Code için **Tailwind CSS IntelliSense** eklentisini yükleyin. Auto-complete,
        syntax highlighting ve class validation sağlar. Geliştirme hızınızı 3-4 kat artırır!
      </Callout>

      <h2>🧩 shadcn/ui Composition Pattern</h2>

      <p>
        shadcn/ui\'ın en güçlü özelliği: <strong>composition pattern</strong>. Component\'leri
        parçalara böler, istediğiniz gibi birleştirirsiniz:
      </p>

      <CodeBlock language="tsx" filename="components/ProductCard.tsx">
{`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      {/* Composition: Card parçalarını istediğiniz gibi düzenleyin */}
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <Badge variant={product.inStock ? "default" : "secondary"}>
            {product.inStock ? "Stokta" : "Tükendi"}
          </Badge>
        </div>

        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">
            ₺{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            {product.rating} ⭐ ({product.reviews} değerlendirme)
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button className="flex-1" disabled={!product.inStock}>
          Sepete Ekle
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Composition Pattern Avantajları:
// ✅ Esnek yapı (istediğiniz sırada kullanın)
// ✅ Özelleştirilebilir (her parça ayrı className alır)
// ✅ Type-safe (TypeScript intellisense)
// ✅ Accessible (ARIA otomatik)
// ✅ Kod sahipliği (istediğiniz değişikliği yapın)`}
      </CodeBlock>

      <h2>🔥 Server Components vs Client Components</h2>

      <p>
        Next.js 15\'in en devrim niteliğindeki özelliği: <strong>React Server Components</strong>.
        Component\'lerinizi sunucuda veya client\'ta render edebilirsiniz:
      </p>

      <Tabs defaultValue="server">
        <TabsList>
          <TabsTrigger value="server">Server Component</TabsTrigger>
          <TabsTrigger value="client">Client Component</TabsTrigger>
          <TabsTrigger value="comparison">Karşılaştırma</TabsTrigger>
        </TabsList>

        <TabsContent value="server">
          <CodeBlock language="tsx" filename="app/blog/page.tsx">
{`// Server Component (default - directive yok)
// Sunucuda render edilir, JavaScript browser'a gönderilmez

async function BlogPage() {
  // API çağrısı doğrudan sunucuda
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // 60 saniyede bir yenile (ISR)
  }).then(res => res.json());

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString('tr-TR')}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;

// Server Component Avantajları:
// ✅ Bundle size küçük (JS kodu client'a gönderilmez)
// ✅ SEO friendly (HTML olarak render edilir)
// ✅ Database/API erişimi doğrudan (auth token güvenli)
// ✅ Hızlı ilk yükleme (server rendering)
// ✅ Otomatik code splitting`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="client">
          <CodeBlock language="tsx" filename="components/SearchBar.tsx" highlightLines={[1]}>
{`'use client'; // Client Component directive (gerekli!)

// Client Component
// Browser'da render edilir, JavaScript bundle'a dahil edilir

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Client-side JavaScript (fetch, router push, etc)
    console.log('Searching for:', query);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="search"
        placeholder="Blog yazılarında ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="flex-1"
      />
      <Button onClick={handleSearch}>
        Ara
      </Button>
    </div>
  );
}

// Client Component Ne Zaman Kullanılır:
// ✅ State kullanımı (useState, useReducer)
// ✅ Event handlers (onClick, onChange, onSubmit)
// ✅ useEffect ve lifecycle hooks
// ✅ Browser API'leri (localStorage, window, etc)
// ✅ React Context
// ✅ Custom hooks`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="comparison">
          <ComparisonTable
            title="Server vs Client Components"
            rowLabels={[
              'Render Location',
              'JavaScript Bundle',
              'Data Fetching',
              'State Management',
              'Event Handlers',
              'Use Case'
            ]}
            columns={[
              {
                header: 'Server Component',
                rows: [
                  '🖥️ Sunucuda',
                  '✅ Küçük (sadece HTML)',
                  '✅ Doğrudan (async/await)',
                  '❌ Yok (stateless)',
                  '❌ Yok (no onClick)',
                  'Static content, SEO, data fetching'
                ]
              },
              {
                header: 'Client Component',
                rows: [
                  '💻 Tarayıcıda',
                  '📦 Büyük (JS dahil)',
                  '⚠️ useEffect ile',
                  '✅ Var (useState, etc)',
                  '✅ Var (onClick, onChange)',
                  'Interactive UI, forms, animations'
                ]
              }
            ]}
          />
        </TabsContent>
      </Tabs>

      <Callout type="warning" title="Best Practice: Varsayılan Server Component">
        Next.js 15\'te tüm component\'ler varsayılan olarak **Server Component**\'tir.
        Sadece interaktif özelliklere ihtiyacınız varsa <code>\'use client\'</code> ekleyin.
        Bu, bundle size\'ı küçültür ve performance\'ı artırır!
      </Callout>

      <h2>📱 Responsive Design (Mobile-First)</h2>

      <p>
        Tailwind CSS, responsive tasarımı son derece kolay hale getirir. Breakpoint prefix\'leri kullanarak
        farklı ekran boyutlarına özel stiller uygulayabilirsiniz:
      </p>

      <CodeBlock language="tsx" filename="components/ResponsiveGrid.tsx">
{`export function ResponsiveGrid() {
  return (
    <div className="
      // Mobile (default - prefix yok)
      grid grid-cols-1 gap-4 p-4

      // Tablet (768px+)
      md:grid-cols-2 md:gap-6 md:p-6

      // Desktop (1024px+)
      lg:grid-cols-3 lg:gap-8 lg:p-8

      // Large Desktop (1280px+)
      xl:grid-cols-4 xl:gap-10 xl:p-10
    ">
      <Card>Item 1</Card>
      <Card>Item 2</Card>
      <Card>Item 3</Card>
      <Card>Item 4</Card>
    </div>
  );
}

// Responsive Typography
function ResponsiveText() {
  return (
    <h1 className="
      text-2xl          // Mobile: 24px
      md:text-3xl       // Tablet: 30px
      lg:text-4xl       // Desktop: 36px
      xl:text-5xl       // Large: 48px

      font-bold
      leading-tight     // Line height

      mb-4              // Mobile: 16px margin
      md:mb-6           // Tablet: 24px
      lg:mb-8           // Desktop: 32px
    ">
      Responsive Başlık
    </h1>
  );
}

// Breakpoints (Tailwind default):
// sm:  640px+
// md:  768px+
// lg:  1024px+
// xl:  1280px+
// 2xl: 1536px+`}
      </CodeBlock>

      <h2>🎨 Dark Mode (Otomatik)</h2>

      <p>
        Tailwind CSS ve shadcn/ui ile dark mode desteği built-in. <code>dark:</code> prefix\'i
        kullanarak dark mode stilleri eklersiniz:
      </p>

      <CodeBlock language="tsx" filename="components/ThemeAwareCard.tsx">
{`export function ThemeAwareCard() {
  return (
    <div className="
      // Light mode (default)
      bg-white text-slate-900 border-slate-200

      // Dark mode (dark: prefix)
      dark:bg-slate-800 dark:text-white dark:border-slate-700

      rounded-lg border p-6
    ">
      <h2 className="
        text-2xl font-bold mb-4
        text-blue-600     // Light mode
        dark:text-blue-400 // Dark mode (daha açık ton)
      ">
        Dark Mode Destekli Başlık
      </h2>

      <p className="
        text-slate-600     // Light mode
        dark:text-slate-300 // Dark mode
      ">
        Bu metin hem light hem dark mode\'da güzel görünür.
      </p>
    </div>
  );
}

// Dark mode nasıl çalışır?
// 1. Tailwind config'de darkMode: 'class' ayarı
// 2. HTML root'a .dark class'ı eklenir
// 3. next-themes paketi ile otomatik theme switching`}
      </CodeBlock>

      <h2>⚡ Performance Best Practices</h2>

      <Callout type="tip" title="Production-Ready Optimizasyonlar">
        Bu best practice\'leri uygulayarak Google Lighthouse 95+ skor elde edebilirsiniz:
      </Callout>

      <div className="space-y-6 my-8">
        <div className="border-s-4 border-blue-500 ps-4">
          <h3 className="text-lg font-semibold mb-2">1. Image Optimization</h3>
          <CodeBlock language="tsx">
{`import Image from 'next/image';

// ❌ Kötü: Normal img tag
<img src="/hero.jpg" alt="Hero" />

// ✅ İyi: Next.js Image component
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Above-the-fold images için
  placeholder="blur" // Loading sırasında blur effect
/>`}
          </CodeBlock>
        </div>

        <div className="border-s-4 border-green-500 ps-4">
          <h3 className="text-lg font-semibold mb-2">2. Font Optimization</h3>
          <CodeBlock language="tsx" filename="app/layout.tsx">
{`import { Inter } from 'next/font/google';

// Next.js otomatik font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // FOUT önleme
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}`}
          </CodeBlock>
        </div>

        <div className="border-s-4 border-purple-500 ps-4">
          <h3 className="text-lg font-semibold mb-2">3. Code Splitting (Lazy Loading)</h3>
          <CodeBlock language="tsx">
{`import dynamic from 'next/dynamic';

// Heavy component'leri lazy load edin
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Yükleniyor...</div>,
  ssr: false // Client-side only
});

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart /> {/* İlk render'da yüklenmez */}
    </div>
  );
}`}
          </CodeBlock>
        </div>
      </div>

      <h2>✅ Kalite Kontrol (Linting & Type Check)</h2>

      <p>
        Kod kalitesini sürekli kontrol altında tutmak için şu komutları düzenli çalıştırın:
      </p>

      <CodeBlock language="bash">
{`# TypeScript type check
npm run typecheck

# ESLint ile kod kalitesi
npm run lint
npm run lint --fix  # Otomatik düzelt

# Tümünü birlikte (pre-commit hook için)
npm run typecheck && npm run lint

# Production build test
npm run build

# Lighthouse audit (performance)
npm run dev
# Chrome DevTools > Lighthouse > Run audit`}
      </CodeBlock>

      <h2>🎓 Özet ve Sonraki Adımlar</h2>

      <Callout type="success" title="Tebrikler! 🎉">
        Modern web tasarım stack\'inin temellerini öğrendiniz:
        <ul className="mt-3 space-y-1 text-sm">
          <li>✅ Next.js 15 Server Components ve App Router</li>
          <li>✅ Tailwind CSS v4 utility-first approach</li>
          <li>✅ shadcn/ui composition pattern</li>
          <li>✅ TypeScript type safety</li>
          <li>✅ Responsive design ve dark mode</li>
          <li>✅ Performance best practices</li>
        </ul>
      </Callout>

      <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border">
        <h3 className="text-xl font-bold mb-4">📚 Sonraki Dersler</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <strong>Advanced Tailwind Patterns:</strong> Custom utilities, plugins,
              design tokens, theme customization
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🧩</span>
            <div>
              <strong>shadcn Component Deep Dive:</strong> Form validation, dialog modals,
              data tables, command palette
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <strong>Next.js Production Deployment:</strong> Vercel deployment, environment
              variables, analytics, monitoring
            </div>
          </li>
        </ul>
      </div>

      <Callout type="info" title="Kaynak Kod ve Dökümanlar">
        <ul className="text-sm space-y-2">
          <li>📘 <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">Next.js Docs</a></li>
          <li>🎨 <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">Tailwind CSS Docs</a></li>
          <li>🧩 <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">shadcn/ui Components</a></li>
          <li>📦 <a href="https://github.com/shadcn-ui/ui" target="_blank" rel="noopener noreferrer">shadcn/ui GitHub</a></li>
        </ul>
      </Callout>
    </article>
  );
}
// AI:SAFE-EDIT END
