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
      <h1>JSX Basics</h1>

      <Callout type="info" title="What is JSX?">
        JSX (JavaScript XML) is a syntax extension for JavaScript that lets
        you write HTML-like code inside your JavaScript files. It makes
        building UI components intuitive and readable.
      </Callout>

      <h2>What is JSX?</h2>
      <p>
        JSX looks like HTML, but it is actually JavaScript. When your code
        runs, JSX gets transformed into regular JavaScript function calls
        that create React elements.
      </p>

      <Tabs defaultValue="jsx">
        <TabsList>
          <TabsTrigger value="jsx">JSX Syntax</TabsTrigger>
          <TabsTrigger value="js">JavaScript Output</TabsTrigger>
        </TabsList>

        <TabsContent value="jsx">
          <CodeBlock language="tsx">
{`// This JSX:
<h1>Hello, World!</h1>`}
          </CodeBlock>
        </TabsContent>

        <TabsContent value="js">
          <CodeBlock language="js">
{`// Gets transformed to:
React.createElement('h1', null, 'Hello, World!')`}
          </CodeBlock>
        </TabsContent>
      </Tabs>

      <h2>JSX Syntax Rules</h2>
      <p>
        JSX has a few important rules you need to follow:
      </p>

      <KeyConcepts title="Essential JSX Rules">
        <KeyConcept term="Single Parent Element">
          JSX expressions must have one parent element (or use React Fragment)
        </KeyConcept>
        <KeyConcept term="Close All Tags">
          Self-closing tags must end with /&gt; (e.g., &lt;img /&gt;, &lt;br /&gt;)
        </KeyConcept>
        <KeyConcept term="Use className">
          Use className instead of class (class is a reserved JavaScript keyword)
        </KeyConcept>
        <KeyConcept term="camelCase Properties">
          Use camelCase for attributes (onClick instead of onclick)
        </KeyConcept>
      </KeyConcepts>

      <ComparisonTable
        title="HTML vs JSX Differences"
        rowLabels={['Class attribute', 'Event handlers', 'Style attribute', 'Self-closing tags']}
        columns={[
          {
            header: 'HTML',
            rows: [
              'class="button"',
              'onclick="handleClick()"',
              'style="color: red"',
              'Optional closing'
            ]
          },
          {
            header: 'JSX',
            rows: [
              'className="button"',
              'onClick={handleClick}',
              'style={{ color: "red" }}',
              'Must close all tags'
            ]
          }
        ]}
      />

      <h2>Embedding Expressions</h2>
      <p>
        You can embed any JavaScript expression in JSX by wrapping it
        in curly braces:
      </p>

      <CodeBlock language="tsx" filename="Greeting.tsx" highlightLines={[2, 3, 7, 8]}>
{`function Greeting() {
  const name = 'Alice';
  const time = new Date().getHours();

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Current hour: {time}</p>
      <p>Result: {2 + 2}</p>
    </div>
  );
}`}
      </CodeBlock>

      <Callout type="tip" title="Expressions vs Statements">
        You can only use expressions (things that evaluate to a value) inside curly braces,
        not statements like if/else or for loops. Use ternary operators or array methods instead.
      </Callout>

      <h2>Conditional Rendering</h2>
      <p>
        You can use JavaScript conditions to render different content:
      </p>

      <CodeBlock language="tsx" filename="Welcome.tsx" highlightLines={[4, 5, 6, 7]}>
{`function Welcome({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}`}
      </CodeBlock>

      <h2>Rendering Lists</h2>
      <p>
        Use JavaScript's <code>map()</code> function to render lists of elements:
      </p>

      <CodeBlock language="tsx" filename="FruitList.tsx" highlightLines={[6, 7, 8]}>
{`function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange'];

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
        Always provide a unique <code>key</code> prop when rendering lists.
        This helps React identify which items have changed, added, or removed.
        Use a unique ID instead of index when possible.
      </Callout>

      <Callout type="success" title="Excellent!">
        You now understand JSX syntax rules and how to embed JavaScript expressions.
        In the next lesson, we'll learn about managing state in React components.
      </Callout>

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
