import type { LessonMeta } from '@/types/lesson';
import {
  Callout,
  CodeBlock,
  KeyConcepts,
  KeyConcept,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ComparisonTable,
} from '@/components/lesson/content';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'jsx-basics',
  title: 'JSX Temelleri',
  order: 2,
  section: 'fundamentals',
  description: 'JSX sözdiziminde ustalaşın ve JavaScript\'te HTML benzeri kod yazmayı öğrenin.',
  estimatedMinutes: 10,
  objectives: [
    'JSX\'in ne olduğunu ve normal JavaScript\'ten nasıl farklı olduğunu anlama',
    'JSX sözdizimi kurallarını ve yaygın kalıpları öğrenme',
    'JSX içinde ifadeler ve koşullar yazma'
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
    <article className="prose prose-slate max-w-none">
      <h1>JSX Temelleri</h1>

      <Callout type="info" title="JSX Nedir?">
        JSX (JavaScript XML), JavaScript için HTML benzeri kod yazmanıza olanak tanıyan
        bir sözdizimi uzantısıdır. UI bileşenleri oluşturmayı sezgisel ve okunabilir hale getirir.
      </Callout>

      <h2>JSX Nedir?</h2>
      <p>
        JSX, HTML'e benzer, ancak aslında JavaScript'tir. Kodunuz çalıştığında,
        JSX normal JavaScript fonksiyon çağrılarına dönüştürülerek React elementleri oluşturur.
      </p>

      <Tabs defaultValue="jsx">
        <TabsList>
          <TabsTrigger value="jsx">JSX Sözdizimi</TabsTrigger>
          <TabsTrigger value="js">JavaScript Çıktısı</TabsTrigger>
        </TabsList>

        <TabsContent value="jsx">
          <CodeBlock language="tsx">
{`// Bu JSX:
<h1>Merhaba, Dünya!</h1>`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="js">
          <CodeBlock language="js">
{`// Şuna dönüştürülür:
React.createElement('h1', null, 'Merhaba, Dünya!')`}
          </CodeBlock>
        </TabsContent>
      </Tabs>

      <h2>JSX Sözdizimi Kuralları</h2>
      <p>
        JSX'te uymanız gereken birkaç önemli kural vardır:
      </p>

      <KeyConcepts title="Temel JSX Kuralları">
        <KeyConcept term="Tek Üst Element">
          JSX ifadelerinin tek bir üst elementi olmalı (veya React Fragment kullanın)
        </KeyConcept>
        <KeyConcept term="Tüm Etiketleri Kapatın">
          Kendini kapatan etiketler /&gt; ile bitmelidir (örn: &lt;img /&gt;, &lt;br /&gt;)
        </KeyConcept>
        <KeyConcept term="className Kullanın">
          class yerine className kullanın (class JavaScript'te ayrılmış bir kelimedir)
        </KeyConcept>
        <KeyConcept term="camelCase Özellikler">
          Öznitelikler için camelCase kullanın (onclick yerine onClick)
        </KeyConcept>
      </KeyConcepts>

      <ComparisonTable
        title="HTML vs JSX Farkları"
        rowLabels={['Class özniteliği', 'Olay işleyiciler', 'Style özniteliği', 'Kendini kapatan etiketler']}
        columns={[
          {
            header: 'HTML',
            rows: [
              'class="button"',
              'onclick="handleClick()"',
              'style="color: red"',
              'Kapanış opsiyonel'
            ]
          },
          {
            header: 'JSX',
            rows: [
              'className="button"',
              'onClick={handleClick}',
              'style={{ color: "red" }}',
              'Tüm etiketler kapatılmalı'
            ]
          }
        ]}
      />

      <h2>İfadeleri Yerleştirme</h2>
      <p>
        JSX içinde herhangi bir JavaScript ifadesini süslü parantezler içine
        alarak yerleştirebilirsiniz:
      </p>

      <CodeBlock language="tsx" filename="Greeting.tsx" highlightLines={[2, 3, 7, 8]}>
{`function Greeting() {
  const name = 'Ahmet';
  const time = new Date().getHours();

  return (
    <div>
      <h1>Merhaba, {name}!</h1>
      <p>Şu anki saat: {time}</p>
      <p>Sonuç: {2 + 2}</p>
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="tip" title="İfadeler vs İfade Cümleleri">
        Süslü parantezler içinde yalnızca ifadeleri (bir değer döndüren şeyleri) kullanabilirsiniz,
        if/else veya for döngüleri gibi ifade cümlelerini kullanamazsınız. Bunun yerine üçlü operatör veya dizi metodlarını kullanın.
      </Callout>

      <h2>Koşullu Render</h2>
      <p>
        JavaScript koşullarını kullanarak farklı içerikleri render edebilirsiniz:
      </p>

      <CodeBlock language="tsx" filename="Welcome.tsx" highlightLines={[4, 5, 6, 7]}>
{`function Welcome({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Tekrar hoş geldiniz!</h1>
      ) : (
        <h1>Lütfen giriş yapın</h1>
      )}
    </div>
  );
}`}
      </CodeBlock>

      <h2>Listeleri Render Etme</h2>
      <p>
        Element listelerini render etmek için JavaScript'in <code>map()</code> fonksiyonunu kullanın:
      </p>

      <CodeBlock language="tsx" filename="FruitList.tsx" highlightLines={[6, 7, 8]}>
{`function FruitList() {
  const fruits = ['Elma', 'Muz', 'Portakal'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}`}
      </CodeBlock>

      <Callout type="warning" title="Key Prop">
        Listeleri render ederken her zaman benzersiz bir <code>key</code> prop'u sağlayın.
        Bu, React'in hangi öğelerin değiştiğini, eklendiğini veya çıkarıldığını belirlemesine yardımcı olur.
        Mümkün olduğunda index yerine benzersiz bir ID kullanın.
      </Callout>

      <Callout type="success" title="Harika!">
        Artık JSX sözdizimi kurallarını ve JavaScript ifadelerini nasıl yerleştireceğinizi anlıyorsunuz.
        Bir sonraki derste, React bileşenlerinde state yönetimini öğreneceğiz.
      </Callout>

      <h2>Önemli Çıkarımlar</h2>
      <p>
        JSX, mantığınızın yanında işaretleme (markup) yazmanıza izin vererek React kodunu
        daha okunabilir hale getirir. JSX sözdizimi kurallarını takip etmeyi unutmayın
        ve JavaScript ifadelerini yerleştirmek için süslü parantezler kullanın. Bir sonraki
        derste, React bileşenlerinde state yönetimini öğreneceğiz.
      </p>
    </article>
  );
}
// AI:SAFE-EDIT END
