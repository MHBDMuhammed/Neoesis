import type { LessonMeta } from '@/types/lesson';
import {
  Callout,
  CodeBlock,
  KeyConcepts,
  KeyConcept,
  StepGuide,
  Step,
  ComparisonTable,
} from '@/components/lesson/content';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'intro-to-react',
  title: 'React\'e Giriş',
  order: 1,
  section: 'fundamentals',
  description: 'React\'in temellerini öğrenin: bileşenler, props ve state yönetimi temelleri.',
  estimatedMinutes: 12,
  objectives: [
    'React\'in ne olduğunu ve UI oluşturmak için neden yararlı olduğunu anlama',
    'Fonksiyon sözdizimi kullanarak ilk React bileşeninizi oluşturma',
    'Props kullanarak bileşenler arasında veri iletmeyi öğrenme'
  ],
  quiz: {
    id: 'quiz-intro-to-react',
    prompt: 'Hangi fonksiyon sözdizimi bir React bileşeni oluşturur?',
    type: 'single-choice',
    options: [
      'createElement()',
      'function MyComponent() {}',
      'new Component()',
      'class MyComponent extends Component {}'
    ],
    correctAnswer: 1,
    explanation: 'React bileşenleri, JSX döndüren normal JavaScript fonksiyonlarıdır. Modern React, sınıf bileşenlerinden ziyade fonksiyon bileşenlerini tercih eder.',
    maxAttempts: 3
  }
};

// AI:SAFE-EDIT START - Lesson content
export default function IntroLesson() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>React'e Giriş</h1>

      <Callout type="info" title="React Nedir?">
        React, kullanıcı arayüzleri oluşturmak için bir JavaScript kütüphanesidir.
        Facebook (Meta) tarafından 2013'te oluşturulmuş ve şu anda milyonlarca
        geliştirici tarafından kullanılmaktadır.
      </Callout>

      <p>
        React, modern web uygulamaları geliştirmek için en popüler araçlardan biri haline gelmiştir.
        Netflix, Instagram, WhatsApp ve daha pek çok büyük uygulama React ile geliştirilmiştir.
      </p>

      <h2>Neden React?</h2>
      <p>
        React, interaktif kullanıcı arayüzlerini yeniden kullanılabilir bileşenlere
        bölerek oluşturmayı kolaylaştırır. Karmaşık uygulamaları yönetilebilir parçalara
        ayırarak geliştirme sürecini hızlandırır.
      </p>

      <KeyConcepts title="React'in Temel Kavramları">
        <KeyConcept term="Bileşenler (Components)">
          Kullanıcı arayüzünüzün yeniden kullanılabilir yapı taşları. Her bileşen
          kendi mantığını ve görünümünü içerir.
        </KeyConcept>

        <KeyConcept term="Props">
          Bileşenler arasında veri aktarmak için kullanılan parametreler.
          Parent bileşenden child bileşene veri geçişi sağlar.
        </KeyConcept>

        <KeyConcept term="State">
          Bileşenin dahili verisi. State değiştiğinde, React bileşeni otomatik
          olarak yeniden render eder.
        </KeyConcept>

        <KeyConcept term="Virtual DOM">
          React'in performansı artırmak için kullandığı hafif DOM temsili.
          Değişiklikleri önce virtual DOM'da hesaplar, sonra gerçek DOM'a uygular.
        </KeyConcept>
      </KeyConcepts>

      <h2>İlk React Bileşeniniz</h2>
      <p>
        React bileşenleri, JSX döndüren JavaScript fonksiyonlarıdır. İşte basit bir örnek:
      </p>

      <CodeBlock language="tsx" filename="Welcome.tsx">
{`function Welcome() {
  return (
    <div>
      <h1>Merhaba, React!</h1>
      <p>İlk React bileşeninize hoş geldiniz.</p>
    </div>
  );
}

export default Welcome;`}
      </CodeBlock>

      <Callout type="tip" title="Fonksiyon vs Class Bileşenler">
        Modern React, fonksiyon bileşenlerini (function components) tercih eder.
        React Hooks ile birlikte, fonksiyon bileşenleri class bileşenlerle
        yapılabilen her şeyi yapabilir ve daha temizdir.
      </Callout>

      <h2>Props ile Veri Aktarımı</h2>
      <p>
        Props kullanarak bileşenler arasında veri aktarabilirsiniz:
      </p>

      <CodeBlock language="tsx" filename="Greeting.tsx" highlightLines={[1, 4]}>
{`function Greeting({ name }: { name: string }) {
  return <h1>Merhaba, {name}!</h1>;
}

// Kullanımı:
<Greeting name="Ahmet" />
<Greeting name="Ayşe" />`}
      </CodeBlock>

      <ComparisonTable
        title="React vs Vanilla JavaScript"
        rowLabels={['Kod Organizasyonu', 'UI Güncellemeleri', 'Yeniden Kullanılabilirlik', 'Öğrenme Eğrisi']}
        columns={[
          {
            header: 'Vanilla JavaScript',
            rows: [
              'Manuel DOM manipülasyonu',
              'Her değişiklik için kod yazmak gerekir',
              'Kodu yeniden kullanmak zor',
              'Temel JavaScript bilgisi yeterli'
            ]
          },
          {
            header: 'React',
            rows: [
              'Bileşen tabanlı yapı',
              'State değişince otomatik güncelleme',
              'Bileşenler kolayca yeniden kullanılır',
              'JSX ve React kavramlarını öğrenmek gerekir'
            ]
          }
        ]}
      />

      <h2>React ile Başlayın</h2>

      <StepGuide title="İlk React Projenizi Oluşturun">
        <Step number={1} title="Node.js Kurulumu">
          <p>
            Öncelikle bilgisayarınızda Node.js yüklü olduğundan emin olun.
            Node.js'i <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">nodejs.org</a> adresinden
            indirebilirsiniz.
          </p>
          <CodeBlock language="bash">
{`# Node.js versiyonunu kontrol edin
node --version
npm --version`}
          </CodeBlock>
        </Step>

        <Step number={2} title="Proje Oluşturun">
          <p>
            Create React App veya Vite ile yeni bir React projesi oluşturun:
          </p>
          <CodeBlock language="bash">
{`# Vite ile (önerilen - daha hızlı)
npm create vite@latest my-app -- --template react-ts

# Veya Create React App ile
npx create-react-app my-app --template typescript`}
          </CodeBlock>
        </Step>

        <Step number={3} title="Geliştirme Sunucusunu Başlatın">
          <p>
            Proje dizinine girin ve development server'ı başlatın:
          </p>
          <CodeBlock language="bash">
{`cd my-app
npm install
npm run dev`}
          </CodeBlock>
          <p>
            Tarayıcınızda <code>http://localhost:5173</code> (Vite) veya <code>http://localhost:3000</code> (CRA)
            adresini açarak uygulamanızı görün!
          </p>
        </Step>
      </StepGuide>

      <Callout type="warning" title="TypeScript Kullanımı">
        Bu derslerde TypeScript kullanacağız. TypeScript, JavaScript'e tip güvenliği
        ekler ve büyük uygulamalarda hataları erkenden yakalamanıza yardımcı olur.
        Endişelenmeyin - örneklerle birlikte öğreneceğiz!
      </Callout>

      <h2>Sonraki Adımlar</h2>
      <p>
        Tebrikler! React'in ne olduğunu ve nasıl başlayacağınızı öğrendiniz.
        Bir sonraki derste JSX (JavaScript XML) sözdizimini derinlemesine inceleyeceğiz.
      </p>

      <Callout type="success" title="Harika İş!">
        React yolculuğunuza başladınız! Sonraki derste JSX temelleri ve
        bileşen oluşturma konularını işleyeceğiz.
      </Callout>
    </article>
  );
}
// AI:SAFE-EDIT END
