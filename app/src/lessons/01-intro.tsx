import type { LessonMeta } from '@/types/lesson';

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

      <p>
        React, kullanıcı arayüzleri oluşturmak için bir JavaScript kütüphanesidir.
        Facebook tarafından oluşturulmuş ve şu anda Meta ve açık kaynak topluluğu
        tarafından sürdürülmektedir. React, modern web uygulamaları geliştirmek
        için en popüler araçlardan biri haline gelmiştir.
      </p>

      <h2>Neden React?</h2>
      <p>
        React, interaktif kullanıcı arayüzlerini yeniden kullanılabilir bileşenlere
        bölerek oluşturmayı kolaylaştırır. DOM'u doğrudan manipüle etmek yerine,
        kullanıcı arayüzünün nasıl görünmesi gerektiğini tanımlarsınız ve React
        güncellemeleri verimli bir şekilde yönetir.
      </p>

      <h3>Temel Avantajlar</h3>
      <ul>
        <li><strong>Bileşen Tabanlı:</strong> Kendi state'lerini yöneten kapsüllenmiş bileşenler oluşturun</li>
        <li><strong>Bildirimsel:</strong> Uygulamanızın her state'i için basit görünümler tasarlayın</li>
        <li><strong>Bir Kez Öğren, Her Yerde Kullan:</strong> React'i sunucuda, mobilde ve VR'da kullanın</li>
      </ul>

      <h2>İlk Bileşeniniz</h2>
      <p>
        Bir React bileşeni, JSX (JavaScript XML) döndüren bir JavaScript fonksiyonudur.
        İşte basit bir örnek:
      </p>

      <pre><code>{`function Welcome() {
  return <h1>Merhaba, React!</h1>;
}`}</code></pre>

      <p>
        Bu bileşen "Merhaba, React!" metnini içeren bir başlık oluşturur.
        Bu bileşeni uygulamanızın herhangi bir yerinde
        <code>&lt;Welcome /&gt;</code> yazarak kullanabilirsiniz.
      </p>

      <h2>Props: Veri İletme</h2>
      <p>
        Bileşenler "props" (properties'in kısaltması) adı verilen girdileri kabul edebilir.
        Props, üst bileşenlerden alt bileşenlere veri iletmenizi sağlar:
      </p>

      <pre><code>{`function Greeting(props) {
  return <h1>Merhaba, {props.name}!</h1>;
}

// Kullanım:
<Greeting name="Ayşe" />
// Çıktı: <h1>Merhaba, Ayşe!</h1>`}</code></pre>

      <h2>Sonraki Adımlar</h2>
      <p>
        Artık React bileşenlerinin ve props'ların temellerini anladığınıza göre,
        interaktif kullanıcı arayüzleri oluşturma konusunda daha derine inmeye hazırsınız.
        Bir sonraki derste, React bileşenlerini daha ayrıntılı olarak inceleyeceğiz.
      </p>
    </article>
  );
}
// AI:SAFE-EDIT END
