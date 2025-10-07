# İçerik Bileşenleri Referansı

> **Kullanım:** Hem Baş Öğretmen hem Baş Mühendis bu dokümana referans verir.
> - **Öğretmen:** Hangi bileşenin NEREDE ve NEDEN kullanılacağını öğrenir
> - **Mühendis:** Bileşenlerin NASIL kodlanacağını öğrenir

---

## 📚 9 İçerik Bileşeni

### 1. Callout - Vurgulu Bilgi Kutuları

**Pedagojik Amaç:**
- Kritik bilgileri vurgulamak
- Yaygın hataları önceden uyarmak
- İpuçları ve hatırlatmalar sunmak

**Props:**
```typescript
interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'error' | 'tip';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<Callout type="warning" title="Dikkat!">
  Props değiştirilemez! Mutlaka yeni bir obje oluşturun.
</Callout>

<Callout type="tip">
  useState hook'u ile component state'i yönetebilirsiniz.
</Callout>
```

**Markdown İşaretçisi (Öğretmen için):**
```markdown
> **[CALLOUT:warning]**
> Props değiştirilemez!

> **[CALLOUT:tip]**
> useState hook'u kullanın.
```

---

### 2. CodeBlock - Sözdizimi Vurgulama

**Pedagojik Amaç:**
- Kod örnekleri göstermek
- Syntax öğretmek
- Kopyalanabilir kod sunmak

**Props:**
```typescript
interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<CodeBlock language="tsx" filename="App.tsx" highlightLines={[2, 3]}>
{`function App() {
  const [count, setCount] = useState(0);
  return <button>{count}</button>;
}`}
</CodeBlock>
```

**Markdown İşaretçisi:**
```markdown
**[CODEBLOCK: tsx, dosya: App.tsx, vurgula: 2-3]**
\`\`\`tsx
function App() {
  const [count, setCount] = useState(0);
  return <button>{count}</button>;
}
\`\`\`
```

**Desteklenen Diller:**
`typescript`, `javascript`, `tsx`, `jsx`, `python`, `rust`, `go`, `java`, `cpp`, `c`, `css`, `html`, `json`, `yaml`, `markdown`, `bash`, `sql`

---

### 3. KeyConcepts - Kavram Kartları

**Pedagojik Amaç:**
- Temel kavramları özetlemek
- Glossary oluşturmak
- Tekrar için özet sunmak

**Props:**
```typescript
interface KeyConceptsProps {
  title?: string;
  children: React.ReactNode; // KeyConcept bileşenleri
  className?: string;
}

interface KeyConceptProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<KeyConcepts title="React Temel Kavramları">
  <KeyConcept term="Component">
    React uygulamasının temel yapı taşı.
  </KeyConcept>
  <KeyConcept term="Props">
    Parent'tan child'a veri aktarımı.
  </KeyConcept>
</KeyConcepts>
```

**Markdown İşaretçisi:**
```markdown
**[KEYCONCEPTS: React Temel Kavramları]**
- **Component**: React uygulamasının temel yapı taşı.
- **Props**: Parent'tan child'a veri aktarımı.
```

**Layout:** 2-sütun grid (desktop), 1-sütun (mobile)

---

### 4. StepGuide - Adım Adım Kılavuz

**Pedagojik Amaç:**
- Sıralı işlemleri öğretmek
- Karmaşık süreçleri parçalara ayırmak
- Tutorial sunmak

**Props:**
```typescript
interface StepGuideProps {
  title?: string;
  children: React.ReactNode; // Step bileşenleri
  className?: string;
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<StepGuide title="React Projesine Başlama">
  <Step number={1} title="Proje Oluştur">
    <CodeBlock language="bash">npx create-react-app my-app</CodeBlock>
  </Step>
  <Step number={2} title="Projeyi Başlat">
    <CodeBlock language="bash">cd my-app && npm start</CodeBlock>
  </Step>
</StepGuide>
```

**Markdown İşaretçisi:**
```markdown
**[STEPGUIDE: React Projesine Başlama]**

**Adım 1: Proje Oluştur**
npx create-react-app my-app

**Adım 2: Projeyi Başlat**
cd my-app && npm start
```

**Özellikler:** Numaralı daireler, bağlantı çizgisi, stagger animasyon

---

### 5. Figure - Görseller

**Pedagojik Amaç:**
- Görsel öğrenmeyi desteklemek
- Diyagramlar göstermek
- Somut örnekler sunmak

**Props:**
```typescript
interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<Figure
  src="/images/react-tree.png"
  alt="React bileşen ağacı"
  caption="Şekil 1: React bileşenlerinin hiyerarşik yapısı"
  width={800}
  height={600}
/>
```

**Markdown İşaretçisi:**
```markdown
**[FIGURE: /images/react-tree.png]**
Alt: React bileşen ağacı
Caption: Şekil 1: React bileşenlerinin hiyerarşik yapısı
```

**Özellikler:** Next.js Image optimization, lazy loading, blur placeholder

---

### 6. ComparisonTable - Karşılaştırma Tablosu

**Pedagojik Amaç:**
- İki veya daha fazla kavramı karşılaştırmak
- Farklılıkları vurgulamak
- Karar verme becerisi geliştirmek

**Props:**
```typescript
interface ComparisonTableProps {
  title?: string;
  columns: {
    header: string;
    rows: (string | boolean | React.ReactNode)[];
  }[];
  rowLabels?: string[];
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<ComparisonTable
  title="Function vs Class Components"
  rowLabels={['Syntax', 'State', 'Lifecycle']}
  columns={[
    {
      header: 'Function',
      rows: ['function syntax', 'useState', 'useEffect']
    },
    {
      header: 'Class',
      rows: ['class syntax', 'this.state', 'componentDidMount']
    }
  ]}
/>
```

**Markdown İşaretçisi:**
```markdown
**[COMPARISONTABLE: Function vs Class]**

| Özellik | Function | Class |
|---------|----------|-------|
| Syntax | function | class |
| State | useState | this.state |
```

**Boolean rendering:** `true` → ✓ (yeşil), `false` → ✗ (kırmızı)

---

### 7. Tabs - Sekmeli İçerik

**Pedagojik Amaç:**
- Alternatif yaklaşımlar sunmak
- Alan tasarrufu yapmak
- Karşılaştırmalı öğrenme

**Props (shadcn/ui):**
```typescript
<Tabs defaultValue={string}>
  <TabsList>
    <TabsTrigger value={string}>Label</TabsTrigger>
  </TabsList>
  <TabsContent value={string}>Content</TabsContent>
</Tabs>
```

**Kullanım (TSX):**
```tsx
<Tabs defaultValue="function">
  <TabsList>
    <TabsTrigger value="function">Function</TabsTrigger>
    <TabsTrigger value="class">Class</TabsTrigger>
  </TabsList>
  <TabsContent value="function">
    <CodeBlock language="tsx">
      {`function Welcome() { return <h1>Hello</h1>; }`}
    </CodeBlock>
  </TabsContent>
  <TabsContent value="class">
    <CodeBlock language="tsx">
      {`class Welcome extends React.Component { render() { return <h1>Hello</h1>; } }`}
    </CodeBlock>
  </TabsContent>
</Tabs>
```

**Markdown İşaretçisi:**
```markdown
**[TABS: Function vs Class]**

**Tab: Function**
[İçerik]

**Tab: Class**
[İçerik]
```

---

### 8. Accordion - Katlanabilir Bölümler

**Pedagojik Amaç:**
- FAQ formatı sunmak
- Bilişsel yükü azaltmak
- İsteğe bağlı detaylar sağlamak

**Props (shadcn/ui):**
```typescript
<Accordion type="single" | "multiple" collapsible>
  <AccordionItem value={string}>
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Kullanım (TSX):**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>useState ne yapar?</AccordionTrigger>
    <AccordionContent>
      <p>State yönetimi sağlar.</p>
      <CodeBlock language="tsx">
        {`const [count, setCount] = useState(0);`}
      </CodeBlock>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Markdown İşaretçisi:**
```markdown
**[ACCORDION: Sık Sorulan Sorular]**

**Q: useState ne yapar?**
A: State yönetimi sağlar.
```

---

### 9. CodePlayground - İnteraktif Kod Editörü

**Pedagojik Amaç:**
- Yaparak öğrenmeyi sağlamak
- Deney yapma cesareti kazandırmak
- Anında geri bildirim vermek

**Props:**
```typescript
interface CodePlaygroundProps {
  initialCode: string;
  language?: string;
  className?: string;
}
```

**Kullanım (TSX):**
```tsx
<CodePlayground
  initialCode={`function greet(name) {
  return "Hello, " + name;
}

console.log(greet("World"));
// Kodu değiştirip Ctrl+Enter'a bas!
`}
  language="javascript"
/>
```

**Markdown İşaretçisi:**
```markdown
**[CODEPLAYGROUND: javascript]**
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("World"));
\`\`\`
```

**Özellikler:** Live editing, sandboxed execution, console output, Ctrl+Enter to run

---

## 📖 Import Bilgileri

**Tüm bileşenler:**
```tsx
import {
  Callout,
  CodeBlock,
  KeyConcepts,
  KeyConcept,
  StepGuide,
  Step,
  Figure,
  ComparisonTable,
  CodePlayground,
} from '@/components/lesson/content';

// Tabs ve Accordion shadcn/ui'dan:
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui';
```

---

## 🎨 Pedagojik Kullanım Önerileri

### Her Sayfa İçin İdeal Yapı

1. **Giriş:** Callout (info) - "Bu sayfada öğrenecekleriniz"
2. **Kavramlar:** KeyConcepts - Temel terimler
3. **Kod Örneği:** CodeBlock - Syntax gösterimi
4. **Uygulama:** StepGuide - Adım adım
5. **Deneme:** CodePlayground - Öğrenci denesin
6. **Karşılaştırma:** ComparisonTable veya Tabs - Alternatifler
7. **Dikkat:** Callout (warning) - Yaygın hatalar
8. **İleri Seviye:** Accordion - FAQ
9. **Özet:** KeyConcepts - Öğrenilenler

### Bileşen Kullanım Sıklığı

**Her sayfada:**
- 2-3 Callout (info, tip, warning)
- 1-2 KeyConcepts (başta ve sonda)
- 1-3 CodeBlock (kod ağırlıklı derslerde daha fazla)

**Gerektiğinde:**
- 1 StepGuide (adım adım işlemler için)
- 1 ComparisonTable veya Tabs (karşılaştırma için)
- 1 CodePlayground (programlama dersleri için)
- 1 Accordion (FAQ için, sayfa sonunda)
- 0-2 Figure (görseller gerektiğinde)

---

*Bu dokümantasyon hem Baş Öğretmen hem Baş Mühendis tarafından paylaşılır.*
