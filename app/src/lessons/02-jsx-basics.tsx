import type { LessonMeta } from '@/types/lesson';

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
      <h1>JSX Basics</h1>

      <p>
        JSX (JavaScript XML) is a syntax extension for JavaScript that lets
        you write HTML-like code inside your JavaScript files. It makes
        building UI components intuitive and readable.
      </p>

      <h2>What is JSX?</h2>
      <p>
        JSX looks like HTML, but it is actually JavaScript. When your code
        runs, JSX gets transformed into regular JavaScript function calls
        that create React elements.
      </p>

      <pre><code>{`// This JSX:
<h1>Hello, World!</h1>

// Gets transformed to:
React.createElement('h1', null, 'Hello, World!')`}</code></pre>

      <h2>JSX Syntax Rules</h2>
      <p>
        JSX has a few important rules you need to follow:
      </p>

      <ul>
        <li><strong>Single Parent Element:</strong> JSX expressions must have one parent element</li>
        <li><strong>Close All Tags:</strong> Self-closing tags must end with <code>/&gt;</code></li>
        <li><strong>Use className:</strong> Use <code>className</code> instead of <code>class</code></li>
        <li><strong>camelCase Properties:</strong> Use <code>onClick</code> instead of <code>onclick</code></li>
      </ul>

      <h2>Embedding Expressions</h2>
      <p>
        You can embed any JavaScript expression in JSX by wrapping it
        in curly braces:
      </p>

      <pre><code>{`function Greeting() {
  const name = 'Alice';
  const time = new Date().getHours();

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Current hour: {time}</p>
      <p>Result: {2 + 2}</p>
    </div>
  );
}`}</code></pre>

      <h2>Conditional Rendering</h2>
      <p>
        You can use JavaScript conditions to render different content:
      </p>

      <pre><code>{`function Welcome({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}`}</code></pre>

      <h2>Rendering Lists</h2>
      <p>
        Use JavaScript's <code>map()</code> function to render lists of elements:
      </p>

      <pre><code>{`function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}`}</code></pre>

      <h2>Key Takeaways</h2>
      <p>
        JSX makes React code more readable by allowing you to write
        markup alongside your logic. Remember to follow JSX syntax rules,
        and use curly braces to embed JavaScript expressions. In the next
        lesson, we will learn about managing state in React components.
      </p>
    </article>
  );
}
// AI:SAFE-EDIT END
