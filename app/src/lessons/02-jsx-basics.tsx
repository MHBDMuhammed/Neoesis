import type { LessonMeta } from '@/types/lesson';
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
  ComparisonTable,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/lesson/content';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'jsx-basics',
  title: 'JSX Temelleri ve JavaScript in JSX',
  order: 2,
  section: 'fundamentals',
  description: 'JSX sözdiziminde ustalaşın, JavaScript ifadelerini kullanın ve React\'te modern UI bileşenleri oluşturmayı öğrenin.',
  estimatedMinutes: 30,
  objectives: [
    'JSX\'in ne olduğunu ve JavaScript\'e nasıl dönüştürüldüğünü derinlemesine anlama',
    'JSX sözdizimi kuralları, koşullu rendering ve liste renderlamada uzmanlaşma',
    'Props, children, Fragment ve composition pattern\'lerini kullanma',
    'Event handling, key prop ve form yönetimi best practices',
    'Yaygın JSX hatalarını tespit edip düzeltme becerisini kazanma'
  ],
  quiz: {
    id: 'quiz-jsx-basics',
    prompt: 'JSX\'te JavaScript ifadesi kullanmanın doğru yolu nedir?',
    type: 'single-choice',
    options: [
      '{{ expression }}',
      '{ expression }',
      '(( expression ))',
      '${ expression }'
    ],
    correctAnswer: 1,
    explanation: 'JSX\'te, JavaScript ifadelerini tek süslü parantez kullanarak gömersiniz: { expression }. Bu, değişkenleri, fonksiyonları ve geçerli herhangi bir JavaScript ifadesini kullanmanıza olanak tanır.',
    maxAttempts: 3
  }
};

// AI:SAFE-EDIT START - Lesson content
export default function JsxBasicsLesson() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
          JSX Temelleri: JavaScript'te HTML Yazmak
        </h1>
        <p className="text-xl text-muted-foreground">
          JSX, React'in gücünü ortaya çıkaran sözdizimi uzantısıdır. Bu derste JSX'i derinlemesine
          öğrenecek, gerçek dünya örnekleriyle pratik yapacaksınız.
        </p>
      </div>

      <Callout type="info" title="JSX Nedir?">
        JSX (JavaScript XML), JavaScript içinde HTML benzeri kod yazmanıza olanak tanıyan
        bir sözdizimi uzantısıdır. React uygulamalarında UI bileşenleri oluşturmayı sezgisel
        ve okunabilir hale getirir. JSX opsiyoneldir ancak React ekosisteminde standart haline gelmiştir.
      </Callout>

      {/* Section 1: JSX Fundamentals */}
      <h2 id="jsx-nedir">1. JSX Nedir ve Neden Kullanılır?</h2>

      <p>
        JSX, JavaScript'in bir uzantısıdır ve HTML'e çok benzer bir sözdizimi sağlar.
        Ancak aslında JavaScript'tir ve kodunuz çalıştığında React.createElement()
        çağrılarına dönüştürülür.
      </p>

      <Tabs defaultValue="jsx">
        <TabsList>
          <TabsTrigger value="jsx">JSX Sözdizimi</TabsTrigger>
          <TabsTrigger value="js">JavaScript Çıktısı</TabsTrigger>
          <TabsTrigger value="dom">DOM Sonucu</TabsTrigger>
        </TabsList>

        <TabsContent value="jsx">
          <CodeBlock language="tsx" filename="Greeting.tsx">
{`function Greeting() {
  return <h1 className="title">Merhaba, Dünya!</h1>;
}`}
          </CodeBlock>
          <p className="mt-4">Temiz, okunabilir ve HTML'e çok benzer.</p>
        </TabsContent>

        <TabsContent value="js">
          <CodeBlock language="js" filename="Greeting.js">
{`function Greeting() {
  return React.createElement(
    'h1',
    { className: 'title' },
    'Merhaba, Dünya!'
  );
}`}
          </CodeBlock>
          <p className="mt-4">Babel/SWC, JSX'i bu hale dönüştürür.</p>
        </TabsContent>

        <TabsContent value="dom">
          <CodeBlock language="html">
{`<h1 class="title">Merhaba, Dünya!</h1>`}
          </CodeBlock>
          <p className="mt-4">Tarayıcıda oluşan HTML.</p>
        </TabsContent>
      </Tabs>

      <Callout type="tip" title="JSX Neden Daha İyi?">
        JSX kullanmak zorunda değilsiniz, ancak React.createElement() yazmaktan çok daha hızlı
        ve okunabilirdir. Özellikle karmaşık bileşenlerde fark büyük olur.
      </Callout>

      {/* Section 2: JSX Rules */}
      <h2 id="jsx-kurallari">2. JSX Sözdizimi Kuralları</h2>

      <p>
        JSX HTML'e benzer, ancak bazı önemli farklılıkları vardır. Bu kuralları bilmek
        hata yapmaktan kaçınmanızı sağlar.
      </p>

      <KeyConcepts title="Temel JSX Kuralları">
        <KeyConcept term="Tek Üst Element">
          JSX ifadelerinin tek bir kök (root) elementi olmalıdır. Birden fazla element
          döndürmek için Fragment kullanın veya bir div ile sarmalayın.
        </KeyConcept>

        <KeyConcept term="Tüm Etiketler Kapalı">
          HTML'de bazı etiketler (img, br, input) kapanış etiketi gerektirmez. JSX'te
          MUTLAKA kapatılmalı veya self-closing olmalıdır (örn: &lt;img /&gt;, &lt;br /&gt;).
        </KeyConcept>

        <KeyConcept term="className Kullanın">
          HTML'de class kullanırken, JSX'te className kullanmalısınız çünkü class
          JavaScript'te reserved keyword'dür.
        </KeyConcept>

        <KeyConcept term="camelCase Attribute'ler">
          HTML attribute'leri (onclick, tabindex) JSX'te camelCase olmalıdır (onClick, tabIndex).
          Tek istisna: data-* ve aria-* attribute'leri kebab-case kalır.
        </KeyConcept>

        <KeyConcept term="Inline Style = Obje">
          HTML'de style bir string'dir. JSX'te style bir JavaScript objesidir ve CSS
          property'leri camelCase yazılır.
        </KeyConcept>

        <KeyConcept term="JavaScript İfadeleri">
          JSX içinde JavaScript ifadeleri süslü parantez {} içine yazılır. Bu içinde değişken,
          fonksiyon çağrısı, ternary operator vs. kullanabilirsiniz.
        </KeyConcept>
      </KeyConcepts>

      <ComparisonTable
        title="HTML vs JSX: Kritik Farklar"
        rowLabels={[
          'Class tanımlama',
          'Event handler',
          'Style attribute',
          'Self-closing tags',
          'For attribute (label)',
          'Boolean attributes',
          'Comments'
        ]}
        columns={[
          {
            header: 'HTML',
            rows: [
              'class="btn primary"',
              'onclick="handleClick()"',
              'style="color: red; font-size: 16px"',
              '<img src="..."> veya <img src="..." />',
              '<label for="username">',
              '<input disabled>',
              '<!-- HTML yorum -->'
            ]
          },
          {
            header: 'JSX',
            rows: [
              'className="btn primary"',
              'onClick={handleClick}',
              'style={{ color: "red", fontSize: 16 }}',
              '<img src="..." /> (zorunlu)',
              '<label htmlFor="username">',
              '<input disabled={true} />',
              '{/* JSX yorum */}'
            ]
          }
        ]}
      />

      <Callout type="warning" title="Yaygın Hata: Çoklu Kök Element">
        <CodeBlock language="tsx">
{`// ❌ YANLIŞ - Çoklu kök element
function MyComponent() {
  return (
    <h1>Başlık</h1>
    <p>Paragraf</p>
  );
}

// ✅ DOĞRU - Fragment kullanımı
function MyComponent() {
  return (
    <>
      <h1>Başlık</h1>
      <p>Paragraf</p>
    </>
  );
}

// ✅ DOĞRU - Sarmalayıcı div
function MyComponent() {
  return (
    <div>
      <h1>Başlık</h1>
      <p>Paragraf</p>
    </div>
  );
}`}
        </CodeBlock>
      </Callout>

      {/* Section 3: JavaScript in JSX */}
      <h2 id="javascript-in-jsx">3. JSX İçinde JavaScript İfadeleri</h2>

      <p>
        JSX'in en güçlü özelliği, JavaScript ifadelerini doğrudan markup içinde kullanabilmenizdir.
        Süslü parantez {} içinde neredeyse her JavaScript ifadesi çalışır.
      </p>

      <h3>3.1 Değişkenleri Kullanma</h3>

      <CodeBlock language="tsx" filename="UserCard.tsx" highlightLines={[2, 3, 4, 8, 9, 10]}>
{`function UserCard() {
  const name = 'Ayşe Yılmaz';
  const age = 28;
  const profilePic = '/images/ayse.jpg';

  return (
    <div className="user-card">
      <img src={profilePic} alt={\`\${name} profil fotoğrafı\`} />
      <h2>{name}</h2>
      <p>Yaş: {age}</p>
    </div>
  );
}`}
      </CodeBlock>

      <h3>3.2 İfadeler ve Hesaplamalar</h3>

      <CodeBlock language="tsx" filename="ShoppingCart.tsx" highlightLines={[6, 7, 8, 13, 14, 15]}>
{`function ShoppingCart() {
  const items = [
    { name: 'Laptop', price: 15000, qty: 1 },
    { name: 'Mouse', price: 200, qty: 2 },
  ];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  return (
    <div>
      <h2>Sepet ({items.length} ürün)</h2>
      <p>Toplam: {total} TL</p>
      <p>KDV Dahil: {(total * 1.18).toFixed(2)} TL</p>
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="tip" title="İfade vs İfade Cümlesi">
        <p>Süslü parantez içinde sadece <strong>ifadeler</strong> (expressions) kullanılabilir:</p>
        <ul>
          <li>✅ Değişkenler: <code>{`{name}`}</code></li>
          <li>✅ Aritmetik: <code>{`{2 + 2}`}</code></li>
          <li>✅ Fonksiyon çağrısı: <code>{`{getName()}`}</code></li>
          <li>✅ Ternary: <code>{`{isActive ? 'Aktif' : 'Pasif'}`}</code></li>
          <li>❌ if/else: <code>{`{if (x) ... }`}</code> (çalışmaz!)</li>
          <li>❌ for loop: <code>{`{for ... }`}</code> (çalışmaz!)</li>
        </ul>
      </Callout>

      <h3>3.3 Fonksiyon Çağrıları</h3>

      <CodeBlock language="tsx" filename="DateDisplay.tsx" highlightLines={[2, 3, 4, 5, 11, 12]}>
{`function DateDisplay() {
  function formatDate(date: Date): string {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  return (
    <div>
      <p>Bugün: {formatDate(new Date())}</p>
      <p>Tarih formatı: {new Date().toISOString()}</p>
      <p>Unix timestamp: {Date.now()}</p>
    </div>
  );
}`}
      </CodeBlock>

      {/* Section 4: Conditional Rendering */}
      <h2 id="conditional-rendering">4. Koşullu Rendering (Conditional Rendering)</h2>

      <p>
        React'te koşula göre farklı UI render etmek çok yaygındır. JSX içinde if/else
        kullanamayacağınız için JavaScript'in koşullu ifadelerini kullanırsınız.
      </p>

      <h3>4.1 Ternary Operator (? :)</h3>

      <CodeBlock language="tsx" filename="LoginButton.tsx" highlightLines={[4, 5, 6, 7]}>
{`function LoginButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Çıkış Yap</button>
      ) : (
        <button>Giriş Yap</button>
      )}
    </div>
  );
}`}
      </CodeBlock>

      <h3>4.2 Logical AND (&&)</h3>

      <p>
        Bir koşul true ise element göster, false ise hiçbir şey gösterme senaryoları için ideal.
      </p>

      <CodeBlock language="tsx" filename="Notification.tsx" highlightLines={[5, 6]}>
{`function Notification({ hasNotifications, count }: { hasNotifications: boolean; count: number }) {
  return (
    <div>
      <h2>Bildirimler</h2>
      {hasNotifications && (
        <span className="badge">{count} yeni bildirim</span>
      )}
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="warning" title="Dikkat: Falsy Değerler">
        <p>
          && operatörü ile 0 veya "" kullanırken dikkatli olun:
        </p>
        <CodeBlock language="tsx">
{`// ❌ SORUN - count=0 olduğunda "0" yazısı görünür
{count && <span>{count} ürün</span>}

// ✅ ÇÖZÜM - Boolean dönüşümü yapın
{count > 0 && <span>{count} ürün</span>}
{Boolean(count) && <span>{count} ürün</span>}`}
        </CodeBlock>
      </Callout>

      <h3>4.3 Değişkene Atama Yöntemi</h3>

      <CodeBlock language="tsx" filename="WelcomeMessage.tsx" highlightLines={[4, 5, 6, 7, 8, 9, 10, 13]}>
{`function WelcomeMessage({ role }: { role: 'admin' | 'user' | 'guest' }) {
  let message;

  if (role === 'admin') {
    message = <h1>Admin Paneline Hoş Geldiniz</h1>;
  } else if (role === 'user') {
    message = <h1>Kullanıcı Sayfasına Hoş Geldiniz</h1>;
  } else {
    message = <h1>Misafir olarak giriş yaptınız</h1>;
  }

  return (
    <div>{message}</div>
  );
}`}
      </CodeBlock>

      <h3>4.4 Switch/Case Alternatifi: Object Mapping</h3>

      <CodeBlock language="tsx" filename="StatusBadge.tsx" highlightLines={[2, 3, 4, 5, 6, 7, 10]}>
{`function StatusBadge({ status }: { status: 'success' | 'error' | 'warning' | 'info' }) {
  const statusConfig = {
    success: { text: 'Başarılı', color: 'green' },
    error: { text: 'Hata', color: 'red' },
    warning: { text: 'Uyarı', color: 'yellow' },
    info: { text: 'Bilgi', color: 'blue' }
  };

  const config = statusConfig[status];

  return (
    <span className={\`badge bg-\${config.color}\`}>
      {config.text}
    </span>
  );
}`}
      </CodeBlock>

      {/* Section 5: Lists and Keys */}
      <h2 id="lists-and-keys">5. Listeleri Render Etme ve Key Prop</h2>

      <p>
        Dinamik veri listelerini render etmek React'te çok yaygındır. JavaScript'in
        <code>map()</code> fonksiyonu bu iş için mükemmeldir.
      </p>

      <h3>5.1 Basit Liste</h3>

      <CodeBlock language="tsx" filename="FruitList.tsx" highlightLines={[6, 7, 8]}>
{`function FruitList() {
  const fruits = ['Elma', 'Muz', 'Portakal', 'Çilek', 'Karpuz'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}`}
      </CodeBlock>

      <h3>5.2 Obje Listesi</h3>

      <CodeBlock language="tsx" filename="ProductList.tsx" highlightLines={[11, 12, 13, 14, 15, 16, 17]}>
{`interface Product {
  id: string;
  name: string;
  price: number;
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <div key={product.id} className="card">
          <h3>{product.name}</h3>
          <p className="price">{product.price} TL</p>
          <button>Sepete Ekle</button>
        </div>
      ))}
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="error" title="Key Prop: Kritik Önem!">
        <p>
          Liste render ederken her zaman benzersiz bir <code>key</code> prop kullanmalısınız:
        </p>
        <ul>
          <li>✅ <strong>İyi:</strong> Benzersiz ID kullanın (<code>key={`{item.id}`}</code>)</li>
          <li>⚠️ <strong>Kabul Edilebilir:</strong> Index kullanın, ancak sadece liste statikse ve yeniden sıralanmıyorsa</li>
          <li>❌ <strong>Kötü:</strong> Key kullanmamak (React uyarısı verir)</li>
          <li>❌ <strong>Kötü:</strong> Her render'da değişen bir değer (Math.random() gibi)</li>
        </ul>
        <p className="mt-4">
          <strong>Neden önemli?</strong> React, key'leri kullanarak hangi öğelerin değiştiğini,
          eklendiğini veya silindiğini anlar. Yanlış key kullanımı performans sorunlarına ve
          hatalı render'lara neden olabilir.
        </p>
      </Callout>

      <h3>5.3 Filtreleme ve Koşullu Liste</h3>

      <CodeBlock language="tsx" filename="TaskList.tsx" highlightLines={[10, 11, 12, 16, 17, 18, 19, 20]}>
{`interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function TaskList({ tasks }: { tasks: Task[] }) {
  // Sadece tamamlanmamış görevleri filtrele
  const pendingTasks = tasks.filter(task => !task.completed);

  // Boş liste kontrolü
  if (pendingTasks.length === 0) {
    return <p>Tüm görevler tamamlandı! 🎉</p>;
  }

  return (
    <ul>
      {pendingTasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}`}
      </CodeBlock>

      {/* Section 6: Fragments */}
      <h2 id="fragments">6. React Fragments: Gereksiz div'lerden Kurtulun</h2>

      <p>
        JSX'te birden fazla element döndürmek için bir parent element gerekir. Ancak
        bazen gereksiz div wrapper'ları DOM'u karmaşıklaştırır. Fragment bu sorunu çözer.
      </p>

      <ComparisonTable
        title="Fragment Kullanımı"
        rowLabels={['Syntax', 'Avantaj', 'Dezavantaj', 'Kullanım senaryosu']}
        columns={[
          {
            header: 'Uzun Syntax',
            rows: [
              '<React.Fragment>...</React.Fragment>',
              'Key prop alabilir',
              'Daha uzun kod',
              'Liste içinde fragment kullanımı'
            ]
          },
          {
            header: 'Kısa Syntax',
            rows: [
              '<>...</>',
              'Kısa ve temiz',
              'Key prop alamaz',
              'Genel kullanım'
            ]
          }
        ]}
      />

      <CodeBlock language="tsx" filename="Table.tsx" highlightLines={[4, 5, 6, 7, 8, 18, 19, 20, 21, 22]}>
{`function TableRows() {
  const data = [
    { id: 1, name: 'Ahmet', age: 25 },
    { id: 2, name: 'Mehmet', age: 30 }
  ];

  return (
    <>
      {data.map(person => (
        // Fragment ile key kullanımı
        <React.Fragment key={person.id}>
          <tr>
            <td>{person.name}</td>
            <td>{person.age}</td>
          </tr>
          <tr>
            <td colSpan={2}>Detay bilgiler...</td>
          </tr>
        </React.Fragment>
      ))}
    </>
  );
}`}
      </CodeBlock>

      {/* Section 7: Event Handling */}
      <h2 id="event-handling">7. Olay Yönetimi (Event Handling)</h2>

      <p>
        JSX'te event handler'lar camelCase yazılır ve fonksiyon referansı olarak verilir
        (string olarak değil).
      </p>

      <h3>7.1 Temel Event Handler</h3>

      <CodeBlock language="tsx" filename="Button.tsx" highlightLines={[2, 3, 4, 7]}>
{`function ClickButton() {
  function handleClick() {
    alert('Butona tıklandı!');
  }

  return (
    <button onClick={handleClick}>Tıkla</button>
  );
}`}
      </CodeBlock>

      <Callout type="warning" title="Yaygın Hata: Fonksiyonu Çağırmak">
        <CodeBlock language="tsx">
{`// ❌ YANLIŞ - Fonksiyon hemen çalışır
<button onClick={handleClick()}>Tıkla</button>

// ✅ DOĞRU - Fonksiyon referansı verilir
<button onClick={handleClick}>Tıkla</button>

// ✅ DOĞRU - Arrow function ile sarmalama (parametre gerekiyorsa)
<button onClick={() => handleClick('parametre')}>Tıkla</button>`}
        </CodeBlock>
      </Callout>

      <h3>7.2 Event Objesini Kullanma</h3>

      <CodeBlock language="tsx" filename="Form.tsx" highlightLines={[2, 3, 4, 5, 8]}>
{`function SearchInput() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    console.log('Arama:', value);
  }

  return (
    <input type="text" onChange={handleChange} placeholder="Ara..." />
  );
}`}
      </CodeBlock>

      <h3>7.3 Form Submission</h3>

      <CodeBlock language="tsx" filename="LoginForm.tsx" highlightLines={[2, 3, 4, 5, 6, 7, 10]}>
{`function LoginForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Sayfa yenilenmesini engelle

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    console.log('Giriş:', email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Giriş Yap</button>
    </form>
  );
}`}
      </CodeBlock>

      {/* Section 8: Props and Children */}
      <h2 id="props-children">8. Props ve Children Pattern</h2>

      <h3>8.1 Props ile Veri Aktarımı</h3>

      <CodeBlock language="tsx" filename="UserProfile.tsx" highlightLines={[1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15]}>
{`interface UserProfileProps {
  name: string;
  age: number;
  avatar?: string; // Opsiyonel
}

function UserProfile({ name, age, avatar = '/default-avatar.png' }: UserProfileProps) {
  return (
    <div className="profile">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{age} yaşında</p>
    </div>
  );
}

// Kullanım
<UserProfile name="Ayşe" age={25} />
<UserProfile name="Mehmet" age={30} avatar="/mehmet.jpg" />`}
      </CodeBlock>

      <h3>8.2 Children Prop</h3>

      <CodeBlock language="tsx" filename="Card.tsx" highlightLines={[1, 2, 3, 4, 7, 11, 12, 13, 14, 15]}>
{`interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Kullanım
<Card title="Kullanıcı Bilgileri">
  <p>Ayşe Yılmaz</p>
  <p>Frontend Developer</p>
  <button>Profil</button>
</Card>`}
      </CodeBlock>

      <h3>8.3 Spread Props</h3>

      <CodeBlock language="tsx" filename="Input.tsx" highlightLines={[1, 6]}>
{`function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="custom-input"
      {...props}
    />
  );
}

// Kullanım - tüm HTML input attribute'lerini destekler
<Input type="email" placeholder="E-posta" required />
<Input type="password" minLength={8} />`}
      </CodeBlock>

      {/* Section 9: Style in JSX */}
      <h2 id="styling">9. JSX'te Styling</h2>

      <h3>9.1 Inline Styles</h3>

      <CodeBlock language="tsx" filename="StyledComponent.tsx" highlightLines={[2, 3, 4, 5, 6, 9, 10, 11]}>
{`function StyledBox() {
  const boxStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem',
    borderRadius: '0.5rem'
  };

  return (
    <div style={boxStyle}>
      Styled Box
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="tip" title="Inline Style Kuralları">
        <ul>
          <li>CSS property'leri camelCase yazılır: <code>backgroundColor</code>, <code>fontSize</code></li>
          <li>Değerler string veya number: <code>{`{{ width: '100px' }}`}</code> veya <code>{`{{ width: 100 }}`}</code></li>
          <li>Number değerler otomatik px olur (width, height vs.): <code>{`{{ width: 100 }}`}</code> → "100px"</li>
          <li>Çift süslü parantez: <code>{`style={{ ... }}`}</code> (dış {} JSX ifadesi, iç {} JavaScript objesi)</li>
        </ul>
      </Callout>

      <h3>9.2 className ile CSS</h3>

      <CodeBlock language="tsx" filename="Button.tsx" highlightLines={[7, 8, 9, 10, 11]}>
{`function Button({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button className={\`\${baseClass} \${variantClass}\`}>
      Tıkla
    </button>
  );
}`}
      </CodeBlock>

      <h3>9.3 Conditional Classes (cn helper)</h3>

      <CodeBlock language="tsx" filename="Alert.tsx" highlightLines={[1, 7, 8, 9, 10, 11, 12]}>
{`import { cn } from '@/lib/utils'; // Tailwind + clsx helper

function Alert({ type, children }: { type: 'info' | 'error'; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg', // Base classes
        type === 'info' && 'bg-blue-100 text-blue-900',
        type === 'error' && 'bg-red-100 text-red-900'
      )}
    >
      {children}
    </div>
  );
}`}
      </CodeBlock>

      {/* Section 10: Best Practices */}
      <h2 id="best-practices">10. JSX Best Practices</h2>

      <StepGuide title="JSX Yazımında En İyi Pratikler">
        <Step number={1} title="Bileşenleri Küçük Tutun">
          <p>
            Her bileşen tek bir şey yapmalı. Çok büyük bileşenleri daha küçük, yeniden
            kullanılabilir parçalara bölün.
          </p>
          <CodeBlock language="tsx">
{`// ✅ İyi
function ProductCard({ product }) {
  return (
    <div>
      <ProductImage src={product.image} />
      <ProductInfo name={product.name} price={product.price} />
      <AddToCartButton productId={product.id} />
    </div>
  );
}`}
          </CodeBlock>
        </Step>

        <Step number={2} title="Prop Destructuring Kullanın">
          <p>Props'u destructure ederek daha temiz kod yazın.</p>
          <CodeBlock language="tsx">
{`// ❌ Kötü
function User(props) {
  return <h1>{props.name}</h1>;
}

// ✅ İyi
function User({ name }) {
  return <h1>{name}</h1>;
}`}
          </CodeBlock>
        </Step>

        <Step number={3} title="Key Prop'u Doğru Kullanın">
          <p>Liste render ederken her zaman benzersiz, stabil key kullanın.</p>
          <CodeBlock language="tsx">
{`// ❌ Kötü - index
{items.map((item, i) => <div key={i}>...</div>)}

// ❌ Kötü - random
{items.map(item => <div key={Math.random()}>...</div>)}

// ✅ İyi - benzersiz ID
{items.map(item => <div key={item.id}>...</div>)}`}
          </CodeBlock>
        </Step>

        <Step number={4} title="Event Handler İsimlendirme">
          <p>Event handler'ları <code>handle</code> ile başlatın.</p>
          <CodeBlock language="tsx">
{`function Form() {
  const handleSubmit = () => { ... };
  const handleChange = () => { ... };
  const handleCancel = () => { ... };

  return <form onSubmit={handleSubmit}>...</form>;
}`}
          </CodeBlock>
        </Step>

        <Step number={5} title="Koşulları Erken Return ile Basitleştirin">
          <p>Karmaşık koşullu rendering yerine early return kullanın.</p>
          <CodeBlock language="tsx">
{`function UserList({ users }) {
  // Early return ile boş durum kontrolü
  if (!users || users.length === 0) {
    return <p>Kullanıcı bulunamadı</p>;
  }

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`}
          </CodeBlock>
        </Step>
      </StepGuide>

      {/* Section 11: Common Mistakes */}
      <h2 id="common-mistakes">11. Yaygın JSX Hataları ve Çözümleri</h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="mistake-1">
          <AccordionTrigger>1. Süslü Parantezi Unutmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - name string olarak yazılır
<h1>name</h1>

// ✅ DOĞRU - name değişkeni kullanılır
<h1>{name}</h1>`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-2">
          <AccordionTrigger>2. class Yerine className Kullanmamak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ
<div class="container">...</div>

// ✅ DOĞRU
<div className="container">...</div>`}
            </CodeBlock>
            <p className="mt-4">
              <code>class</code> JavaScript'te reserved keyword olduğu için JSX'te
              <code>className</code> kullanılır.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-3">
          <AccordionTrigger>3. Self-Closing Tag'leri Kapatmamak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ
<img src="photo.jpg">
<input type="text">

// ✅ DOĞRU
<img src="photo.jpg" />
<input type="text" />`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-4">
          <AccordionTrigger>4. Return İfadesinde Parantez Unutmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - automatic semicolon insertion sorunu
function Component() {
  return
    <div>Hello</div>
}

// ✅ DOĞRU - parantez ile sarmalama
function Component() {
  return (
    <div>Hello</div>
  );
}`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-5">
          <AccordionTrigger>5. Map'te Key Kullanmamak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - key yok
{items.map(item => <div>{item}</div>)}

// ✅ DOĞRU - benzersiz key
{items.map(item => <div key={item.id}>{item}</div>)}`}
            </CodeBlock>
            <Callout type="info">
              React, key olmadan liste elemanlarını doğru şekilde track edemez ve
              performans sorunları yaşanır.
            </Callout>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-6">
          <AccordionTrigger>6. Style Attribute'ünü String Olarak Yazmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - string
<div style="color: red">...</div>

// ✅ DOĞRU - obje
<div style={{ color: 'red' }}>...</div>`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-7">
          <AccordionTrigger>7. Boolean Attribute'leri Yanlış Yazmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - string "true"
<input disabled="true" />

// ✅ DOĞRU - boolean
<input disabled={true} />

// ✅ DOĞRU - kısa syntax
<input disabled />`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Section 12: Summary */}
      <h2 id="summary">12. Özet ve Sırada Ne Var?</h2>

      <Callout type="success" title="Tebrikler! JSX'te Uzmanlaştınız">
        <p>Bu derste şunları öğrendiniz:</p>
        <ul>
          <li>✅ JSX'in ne olduğu ve JavaScript'e nasıl dönüştüğü</li>
          <li>✅ JSX sözdizimi kuralları ve HTML'den farkları</li>
          <li>✅ JavaScript ifadelerini JSX içinde kullanma</li>
          <li>✅ Koşullu rendering teknikleri (ternary, &&, if/else)</li>
          <li>✅ Liste rendering ve key prop'unun önemi</li>
          <li>✅ Fragment kullanımı ve gereksiz wrapper'lardan kurtulma</li>
          <li>✅ Event handling ve form yönetimi</li>
          <li>✅ Props, children ve composition pattern'leri</li>
          <li>✅ JSX'te styling (inline, className)</li>
          <li>✅ Best practices ve yaygın hatalardan kaçınma</li>
        </ul>
      </Callout>

      <div className="not-prose mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-xl font-bold mb-2">Sırada Ne Var?</h3>
        <p className="text-muted-foreground mb-4">
          Bir sonraki derste <strong>React State ve Hooks</strong> konusuna dalacağız.
          Bileşenlerinizin interaktif hale gelmesi için state yönetimini öğreneceksiniz.
        </p>
        <ul className="space-y-2">
          <li>🎯 useState hook ile state yönetimi</li>
          <li>🎯 Event handler'lar ile state güncelleme</li>
          <li>🎯 Controlled vs Uncontrolled components</li>
          <li>🎯 State lifting ve component iletişimi</li>
        </ul>
      </div>

      <div className="not-prose mt-8">
        <Callout type="tip" title="Pratik Yapın!">
          <p>
            JSX öğrenmenin en iyi yolu pratik yapmaktır. Şimdi kendi bileşenlerinizi oluşturmayı deneyin:
          </p>
          <ul className="mt-4 space-y-2">
            <li>📝 Bir kullanıcı profil kartı bileşeni yapın</li>
            <li>📝 Liste filtreleme özelliği ekleyin</li>
            <li>📝 Koşullu rendering ile farklı UI durumları gösterin</li>
            <li>📝 Form component'i oluşturun</li>
          </ul>
        </Callout>
      </div>
    </article>
  );
}
// AI:SAFE-EDIT END
