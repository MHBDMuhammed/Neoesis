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
  slug: 'state-basics',
  title: 'React State ve useState Hook',
  order: 3,
  section: 'fundamentals',
  description: 'React state kullanarak interaktif bileşenler oluşturun. useState hook ile state yönetimini, state güncelleme pattern lerini ve best practices i öğrenin.',
  estimatedMinutes: 35,
  objectives: [
    'State kavramını ve React te nasıl çalıştığını derinlemesine anlama',
    'useState hook ile state oluşturma, okuma ve güncelleme',
    'Farklı veri tipleriyle (string, number, object, array) state yönetimi',
    'Asenkron state güncellemeleri ve functional update pattern',
    'State lifting, controlled components ve best practices'
  ],
  quiz: {
    id: 'quiz-state-basics',
    prompt: 'Bir fonksiyon bileşenine state eklemek için hangi hook u kullanırsınız?',
    type: 'single-choice',
    options: [
      'useEffect()',
      'useState()',
      'createState()',
      'useReducer()'
    ],
    correctAnswer: 1,
    explanation: 'useState hook u, fonksiyon bileşenlerine state eklemenin birincil yoludur. Mevcut state değerini ve onu güncellemek için bir fonksiyonu döndürür.',
    maxAttempts: 3
  }
};

// AI:SAFE-EDIT START - Lesson content
export default function StateBasicsLesson() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
          React State: Bileşenleri Canlı Hale Getirin
        </h1>
        <p className="text-xl text-muted-foreground">
          State, React bileşenlerinize hafıza ve interaktivite kazandırır. Bu derste useState
          hook'unu öğrenecek ve gerçek dünya uygulamalarıyla pratik yapacaksınız.
        </p>
      </div>

      <Callout type="info" title="State Nedir?">
        State, bir bileşenin zaman içinde değişebilen hafızasıdır. Kullanıcı etkileşimleri,
        API çağrıları veya zamanlayıcılar gibi olaylara yanıt olarak değişir. State
        değiştiğinde, React otomatik olarak bileşeni yeniden render eder ve UI'yı günceller.
      </Callout>

      {/* Section 1: State Fundamentals */}
      <h2 id="state-nedir">1. State Kavramını Anlamak</h2>

      <p>
        React'te state, bileşenin renderlar arasında hatırladığı değerlerdir. Düşünün ki bir
        sayaç var: butona her tıkladığınızda değer artıyor. Bu değerin bir yerde saklanması
        ve değiştiğinde UI'ın güncellenmesi gerekir. İşte state bunun için vardır.
      </p>

      <ComparisonTable
        title="Props vs State"
        rowLabels={[
          'Tanım',
          'Kimden gelir?',
          'Değiştirilebilir mi?',
          'Component re-render?',
          'Kullanım amacı'
        ]}
        columns={[
          {
            header: 'Props',
            rows: [
              'Parent\'tan gelen veri',
              'Parent component',
              'Hayır (read-only)',
              'Parent değişirse',
              'Bileşenler arası veri aktarımı'
            ]
          },
          {
            header: 'State',
            rows: [
              'Bileşenin kendi verisi',
              'Bileşenin içinde',
              'Evet (setState ile)',
              'State değişince',
              'Bileşen içi dinamik veri'
            ]
          }
        ]}
      />

      <h3>1.1 State Olmadan Ne Olur?</h3>

      <CodeBlock language="tsx" filename="NoState.tsx" highlightLines={[2, 3, 9]}>
{`// ❌ Bu çalışmaz - değişken güncellenince UI güncellenMEZ
function BrokenCounter() {
  let count = 0; // Normal değişken, state değil!

  function handleClick() {
    count = count + 1;
    console.log(count); // Console'da artıyor
    // Ama UI güncellenmiyor çünkü React render'ı tetiklemiyor!
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Arttır</button>
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="warning" title="Neden Çalışmaz?">
        Normal değişkenler render'lar arasında kaybolur ve değiştiğinde React yeniden
        render tetiklemez. UI'ın güncellenmesi için React'in state değişikliğinden haberdar
        olması gerekir.
      </Callout>

      {/* Section 2: useState Hook */}
      <h2 id="usestate-hook">2. useState Hook: Temel Kullanım</h2>

      <p>
        <code>useState</code> hook'u, fonksiyon bileşenlerine state eklemek için React'in
        sağladığı bir araçtır. İki değer döndürür: mevcut state ve onu güncelleyen fonksiyon.
      </p>

      <h3>2.1 İlk State Değişkeniniz</h3>

      <CodeBlock language="tsx" filename="Counter.tsx" highlightLines={[1, 5, 11]}>
{`import { useState } from 'react';

function Counter() {
  // useState(initialValue) → [currentValue, setterFunction]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Sayı: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Arttır
      </button>
    </div>
  );
}`}
      </CodeBlock>

      <KeyConcepts title="useState Anatomisi">
        <KeyConcept term="useState(0)">
          Hook çağrısı. Parantez içindeki 0, initial (başlangıç) değeridir. İlk render'da
          count bu değeri alır.
        </KeyConcept>

        <KeyConcept term="[count, setCount]">
          Array destructuring. useState bir dizi döndürür: [0] mevcut değer, [1] setter fonksiyon.
          İsimleri istediğiniz gibi verebilirsiniz.
        </KeyConcept>

        <KeyConcept term="count">
          Mevcut state değeri. Bu değeri JSX'te kullanabilir, if statement'lerde kontrol
          edebilir, başka fonksiyonlara gönderebilirsiniz.
        </KeyConcept>

        <KeyConcept term="setCount">
          State'i güncelleyen fonksiyon. Çağırdığınızda React yeniden render tetikler.
          Genelde "set" + state ismi formatında adlandırılır.
        </KeyConcept>

        <KeyConcept term="Re-render">
          setCount çağrıldığında, React component fonksiyonunu tekrar çalıştırır (re-render).
          Bu sefer count yeni değeri alır ve UI güncellenir.
        </KeyConcept>
      </KeyConcepts>

      <h3>2.2 useState Nasıl Çalışır?</h3>

      <StepGuide title="useState Akışı">
        <Step number={1} title="İlk Render">
          <p>
            Component ilk kez render edildiğinde, <code>useState(0)</code> çağrılır.
            React bu bileşen için state oluşturur ve initial değeri (0) saklar.
          </p>
          <CodeBlock language="tsx">
{`// İlk render
const [count, setCount] = useState(0);
// count = 0`}
          </CodeBlock>
        </Step>

        <Step number={2} title="Kullanıcı Etkileşimi">
          <p>
            Kullanıcı butona tıklar. Event handler çalışır ve <code>setCount</code> çağrılır.
          </p>
          <CodeBlock language="tsx">
{`<button onClick={() => setCount(1)}>
  // Kullanıcı tıkladı
  // setCount(1) çağrıldı
</button>`}
          </CodeBlock>
        </Step>

        <Step number={3} title="State Güncelleme">
          <p>
            React, yeni state değerini (1) kaydeder ve bileşeni yeniden render etmek için
            kuyruğa alır.
          </p>
        </Step>

        <Step number={4} title="Re-render">
          <p>
            React component fonksiyonunu tekrar çalıştırır. Bu sefer <code>useState</code>
            initial değer yerine güncel değeri (1) döndürür.
          </p>
          <CodeBlock language="tsx">
{`// İkinci render
const [count, setCount] = useState(0);
// count = 1 (initial değer ignore edilir)`}
          </CodeBlock>
        </Step>

        <Step number={5} title="UI Güncellenir">
          <p>
            Yeni JSX render edilir ve DOM'a uygulanır. Kullanıcı güncel değeri görür.
          </p>
        </Step>
      </StepGuide>

      {/* Section 3: Updating State */}
      <h2 id="state-guncelleme">3. State Güncelleme Pattern'leri</h2>

      <h3>3.1 Direct Update (Doğrudan Güncelleme)</h3>

      <CodeBlock language="tsx" filename="DirectUpdate.tsx" highlightLines={[6, 11]}>
{`function Toggle() {
  const [isOn, setIsOn] = useState(false);

  function handleToggle() {
    // Yeni değeri doğrudan verin
    setIsOn(!isOn);
  }

  return (
    <button onClick={handleToggle}>
      {isOn ? 'Açık' : 'Kapalı'}
    </button>
  );
}`}
      </CodeBlock>

      <h3>3.2 Functional Update (Fonksiyonel Güncelleme)</h3>

      <p>
        Eğer yeni state, önceki state'e bağlıysa, functional update kullanmalısınız.
        Bu, asenkron güncellemelerde doğru değeri garanti eder.
      </p>

      <CodeBlock language="tsx" filename="FunctionalUpdate.tsx" highlightLines={[5, 6, 7]}>
{`function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // Fonksiyon olarak verin: prevState => newState
    setCount(prevCount => prevCount + 1);
  }

  return <button onClick={increment}>Count: {count}</button>;
}`}
      </CodeBlock>

      <Callout type="tip" title="Ne Zaman Functional Update?">
        <ul>
          <li>✅ Yeni state, önceki state'e bağlıysa: <code>setCount(c =&gt; c + 1)</code></li>
          <li>✅ Birden fazla güncelleme aynı anda oluyorsa</li>
          <li>✅ Event handler içinde closure sorunu yaşıyorsanız</li>
          <li>⚠️ Basit atamalar için: <code>setName('John')</code> yeterli</li>
        </ul>
      </Callout>

      <h3>3.3 Dikkat: Birden Fazla Güncelleme</h3>

      <Tabs defaultValue="wrong">
        <TabsList>
          <TabsTrigger value="wrong">Yanlış Yöntem</TabsTrigger>
          <TabsTrigger value="right">Doğru Yöntem</TabsTrigger>
        </TabsList>

        <TabsContent value="wrong">
          <CodeBlock language="tsx">
{`function handleClick() {
  setCount(count + 1); // count = 0, queue: 1
  setCount(count + 1); // count = 0, queue: 1 (tekrar!)
  setCount(count + 1); // count = 0, queue: 1 (tekrar!)
  // Sonuç: count = 1 (3 değil!)
}`}
          </CodeBlock>
          <Callout type="error">
            Üç kez çağrılsa da count sadece 1 artar çünkü her satır aynı <code>count</code>
            değerini (0) kullanır.
          </Callout>
        </TabsContent>

        <TabsContent value="right">
          <CodeBlock language="tsx">
{`function handleClick() {
  setCount(c => c + 1); // queue: prev => prev + 1
  setCount(c => c + 1); // queue: prev => prev + 1
  setCount(c => c + 1); // queue: prev => prev + 1
  // Sonuç: count = 3 ✓
}`}
          </CodeBlock>
          <Callout type="success">
            Functional update, her güncellemenin en son değeri kullanmasını garanti eder.
          </Callout>
        </TabsContent>
      </Tabs>

      {/* Section 4: Different Data Types */}
      <h2 id="veri-tipleri">4. Farklı Veri Tipleriyle State</h2>

      <h3>4.1 Primitive Değerler (String, Number, Boolean)</h3>

      <CodeBlock language="tsx" filename="PrimitiveState.tsx" highlightLines={[2, 3, 4, 7, 8, 9]}>
{`function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
      <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
    </div>
  );
}`}
      </CodeBlock>

      <h3>4.2 Object State (Obje Durumu)</h3>

      <p>
        Object state kullanırken <strong>immutability</strong> (değişmezlik) prensibi çok
        önemlidir. State'i asla doğrudan değiştirmeyin, her zaman yeni bir obje oluşturun.
      </p>

      <CodeBlock language="tsx" filename="ObjectState.tsx" highlightLines={[2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18]}>
{`function UserProfile() {
  const [user, setUser] = useState({
    name: 'Ahmet',
    email: 'ahmet@example.com',
    age: 25
  });

  function updateName(newName: string) {
    setUser({
      ...user,        // Eski değerleri kopyala
      name: newName   // Sadece name'i değiştir
    });
  }

  function updateEmail(newEmail: string) {
    setUser(prev => ({
      ...prev,
      email: newEmail
    }));
  }

  return (
    <div>
      <input value={user.name} onChange={e => updateName(e.target.value)} />
      <input value={user.email} onChange={e => updateEmail(e.target.value)} />
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="error" title="ASLA Böyle Yapmayın!">
        <CodeBlock language="tsx">
{`// ❌ YANLIŞ - state'i doğrudan değiştirmek
function updateName(newName) {
  user.name = newName;  // YANLIŞ!
  setUser(user);        // React bu değişikliği fark etmez!
}

// ❌ YANLIŞ - objeyi mutate etmek
function updateAge() {
  user.age = 26;  // YANLIŞ!
  // Re-render tetiklenmez!
}`}
        </CodeBlock>
      </Callout>

      <h3>4.3 Array State (Dizi Durumu)</h3>

      <p>
        Array state'i güncellerken de immutability önemlidir. push, pop, splice gibi
        mutating metodlar yerine map, filter, spread operator kullanın.
      </p>

      <CodeBlock language="tsx" filename="ArrayState.tsx" highlightLines={[5, 6, 7, 8, 11, 12, 13, 16, 17, 18, 21, 22, 23, 24, 25, 26]}>
{`function TodoList() {
  const [todos, setTodos] = useState(['Alışveriş', 'Spor', 'Okuma']);

  // ✅ Ekleme - spread operator
  function addTodo(text: string) {
    setTodos([...todos, text]);
    // veya: setTodos(prev => [...prev, text]);
  }

  // ✅ Silme - filter
  function removeTodo(index: number) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  // ✅ Güncelleme - map
  function updateTodo(index: number, newText: string) {
    setTodos(todos.map((todo, i) => i === index ? newText : todo));
  }

  // ✅ Başa ekleme
  function prependTodo(text: string) {
    setTodos([text, ...todos]);
  }

  return (
    <ul>
      {todos.map((todo, i) => (
        <li key={i}>
          {todo}
          <button onClick={() => removeTodo(i)}>Sil</button>
        </li>
      ))}
    </ul>
  );
}`}
      </CodeBlock>

      <Callout type="warning" title="Array Mutating Metodlarını Kullanmayın">
        <ComparisonTable
          title="Array İşlemleri"
          rowLabels={['Ekleme', 'Silme', 'Güncelleme', 'Sıralama', 'Ters çevirme']}
          columns={[
            {
              header: 'Mutating (YANLIŞ)',
              rows: [
                'arr.push(item)',
                'arr.pop(), arr.splice()',
                'arr[i] = newValue',
                'arr.sort()',
                'arr.reverse()'
              ]
            },
            {
              header: 'Immutable (DOĞRU)',
              rows: [
                '[...arr, item]',
                'arr.filter((_, i) => i !== index)',
                'arr.map((item, i) => i === index ? new : item)',
                '[...arr].sort()',
                '[...arr].reverse()'
              ]
            }
          ]}
        />
      </Callout>

      {/* Section 5: Controlled Components */}
      <h2 id="controlled-components">5. Controlled Components (Kontrollü Bileşenler)</h2>

      <p>
        Controlled component, değeri React state'inden gelen bir form elementidir.
        Bu yaklaşım, form verileriniz üzerinde tam kontrol sağlar.
      </p>

      <h3>5.1 Controlled Input</h3>

      <CodeBlock language="tsx" filename="ControlledInput.tsx" highlightLines={[2, 7, 8, 9]}>
{`function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        value={query}              // State'ten gelir
        onChange={e => setQuery(e.target.value)} // Her tuşta state güncellenir
        placeholder="Ara..."
      />
      <p>Arama: {query}</p>
    </div>
  );
}`}
      </CodeBlock>

      <h3>5.2 Controlled Form</h3>

      <CodeBlock language="tsx" filename="ControlledForm.tsx" highlightLines={[2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 18, 22, 26]}>
{`function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form data:', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Kullanıcı adı"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="E-posta"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Şifre"
      />
      <label>
        <input
          name="agreeTerms"
          type="checkbox"
          checked={formData.agreeTerms}
          onChange={handleChange}
        />
        Şartları kabul ediyorum
      </label>
      <button type="submit" disabled={!formData.agreeTerms}>
        Kayıt Ol
      </button>
    </form>
  );
}`}
      </CodeBlock>

      {/* Section 6: State Lifting */}
      <h2 id="state-lifting">6. State Lifting (State'i Yukarı Taşıma)</h2>

      <p>
        Bazen birden fazla bileşenin aynı state'i paylaşması gerekir. Bu durumda state'i
        ortak parent component'e taşırsınız. Bu pattern'e "lifting state up" denir.
      </p>

      <CodeBlock language="tsx" filename="StateLifting.tsx" highlightLines={[2, 5, 6, 7, 8, 18, 19, 20, 21, 27, 28, 29, 30]}>
{`// Parent Component
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);

  // Celsius → Fahrenheit
  const fahrenheit = (celsius * 9/5) + 32;

  return (
    <div>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay value={fahrenheit} />
    </div>
  );
}

// Child 1: Input
function CelsiusInput({ value, onChange }) {
  return (
    <div>
      <label>Celsius:</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}

// Child 2: Display
function FahrenheitDisplay({ value }) {
  return (
    <p>Fahrenheit: {value.toFixed(2)}°F</p>
  );
}`}
      </CodeBlock>

      <Callout type="info" title="State Lifting Kuralı">
        <p>State her zaman onu <strong>kullanan tüm bileşenlerin ortak parent'ında</strong> olmalıdır:</p>
        <ul>
          <li>🔼 State yukarı taşınır (lift up)</li>
          <li>📤 Veri props olarak aşağı aktarılır (pass down)</li>
          <li>📞 Child'lar callback fonksiyonlarla state'i günceller</li>
        </ul>
      </Callout>

      {/* Section 7: Best Practices */}
      <h2 id="best-practices">7. State Best Practices</h2>

      <StepGuide title="State Kullanımında En İyi Pratikler">
        <Step number={1} title="State'i Minimal Tutun">
          <p>
            State'te sadece render'a etki eden verileri tutun. Türetilebilen değerleri
            state'e koymayın.
          </p>
          <CodeBlock language="tsx">
{`// ❌ Kötü - fullName türetilebilir
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState(''); // Gereksiz!

// ✅ İyi - fullName hesaplanır
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = \`\${firstName} \${lastName}\`;`}
          </CodeBlock>
        </Step>

        <Step number={2} title="İlgili State'leri Grupla">
          <p>
            Birlikte güncellenen değerleri tek bir obje olarak tutun.
          </p>
          <CodeBlock language="tsx">
{`// ❌ Kötü - ayrı state'ler
const [x, setX] = useState(0);
const [y, setY] = useState(0);

// ✅ İyi - tek obje
const [position, setPosition] = useState({ x: 0, y: 0 });`}
          </CodeBlock>
        </Step>

        <Step number={3} title="State'i Doğrudan Değiştirmeyin">
          <p>
            Immutability prensibine uyun. Her zaman yeni obje/array oluşturun.
          </p>
          <CodeBlock language="tsx">
{`// ❌ Kötü - mutation
user.name = 'New Name';
setUser(user);

// ✅ İyi - yeni obje
setUser({ ...user, name: 'New Name' });`}
          </CodeBlock>
        </Step>

        <Step number={4} title="Asenkron Güncellemelerde Functional Update">
          <p>
            Önceki state'e bağlı güncellemelerde fonksiyon kullanın.
          </p>
          <CodeBlock language="tsx">
{`// ⚠️ Risky
setCount(count + 1);

// ✅ Safe
setCount(prev => prev + 1);`}
          </CodeBlock>
        </Step>

        <Step number={5} title="State'i Lazy Initialize Edin">
          <p>
            Pahalı hesaplamalar varsa, lazy initialization kullanın.
          </p>
          <CodeBlock language="tsx">
{`// ❌ Her render'da çalışır
const [data, setData] = useState(expensiveCalculation());

// ✅ Sadece ilk render'da çalışır
const [data, setData] = useState(() => expensiveCalculation());`}
          </CodeBlock>
        </Step>
      </StepGuide>

      {/* Section 8: Common Mistakes */}
      <h2 id="common-mistakes">8. Yaygın State Hataları</h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="mistake-1">
          <AccordionTrigger>1. State'i Doğrudan Değiştirmek</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane';  // Mutation!
setUser(user);       // React bunu fark etmeyebilir

// ✅ DOĞRU
setUser({ ...user, name: 'Jane' });`}
            </CodeBlock>
            <Callout type="error">
              React, state'in referansını karşılaştırır. Aynı objeyi mutate ederseniz,
              React değişikliği görmez ve re-render tetiklemez.
            </Callout>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-2">
          <AccordionTrigger>2. State Güncellemesinin Hemen Yansıdığını Sanmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`function handleClick() {
  setCount(5);
  console.log(count);  // Hala eski değer! (örn: 0)
  // State güncelleme asenkrondur, bir sonraki render'da yansır
}

// ✅ Yeni değeri kullanmak için
function handleClick() {
  const newCount = 5;
  setCount(newCount);
  console.log(newCount);  // 5
}`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-3">
          <AccordionTrigger>3. Render Sırasında useState Çağırmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - sonsuz loop!
function Component() {
  const [count, setCount] = useState(0);

  setCount(1);  // Her render'da çağrılır → yeni render → sonsuz loop

  return <div>{count}</div>;
}

// ✅ DOĞRU - event handler'da
function Component() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(1)}>
      {count}
    </button>
  );
}`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-4">
          <AccordionTrigger>4. Koşullu useState Kullanmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - hook kurallarını ihlal eder
function Component({ condition }) {
  if (condition) {
    const [state, setState] = useState(0);  // Hata!
  }
  // ...
}

// ✅ DOĞRU - her zaman aynı sırayla
function Component({ condition }) {
  const [state, setState] = useState(0);

  if (condition) {
    // state'i burada kullan
  }
}`}
            </CodeBlock>
            <Callout type="warning">
              Hook'lar her render'da aynı sırayla çağrılmalıdır. Koşul, döngü veya nested
              fonksiyon içinde hook çağırmayın.
            </Callout>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-5">
          <AccordionTrigger>5. Gereksiz State Kullanmak</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ - fullName state'e gerek yok
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(\`\${firstName} \${lastName}\`);
}, [firstName, lastName]);

// ✅ DOĞRU - hesapla
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = \`\${firstName} \${lastName}\`;`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistake-6">
          <AccordionTrigger>6. Array/Object State'i Mutate Etmek</AccordionTrigger>
          <AccordionContent>
            <CodeBlock language="tsx">
{`// ❌ YANLIŞ
const [items, setItems] = useState([1, 2, 3]);
items.push(4);     // Mutation!
setItems(items);   // React bunu görmez

// ✅ DOĞRU
setItems([...items, 4]);

// ❌ YANLIŞ
const [user, setUser] = useState({ name: 'John', age: 30 });
user.age = 31;     // Mutation!
setUser(user);

// ✅ DOĞRU
setUser({ ...user, age: 31 });`}
            </CodeBlock>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Section 9: Summary */}
      <h2 id="summary">9. Özet ve Sırada Ne Var?</h2>

      <Callout type="success" title="Tebrikler! State Yönetimini Öğrendiniz">
        <p>Bu derste şunları öğrendiniz:</p>
        <ul>
          <li>✅ State kavramı ve React'te nasıl çalıştığı</li>
          <li>✅ useState hook ile state oluşturma ve güncelleme</li>
          <li>✅ Primitive, object ve array state yönetimi</li>
          <li>✅ Functional update pattern ve asenkron güncellemeler</li>
          <li>✅ Controlled components ve form handling</li>
          <li>✅ State lifting ve component iletişimi</li>
          <li>✅ Immutability prensibi ve neden önemli olduğu</li>
          <li>✅ Best practices ve yaygın hatalardan kaçınma</li>
        </ul>
      </Callout>

      <div className="not-prose mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-xl font-bold mb-2">Sırada Ne Var?</h3>
        <p className="text-muted-foreground mb-4">
          Bir sonraki derslerde <strong>useEffect, custom hooks, context API ve performans
          optimizasyonları</strong> gibi ileri seviye konulara dalacağız.
        </p>
        <ul className="space-y-2">
          <li>🎯 useEffect ile side effects yönetimi</li>
          <li>🎯 Custom hooks oluşturma</li>
          <li>🎯 Context API ile global state</li>
          <li>🎯 useMemo ve useCallback ile performans</li>
        </ul>
      </div>

      <div className="not-prose mt-8">
        <Callout type="tip" title="Pratik Yapın!">
          <p>
            State öğrenmenin en iyi yolu pratik yapmaktır. Şimdi kendi projelerinizi oluşturun:
          </p>
          <ul className="mt-4 space-y-2">
            <li>📝 Bir sayaç uygulaması yapın (increment, decrement, reset)</li>
            <li>📝 Todo list oluşturun (ekle, sil, işaretle)</li>
            <li>📝 Form validasyonu ekleyin</li>
            <li>📝 Shopping cart mantığı kodlayın</li>
            <li>📝 Quiz uygulaması yapın</li>
          </ul>
        </Callout>
      </div>
    </article>
  );
}
// AI:SAFE-EDIT END
